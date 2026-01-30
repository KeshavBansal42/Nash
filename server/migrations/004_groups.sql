CREATE TABLE groups(
	id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
	name TEXT NOT NULL UNIQUE,
	description TEXT NOT NULL,
	created_by UUID REFERENCES users(id),
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);