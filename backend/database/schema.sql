create table if not exists medications (
	id serial primary key,
	name text not null unique,
	dosage integer not null,
	-- represents # mg of medication
	frequency integer not null,
	-- represents # times daily
	next_dose timestamp not null default now(),
	instructions text,
	precautions text
);

create table if not exists med_history (
	id serial primary key,
	med_id integer not null references medications,
	med_name text not null,
	med_dosage text not null,
	when_taken timestamp not null default now()
);