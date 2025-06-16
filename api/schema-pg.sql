CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    role       SMALLINT CHECK (role IN (10, 20)), -- 10=admin, 20=customer
    name       VARCHAR(255)        NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   TEXT                NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products
(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255)   NOT NULL,
    description     TEXT,
    uuid            TEXT,
    price           DECIMAL(10, 2) NOT NULL,
    available_stock INT       default 1, --added
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    user_id         INT REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE purchases
(
    id                    SERIAL PRIMARY KEY,
    user_id               INT            REFERENCES users (id) ON DELETE SET NULL,
    product_id            INT REFERENCES products (id) ON DELETE CASCADE,
    purchase_date         TIMESTAMP DEFAULT NOW(),
    purchased_price       DECIMAL(10, 2) NOT NULL,
    payment_status        SMALLINT CHECK (payment_status IN (0, 1, 2)),             -- 0=pending, 1=paid, 2=failed
    created_at            TIMESTAMP DEFAULT NOW(),
    updated_at            TIMESTAMP DEFAULT NOW()
);

CREATE TABLE password_reset
(
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(255) NOT NULL,
    token      VARCHAR(255) NOT NULL,
    user_id    INT REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);