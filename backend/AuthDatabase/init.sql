CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    password VARCHAR(97) NOT NULL,
    failed_login_attempts INT NOT NULL DEFAULT 0,
    verified_email BOOLEAN NOT NULL DEFAULT FALSE,
    email_verification_token VARCHAR(128),
    password_reset_token VARCHAR(128),
    password_reset_token_expires_at TIMESTAMP
);

CREATE VIEW password_tokens AS
SELECT
    id,
    password_reset_token AS token
FROM users
WHERE password_reset_token IS NOT NULL
  AND password_reset_token_expires_at IS NOT NULL
  AND password_reset_token_expires_at > NOW();


