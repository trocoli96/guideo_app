


drop table if exists audioguide;
drop table if exists poi_images;
drop table if exists review;
drop table if exists poi;
drop table if exists location;
drop table if exists user;

create table user(
                     id int(10) not null primary key,
                     first_name varchar(255) not null,
                     last_name varchar(255) not null,
                     email varchar (255) not null,
                     password varchar(255) not null,
                     user_role varchar (255) default 'user',
                     created_at timestamp default current_timestamp(),
                     updated_at timestamp default current_timestamp()
);
create table poi(
                    id int(10) not null primary key,
                    name varchar (255) not null,
                    description text,
                    created_at timestamp default current_timestamp(),
                    updated_at timestamp default current_timestamp(),
                    submitter_id int(10) not null,
                    foreign key (submitter_id) references user (id)
);

create table location(
                         id int(10) not null primary key,
                         longitude varchar(255) not null,
                         latitude varchar(255) not null,
                         author_id int(10) not null,
                         created_at timestamp default current_timestamp(),
                         updated_at timestamp default current_timestamp(),
                         poi_id int(10) not null,
                         foreign key (poi_id) references poi(id),
                         foreign key (author_id) references user (id)
);

create table poi_images(
                           id int(10) not null primary key,
                           image_url varchar (255),
                           poi_id int(10) not null,
                           created_at timestamp default current_timestamp(),
                           updated_at timestamp default current_timestamp(),
                           foreign key (poi_id) references poi (id)
);

create table audioguide(
                           id int(10) not null primary key,
                           poi_id integer not null,
                           audio_url varchar (255) not null,
                           description text,
                           user_id int(10) not null,
                           created_at timestamp default current_timestamp(),
                           updated_at timestamp default current_timestamp(),
                           foreign key (user_id) references user (id),
                           foreign key (poi_id) references poi (id)
);

create table review(
                       id int(10) not null primary key,
                       poi_id integer not null,
                       author_id integer not null,
                       review_subject varchar (255),
                       review_text text,
                       review_stars varchar (255),
                       user_id int(10) not null,
                       created_at timestamp default current_timestamp(),
                       updated_at timestamp default current_timestamp(),
                       foreign key (poi_id) references poi (id),
                       foreign key (author_id) references user (id)
)

