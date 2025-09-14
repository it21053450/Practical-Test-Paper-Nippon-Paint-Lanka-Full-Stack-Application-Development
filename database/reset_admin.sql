USE MaterialManagementDB;
GO

-- Drop existing table contents and recreate
DELETE FROM Materials;
DELETE FROM Users;
GO

-- Insert admin user with known working hash
INSERT INTO Users (Username, PasswordHash, Role, CreatedAt)
VALUES (
    'admin',
    '$2a$12$K8HFh3886Hj4HJsplgB6uO6FsxqMS.ZYbTlwfP6JMBZ27pb7/yExy',
    'Admin',
    GETUTCDATE()
);
GO