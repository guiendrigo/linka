alter table products add column last_visit_at text;
alter table products add column last_visit_role text;
alter table products add column last_visit_shop text;

create table if not exists user_plans (
  user_id text primary key,
  tier text not null,
  updated_at text not null
);
