drop table if exists shopee_credentials;

create table if not exists stock_checks (
  shop_id text not null,
  item_id text not null,
  in_stock integer not null,
  checked_at text not null,
  primary key (shop_id, item_id)
);
