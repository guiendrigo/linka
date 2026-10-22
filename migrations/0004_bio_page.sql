create table if not exists bio_pages (
  user_id text primary key,
  code text not null unique,
  title text not null,
  description text not null default '',
  photo_mime text,
  photo_bytes bytea,
  created_at timestamptz not null
);

create index if not exists bio_pages_code_idx on bio_pages (code);

alter table products add column if not exists bio_visible boolean not null default true;
