require 'erb'
require 'sinatra'
require 'sinatra/reloader'
require 'http'
require 'net/http'
require 'uri'

APP_ID = 98792731;
APP_KEY = "5674da74eee9936d936bdb41c2b1b7c8";

set :bind, "0.0.0.0"

# Website Index page (root directory)
get '/' do
	@base = {
		# Station to find trains passing through
		:station => "STP",
		:uids => []
	}

	# Get 10 trains passing through baseStation
	@base[:trains] = make_train_objects(@base[:station], 10)

	# Get uids for each of these 10 trains
	@base[:trains].each do |train|
		puts train[:uid]
		@base[:uids].push(train[:uid])
	end

	# Get routes for each these uids
	@routes = []
	@uri = URI.parse("54.175.175.13/schedule.json")

	# @base[:uids].each do |uid|
	# 	response = Net::HTTP.post_form(@uri, {":uid" => uid})
	# 	puts response.body
	# end

	uri = URI('http://54.175.175.13/schedule.json')

	# Get uid from database
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
				:routes => stations
			})
		end

		# If route is blank delete
		@routes.each_with_index do |route, index|
			if (route[:routes].length == 0)
				@routes.delete_at(index)
			else
				puts route
			end
		end
	end



	# @trainsList = check_stations_on_route ["BDM", "FLT", "HLN", "LEA", "LUT", "LTN", "HPN", "SAC", "RDT", "WHP", "STP"]
	# @json = JSON.pretty_generate(@trainsList)
	# get_percentage "G48957"
	# # check_stations_on_route ["SHF", "CHD", "DBY", "TAM", "BHM"]
	erb :index
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
				:estimate_mins => departure[:estimate_mins]
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
			puts trainsList[trainsList.length-1]
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
	return JSON.parse(HTTP.get("https://transportapi.com/v3/uk/train/station/#{station_name}/live.json?app_id=#{APP_ID}&app_key=#{APP_KEY}&darwin=false&train_status=passenger").body)
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
