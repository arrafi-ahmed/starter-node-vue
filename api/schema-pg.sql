CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    name       VARCHAR(255),
    role       SMALLINT            NOT NULL check ( role in (10, 20) ), -- admin = 10, manager = 20
    created_at TIMESTAMP
);