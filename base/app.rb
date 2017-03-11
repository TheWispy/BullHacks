require 'erb'
require 'sinatra'
require 'sinatra/reloader'
require 'http'

APP_ID = 98792731;
APP_KEY = "5674da74eee9936d936bdb41c2b1b7c8";

# Website Index page (root directory)
get '/' do
	make_train_objects
	# @json = make_train_objects
	# erb :index
end

def get_departures
	response = HTTP.get("https://transportapi.com/v3/uk/train/station/SHF/live.json?app_id=#{APP_ID}&app_key=#{APP_KEY}&darwin=false&train_status=passenger").body
	return JSON.parse(response)
end

def make_train_objects
	rawData = get_departures
	curDepartures = rawData["departures"]["all"]

	curDepartures.each do |departure|
		puts departure["arrival_time"]
	end
end

