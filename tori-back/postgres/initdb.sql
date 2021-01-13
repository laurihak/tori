CREATE TABLE products (
    index SERIAL,
    id varchar(100),
    product_name varchar(50),
    seller_name varchar(50),
    price integer,
    location varchar(50),
    address varchar(50),
    sell_type varchar(50),
    description varchar(2000),
    input_date timestamp
);
-- INSERT INTO products (
--         id,
--         product_name,
--         seller_name,
--         price,
--         location,
--         address,
--         sell_type,
--         description,
--         input_date
--     )
-- values(
--         1,
--         'Ferrari',
--         'Matti',
--         500,
--         'Turku',
--         'Turunkatu 321',
--         'Lahetys',
--         'Tasta hyve fefe kesaksi',
--         '2017-03-31 9:30:20'
--     );
CREATE TABLE images (
    index SERIAL,
    id VARCHAR(100),
    product_id VARCHAR(100),
    image_name VARCHAR(100),
    image_data BYTEA
);
CREATE TABLE users (
    index SERIAL,
    id VARCHAR(100),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL
);