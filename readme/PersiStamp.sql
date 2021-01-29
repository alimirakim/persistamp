CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar,
  "email" varchar,
  "created_at" timestamp,
  "color" varchar(50),
  "stamp" varchar(50)
);

CREATE TABLE "programs" (
  "id" SERIAL PRIMARY KEY,
  "program" varchar,
  "creator_id" int,
  "created_at" timestamp,
  "color" varchar(50),
  "stamp" varchar(50)
);

CREATE TABLE "habits" (
  "id" SERIAL PRIMARY KEY,
  "habit" varchar(50),
  "program_id" int,
  "creator_id" int,
  "created_at" timestamp,
  "description" varchar(250),
  "frequency" int,
  "color" varchar(50),
  "stamp" varchar(50)
);

CREATE TABLE "daily_stamps" (
  "id" SERIAL PRIMARY KEY,
  "date" date,
  "status" varchar(50),
  "habit_id" int,
  "user_id" int
);

CREATE TABLE "rewards" (
  "id" SERIAL PRIMARY KEY,
  "program_id" int,
  "type" varchar(50),
  "reward" varchar(50),
  "description" varchar(250),
  "cost" int DEFAULT 7,
  "quantity" int DEFAULT 1,
  "color" varchar,
  "stamp" varchar,
  "creator_id" int,
  "created_at" timestamp
);

CREATE TABLE "members" (
  "id" SERIAL PRIMARY KEY,
  "program_id" int,
  "member_id" int,
  "stamper_id" int,
  "points" int
);

CREATE TABLE "redeemed" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "reward_id" int,
  "redeemed_at" timestamp
);

CREATE TABLE "bonds" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "buddy_id" int
);

ALTER TABLE "habits" ADD FOREIGN KEY ("program_id") REFERENCES "programs" ("id");

ALTER TABLE "daily_stamps" ADD FOREIGN KEY ("habit_id") REFERENCES "habits" ("id");

ALTER TABLE "daily_stamps" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "rewards" ADD FOREIGN KEY ("program_id") REFERENCES "programs" ("id");

ALTER TABLE "members" ADD FOREIGN KEY ("program_id") REFERENCES "programs" ("id");

ALTER TABLE "members" ADD FOREIGN KEY ("member_id") REFERENCES "users" ("id");

ALTER TABLE "members" ADD FOREIGN KEY ("stamper_id") REFERENCES "users" ("id");

ALTER TABLE "redeemed" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "redeemed" ADD FOREIGN KEY ("reward_id") REFERENCES "rewards" ("id");

ALTER TABLE "bonds" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "bonds" ADD FOREIGN KEY ("buddy_id") REFERENCES "users" ("id");
