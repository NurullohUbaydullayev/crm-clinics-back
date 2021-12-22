CREATE TABLE users(
     user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
     user_name varchar(24) not null,
     user_login varchar(64) not null unique  ,
     user_password varchar(64) not null,
     user_phone varchar(15) unique not null,
     is_admin boolean DEFAULT FALSE
);

CREATE TABLE service_types(
     service_id serial PRIMARY KEY,
     service_name varchar(64) not null
);

CREATE TABLE requests(
     request_id serial PRIMARY KEY,
     request_order int not null,
     user_name varchar(24) not null,
     user_phone varchar(15) not null,
     service_type int REFERENCES service_types(service_id),
     request_user uuid REFERENCES users(user_id),
     request_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
     is_approved boolean DEFAULT FALSE
);

CREATE TABLE archive(
     archive_id serial not null,
     user_name varchar(64) not null,
     user_phone varchar(15),
     request_user uuid not null,
     service_type int REFERENCES service_types(service_id),
     request_time TIMESTAMPTZ not null
);

CREATE OR REPLACE FUNCTION deleteProc()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$

BEGIN

     INSERT INTO archive(user_name, user_phone, service_type, request_time, request_user) VALUES(OLD.user_name, OLD.user_phone, OLD.service_type, OLD.request_time, OLD.request_user );
     RETURN OLD;

END
$$;

CREATE TRIGGER deleteTrg
BEFORE DELETE
ON requests
FOR EACH ROW
EXECUTE PROCEDURE deleteProc();

INSERT INTO service_types(service_name) VALUES('Endokrinolog');
INSERT INTO service_types(service_name) VALUES('Pulmonolog');
INSERT INTO service_types(service_name) VALUES('Kardiolog');
INSERT INTO service_types(service_name) VALUES('Nevrolog');
INSERT INTO service_types(service_name) VALUES('Nevropatolog');
INSERT INTO service_types(service_name) VALUES('Okulist');
INSERT INTO service_types(service_name) VALUES('Neyroxirurg');
INSERT INTO service_types(service_name) VALUES('Ortoped');
INSERT INTO service_types(service_name) VALUES('Stomatolog');
INSERT INTO service_types(service_name) VALUES('Pediator');
