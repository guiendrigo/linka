create table if not exists shopee_credentials (
  user_id text primary key,
  app_id text not null,
  secret text not null,
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key,
  user_id text not null,
  code text not null unique,
  title text not null,
  price_cents integer not null,
  commission_pct integer not null,
  created_at timestamptz not null default now()
);

create index if not exists products_user_id_idx on products (user_id);

create table if not exists offers (
  id text primary key,
  product_id text not null references products (id) on delete cascade,
  user_id text not null,
  position integer not null,
  shop text not null,
  url text not null,
  in_stock boolean not null default true
);

create index if not exists offers_product_id_idx on offers (product_id);
create index if not exists offers_user_id_idx on offers (user_id);
