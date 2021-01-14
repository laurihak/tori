CREATE TABLE products (
    index SERIAL,
    id varchar(100) NOT NULL UNIQUE,
    seller_name varchar(50),
    seller_id varchar(50) NOT NULL,
    product_name varchar(50) NOT NULL,
    price integer NOT NULL,
    location varchar(50) NOT NULL,
    address varchar(50) NOT NULL,
    sell_type varchar(50) NOT NULL,
    description varchar(4000) NOT NULL,
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
    id VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL
);