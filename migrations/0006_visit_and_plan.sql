alter table products add column if not exists last_visit_at timestamptz;
alter table products add column if not exists last_visit_role text;
alter table products add column if not exists last_visit_shop text;

create table if not exists user_plans (
  user_id text primary key,
  tier text not null,
  updated_at timestamptz not null
);
