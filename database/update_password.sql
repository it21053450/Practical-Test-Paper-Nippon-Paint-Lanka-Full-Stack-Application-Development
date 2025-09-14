USE MaterialManagementDB;
GO

UPDATE Users
SET PasswordHash = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNq.4CzRAHPYi'
WHERE Username = 'admin';
GO