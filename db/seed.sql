CREATE TABLE souldates_users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE dates(
    date_id SERIAL PRIMARY KEY,
    activity VARCHAR(255),
    image TEXT,
    price VARCHAR(255),
    location VARCHAR(400),
    info VARCHAR(1000)
);
CREATE TABLE likes(
    like_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES souldates_users(user_id),
    date_id INT REFERENCES dates(date_id)
);
CREATE TABLE dislikes(
    dislike_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES souldates_users(user_id),
    date_id INT REFERENCES dates(date_id)
);
INSERT INTO dates
(activity, image, price, location, info)
VALUES 
('')