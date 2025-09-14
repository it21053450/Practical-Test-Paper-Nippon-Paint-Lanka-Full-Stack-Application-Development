-- Create Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MaterialManagementDB')
BEGIN
    CREATE DATABASE MaterialManagementDB;
END
GO

USE MaterialManagementDB;
GO
