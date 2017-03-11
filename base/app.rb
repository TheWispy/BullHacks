require 'erb'
require 'sinatra'
require 'sinatra/reloader'
require 'http'

APP_ID = 98792731;
APP_KEY = "5674da74eee9936d936bdb41c2b1b7c8";

set :bind, "0.0.0.0"

# Website Index page (root directory)
get '/index.json' do

	#check_stations_on_route ["SHF", "CHD", "DBY", "TAM", "BHM"]
	check_stations_on_route ["BDM", "FLT", "HLN", "LEA", "LUT", "LTN", "HPN", "SAC", "RDT", "WHP", "STP"]
end

# 

# Get trains passing through a particular group of stations
def check_stations_on_route route_array
	trainsList = []

	# Make train objects for each station in route_array
	route_array.each do |curStation|
		departures = make_train_objects curStation

		
		departures.each do |departure|
			# New station for route
			newStation = {
				:name => curStation,
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
					:stations => [newStation]
				})
			end
			puts trainsList[trainsList.length-1]
		end
	end
	return JSON.pretty_generate(trainsList)
end

def make_train_objects station_name
	rawData = get_departures station_name
	curDepartures = rawData["departures"]["all"]
	trainsList = []

	# Make trainsList object for each departure
	curDepartures.each_with_index do |departure, i|
		train = {
			:service => departure["service"],
			:uid => departure["train_uid"],
			:operator => departure["operator"],
			:origin => departure["origin_name"],
			:destination => departure["destination_name"],
			:estimate_mins => departure["best_departure_estimate_mins"],
			:arrival_time => departure["expected_arrival_time"],
			:departure_time => departure["expected_departure_time"]
		}

		trainsList[i] = train

	end
	return trainsList
end

def get_departures station_name
	return JSON.parse(HTTP.get("https://transportapi.com/v3/uk/train/station/#{station_name}/live.json?app_id=#{APP_ID}&app_key=#{APP_KEY}&darwin=false&train_status=passenger").body)
end

