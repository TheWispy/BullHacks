require 'erb'
require 'sinatra'
require 'sinatra/reloader'
require 'http'
require 'net/http'
require 'uri'
require 'json'
require 'sqlite3'

APP_ID = "7c8630ea";
APP_KEY = "85d57f66a571c8a2138d066380632136";

set :bind, "0.0.0.0"

$stationsAccessed = []

# Website Index page (root directory)
get '/trains.json' do
	#puts check_stations_on_route ["AFK", "BCH", "BSR", "DEA", "DVP", "FAV", "FKC"]
	#@json = JSON.pretty_generate(check_stations_on_route ["AFK", "BCH", "BSR", "DEA", "DVP", "FAV", "FKC"])
	#erb :index
	@base = {
		# Station to find trains passing through
		:station => "STP",
		:uids => []
	}

	# Get 10 trains passing through baseStation
	@base[:trains] = make_train_objects(@base[:station], 3)

	# Get uids for each of these 10 trains
	@base[:trains].each do |train|
		puts "1. Print each uid to fetch"
		puts train[:uid]
		@base[:uids].push(train[:uid])
	end

	# Get routes for each these uids
	@routes = []

	# Get uid from database
	uri = URI('http://54.175.175.13/schedule.json')

	@base[:uids].each do |uid|
		# Post to server
		Net::HTTP.start(uri.host, uri.port) do |http|
			request = Net::HTTP::Post.new uri
			request.set_form_data("uid" => uid)
			response = http.request request # Net::HTTPResponse object

			# Parse response as json
			rawData = JSON.parse(response.body)

			# Add each station to an array
			stations = []
			rawData.each do |station|
				#puts station["crs"]
				stations.push(station["crs"])
			end

			@routes.push({
				:uid => uid,
				:stations => stations
			})
		end

		# If route is blank delete
		@routes.each_with_index do |route, index|
			if (route[:stations].length == 0)
				@routes.delete_at(index)
			end
		end
	end

	# Return each route as a train list
	#@routes.each_with_index do |route, index|
	#	puts check_stations_on_route route[:stations]
	#end

	# get arrival times for selected uids
	routes_with_arrivals = get_arrival_times_by_uid

	#return routes_with_arrivals
	(routes_with_arrivals).to_json
end

post '/schedule.json' do
	train_uid = params[:uid]
	puts train_uid

	db = SQLite3::Database.new('trains2.db')
	db.results_as_hash = true

	sql = "SELECT codes.description, schedule_location.arrival, schedule_location.departure, schedule_location.pass, schedule.train_uid, codes.crs, schedule.stp FROM schedule_location INNER JOIN schedule ON schedule.id = schedule_location.train_id INNER JOIN codes ON schedule_location.tiploc_code = codes.tiploc WHERE schedule.train_uid = :uid AND schedule.stp = (SELECT MIN(schedule.stp) FROM schedule WHERE schedule.train_uid = :uid) AND description NOT NULL AND pass IS NULL"

	result = db.execute(sql, {'uid' => train_uid})

	result.to_json
end

# Get current station arrival times for a particular array of uids
def get_arrival_times_by_uid
	routes_with_arrivals = []
	@routes.each do |route|
		# Get all uids for the stations listed in the route
		all_objects = check_stations_on_route route[:stations]

		# Get the train object for just the uid we want
		all_objects.each do |train|
			if (train[:uid] == route[:uid])
				routes_with_arrivals.push(train)
			end
		end
	end
	return routes_with_arrivals
end


# Get trains passing through a particular group of stations
def check_stations_on_route route_array
	trainsList = []

	# Make train objects for each station in route_array
	route_array.each do |curStation|
		departures = make_train_objects curStation

		departures.each do |departure|
			# New station for route
			newStation = {
				:name => departure[:next_stop],
				:arrival_time => departure[:arrival_time]
				#:estimate_mins => departure[:estimate_mins]
			}

			# Check station seen before
			seenBefore = false
			trainsList.each do |train|
				if (train[:uid] == departure[:uid])
					# Add station and time to existing item if seen before
					seenBefore = true

					train[:stations].push(newStation)
				end
			end

			# Add to array if never seen before

			if !seenBefore
				trainsList.push({
					:uid => departure[:uid],
					:origin => departure[:origin],
					:destination => departure[:destination],
					:stations => [newStation]
				})
			end
			#puts trainsList[trainsList.length-1]

		end
	end
	return trainsList
end

# Return a list of hash objects of trains passing through a particular station
def make_train_objects station_name, no_of_trains = 0
	rawData = get_departures station_name
	# Get all trains passing through unless limit specified
	if (no_of_trains == 0)
		curDepartures = rawData["departures"]["all"]
	else
		curDepartures = rawData["departures"]["all"][0..no_of_trains]
	end

	trainsList = []

	# Add converted station name to global variable
	curFullName = rawData["station_name"]

	# Make trainsList object for each departure
	curDepartures.each_with_index do |departure, i|
		train = {
			:service => departure["service"],
			:uid => departure["train_uid"],
			:operator => departure["operator"],
			:origin => departure["origin_name"],
			:destination => departure["destination_name"],
			:estimate_mins => departure["best_departure_estimate_mins"],
			:next_stop => curFullName,
			:arrival_time => departure["expected_arrival_time"],
			:departure_time => departure["expected_departure_time"]
		}

		trainsList[i] = train

	end
	return trainsList
end

# Return raw json of trains passing through a station
def get_departures station_name
	# See if the station was accessed before
	$stationsAccessed.each do |station|
		if (station["station_code"] == station_name)
			puts "Seen before"
			return station
		end
	end

	# If not accessed before
	puts "======== MADE A REQUEST TO TRANSPORT API POOOR THEM"
	get_request = JSON.parse(HTTP.get("https://transportapi.com/v3/uk/train/station/#{station_name}/live.json?app_id=#{APP_ID}&app_key=#{APP_KEY}&darwin=false&train_status=passenger").body)
	$stationsAccessed.push(get_request)
	return get_request
end

def get_percentage uid
	# Get train matching selected uid
	@trainsList.each do |train|
		if (train[:uid] == uid)
			puts train[:stations][0][:estimate_mins]
		end
	end

	#puts @json.select{|key, hash| hash["uid"] == uid }
end

# Make station objects from base station

#
