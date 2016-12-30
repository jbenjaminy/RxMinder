create table if not exists medication (
	id serial primary key,
	name text not null unique,
	dosage integer not null,
	-- represents # mg of medication
	num_doses integer not null,
	-- represents # times daily
	frequency integer not null,
	-- represents seconds in between dose
	next_dose_secs text not null,
	-- UTC seconds
	next_dose_date timestamp not null,
	-- timestamp
	instructions text,
	precautions text
);

create table if not exists dose_history (
	id serial primary key,
	med_id integer not null references medication,
	med_name text not null,
	med_dosage text not null,
	when_taken timestamp not null default now()
	-- format yyyy-mm-dd hh:mm:ss
);