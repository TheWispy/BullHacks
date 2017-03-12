require 'rubygems'
require 'json'
require 'sqlite3'

tiploc_codes = File.open('TIPLOC conversions.txt').read
tiploc_codes.gsub!(/\r\n?/, "\n")

db = SQLite3::Database.new('trains2.db')

db.transaction
File.foreach('TIPLOC conversions.txt').with_index do |line, line_num|
	parsed_codes = JSON.parse(line)['TiplocV1']

	sql = 'INSERT INTO codes (tiploc, crs, stanox, description) VALUES (:t, :c, :s, :d)'
	
	db.execute(sql, {
		't' => parsed_codes['tiploc_code'],
		'c' => parsed_codes['crs_code'],
		's' => parsed_codes['stanox'],
		'd' => parsed_codes['description']		
	})
	puts line_num	
end
db.commit