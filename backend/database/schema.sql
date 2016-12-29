create table if not exists medications (
	id serial primary key,
	name text not null unique,
	dosage integer not null,
	frequency integer not null,
	next_dose timestamp not null default now()
);

create table if not exists med_history (
	id serial primary key,
	med_id integer not null references medications,
	dosage integer not null,
	what_time timestamp not null default now()
);