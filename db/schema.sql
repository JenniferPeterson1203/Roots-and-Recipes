DROP DATABASE IF EXISTS rr_db;
CREATE DATABASE rr_db;

\c rr_db;

CREATE TABLE families(
    id SERIAL PRIMARY KEY,
    family_name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(20) UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255),
    email VARCHAR(100),
    username VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100),
    photo VARCHAR(100),
    nickname VARCHAR(50),
    role VARCHAR(30),
    family_code VARCHAR(20) REFERENCES families(code),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    chef VARCHAR(50),
    family VARCHAR(50) REFERENCES families(family_name),
    user_id INTEGER REFERENCES users(id),
    photo TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ingredients VARCHAR(255),
    steps VARCHAR(255)
);

CREATE TABLE favorites(
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE categories(
   id SERIAL PRIMARY KEY,
   category_name VARCHAR(50) UNIQUE
);

CREATE TABLE category_to_recipe(
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    note TEXT,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    voice_notes TEXT
);