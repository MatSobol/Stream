CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    role VARCHAR(10) NOT NULL,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    icon VARCHAR(100),
    description VARCHAR(300),
);


