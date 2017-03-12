require 'rubygems'
require 'json'
require 'sqlite3'

db = SQLite3::Database.new('trains2.db')

train_id = 1

sql = 'INSERT INTO schedule (id, train_uid, stp) VALUES (:id, :uid, :s)'
sql2 = 'INSERT INTO schedule_location (train_id, tiploc_code, arrival, departure, pass) VALUES (:tid, :tip, :a, :d, :p)'

db.transaction
File.foreach('schedule.txt').with_index do |line, line_num|
	if line.include? "ScheduleV1"
		parsed_schedule = JSON.parse(line)['JsonScheduleV1']
		
		db.execute(sql, {
			'id' => train_id,
			'uid' => parsed_schedule['CIF_train_uid'],
			's' => parsed_schedule['CIF_stp_indicator']
		})
		
		unless parsed_schedule['schedule_segment']['schedule_location'] == nil
			parsed_schedule['schedule_segment']['schedule_location'].each do |location|
					db.execute(sql2, {
						'tid' => train_id,
						'tip' => location['tiploc_code'],
						'a' => location['arrival'],
						'd' => location['departure'],
						'p' => location['pass']
					})
			end
		end
		
		puts line_num
		train_id += 1	
	end
end
db.commit