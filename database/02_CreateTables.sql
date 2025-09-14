USE MaterialManagementDB;
GO

-- Create Users Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        Id int IDENTITY(1,1) PRIMARY KEY,
        Username nvarchar(255) NOT NULL UNIQUE,
        PasswordHash nvarchar(max) NOT NULL,
        Role nvarchar(50) NOT NULL DEFAULT 'User',
        CreatedAt datetime2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

-- Create Materials Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Materials' AND xtype='U')
BEGIN
    CREATE TABLE Materials (
        Id int IDENTITY(1,1) PRIMARY KEY,
        Name nvarchar(255) NOT NULL,
        Code nvarchar(100) NOT NULL,
        Batch nvarchar(100) NOT NULL,
        CreatedAt datetime2 NOT NULL DEFAULT GETUTCDATE(),
        UpdatedAt datetime2 NOT NULL DEFAULT GETUTCDATE(),
        UserId int NOT NULL,
        FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
    );
END
GO

-- Create Indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Users_Username')
BEGIN
    CREATE INDEX IX_Users_Username ON Users(Username);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Materials_UserId')
BEGIN
    CREATE INDEX IX_Materials_UserId ON Materials(UserId);
END
GO
