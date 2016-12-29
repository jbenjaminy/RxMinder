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
	dosage integer not null,
	what_time timestamp not null default now()
);