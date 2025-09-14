USE MaterialManagementDB;
GO

-- Insert Sample User (Password: Admin123!)
-- The password hash is for "Admin123!" using BCrypt
IF NOT EXISTS (SELECT 1 FROM Users WHERE Username = 'admin')
BEGIN
    INSERT INTO Users (Username, PasswordHash, Role, CreatedAt)
    VALUES ('admin', '$2a$12$s8kFjHYLULPB9vXBmTHMOuVQ3m9kDOuTG3jpLsDEBuZ7s6Q.MWWMG', 'Admin', GETUTCDATE());
END
GO

-- Get the user ID for sample materials
DECLARE @UserId int;
SELECT @UserId = Id FROM Users WHERE Username = 'admin';

-- Insert Sample Materials
IF NOT EXISTS (SELECT 1 FROM Materials WHERE UserId = @UserId)
BEGIN
    INSERT INTO Materials (Name, Code, Batch, CreatedAt, UpdatedAt, UserId)
    VALUES 
        ('Red Paint', 'RED001', 'BATCH2024001', GETUTCDATE(), GETUTCDATE(), @UserId),
        ('Blue Paint', 'BLU001', 'BATCH2024002', GETUTCDATE(), GETUTCDATE(), @UserId),
        ('White Paint', 'WHT001', 'BATCH2024003', GETUTCDATE(), GETUTCDATE(), @UserId),
        ('Green Paint', 'GRN001', 'BATCH2024004', GETUTCDATE(), GETUTCDATE(), @UserId),
        ('Yellow Paint', 'YLW001', 'BATCH2024005', GETUTCDATE(), GETUTCDATE(), @UserId);
END
GO
