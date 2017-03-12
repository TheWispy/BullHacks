BEGIN TRANSACTION;
CREATE TABLE "schedule_location" (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`train_id`	INTEGER NOT NULL,
	`tiploc_code`	TEXT,
	`arrival`	TEXT,
	`departure`	TEXT,
	`pass`	TEXT
);
CREATE TABLE "schedule" (
	`id`	INTEGER NOT NULL UNIQUE,
	`train_uid`	INTEGER,
	`stp`	TEXT,
	PRIMARY KEY(`id`)
);
CREATE TABLE "codes" (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`tiploc`	TEXT,
	`crs`	TEXT,
	`stanox`	TEXT,
	`description`	TEXT
);
COMMIT;
