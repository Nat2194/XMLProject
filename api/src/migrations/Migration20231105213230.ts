import { Migration } from '@mikro-orm/migrations';

export class Migration20231105213230 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "movie" ("movie_id" serial primary key, "title" varchar(255) not null, "duration" int not null, "language" varchar(255) not null, "subtitles" varchar(255) null, "director" varchar(255) not null, "main_actors" varchar(255) not null, "min_age_required" int not null, "start_date" timestamptz(0) not null, "end_date" timestamptz(0) not null);');

    this.addSql('create table "movie_session" ("session_id" serial primary key, "date" timestamptz(0) not null, "theatre_name" varchar(255) not null, "theatre_address" varchar(255) not null, "theatre_city" varchar(255) not null, "movie_movie_id" int not null);');

    this.addSql('create table "user" ("user_id" serial primary key, "firstname" varchar(255) not null, "lastname" varchar(255) not null, "mail" varchar(255) not null, "password" text null, "last_login" int null);');

    this.addSql('alter table "movie_session" add constraint "movie_session_movie_movie_id_foreign" foreign key ("movie_movie_id") references "movie" ("movie_id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "movie_session" drop constraint "movie_session_movie_movie_id_foreign";');

    this.addSql('drop table if exists "movie" cascade;');

    this.addSql('drop table if exists "movie_session" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
