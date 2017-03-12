require 'sinatra'
require 'sqlite3'	
require 'json'

post '/schedule.json' do
	train_uid = params[:uid]
	
	db = SQLite3::Database.new('trains2.db')
	db.results_as_hash = true
	
	sql = "SELECT codes.description, schedule_location.arrival, schedule_location.departure, schedule_location.pass, schedule.train_uid, codes.crs, schedule.stp FROM schedule_location INNER JOIN schedule ON schedule.id = schedule_location.train_id INNER JOIN codes ON schedule_location.tiploc_code = codes.tiploc WHERE schedule.train_uid = :uid AND schedule.stp = (SELECT MIN(schedule.stp) FROM schedule WHERE schedule.train_uid = :uid) WHERE description NOT NULL"
	
	result = db.execute(sql, {'uid' => train_uid})
	
	result.to_json	
end