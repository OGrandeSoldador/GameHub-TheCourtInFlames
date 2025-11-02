-- Cria o banco se ainda não existir
IF DB_ID('gamehub') IS NULL
BEGIN
    CREATE DATABASE gamehub;
END
GO

USE gamehub;
GO

SELECT name FROM sys.server_principals WHERE name = N'sa';
GO

IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = N'gamehub')
BEGIN
    CREATE LOGIN gamehub WITH PASSWORD = N'Saw50812@';
END
GO

IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = N'gamehub')
BEGIN
    CREATE USER gamehub FOR LOGIN gamehub;
    ALTER ROLE db_owner ADD MEMBER gamehub; 
END
GO
