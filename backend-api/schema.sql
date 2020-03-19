create database guideo;


drop table if exists audioguide;
drop table if exists poi_images;
drop table if exists review;
drop table if exists poi;
drop table if exists user;

create table user(
                     id integer not null primary key auto_increment,
                     first_name varchar(255) not null,
                     last_name varchar(255) not null,
                     email varchar (255) not null,
                     password varchar(255) not null,
                     user_role varchar (255) default 'user',
                     created_at timestamp default current_timestamp(),
                     updated_at timestamp default current_timestamp()
);

create table poi(
                    id integer not null primary key auto_increment,
                    longitud varchar(255) not null,
                    latitud varchar(255) not null,
                    name varchar (255) not null,
                    description text,
                    created_at timestamp default current_timestamp(),
                    updated_at timestamp default current_timestamp(),
                    submitter_id integer not null,
                    foreign key (submitter_id) references user (id)
);

create table poi_images(
                           id integer not null primary key auto_increment,
                           image_url varchar (255),
                           poi_id integer not null,
                           created_at timestamp default current_timestamp(),
                           updated_at timestamp default current_timestamp(),
                           foreign key (poi_id) references poi (id)
);

create table audioguide(
                           id integer not null primary key auto_increment,
                           poi_id integer not null,
                           audio_url varchar (255) not null,
                           description text,
                           user_id integer not null,
                           created_at timestamp default current_timestamp(),
                           updated_at timestamp default current_timestamp(),
                           foreign key (user_id) references user (id),
                           foreign key (poi_id) references poi (id)
);

create table review(
                       id integer not null primary key auto_increment,
                       poi_id integer not null,
                       author_id integer not null,
                       review_subject varchar (255),
                       review_text text,
                       review_stars varchar (255),
                       user_id integer not null,
                       created_at timestamp default current_timestamp(),
                       updated_at timestamp default current_timestamp(),
                       foreign key (poi_id) references poi (id),
                       foreign key (author_id) references user (id)
)
