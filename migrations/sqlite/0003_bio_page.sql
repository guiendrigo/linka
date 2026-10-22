create table if not exists bio_pages (
  user_id text primary key,
  code text not null unique,
  title text not null,
  description text not null default '',
  photo_mime text,
  photo_bytes blob,
  created_at text not null
);

create index if not exists bio_pages_code_idx on bio_pages (code);

alter table products add column bio_visible integer not null default 1;
