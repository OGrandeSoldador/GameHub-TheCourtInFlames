-- Cria o banco gamehub
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'gamehub')
BEGIN
    CREATE DATABASE gamehub;
    PRINT '✅ Database gamehub criado';
END
GO

USE gamehub;
GO

-- Cria o login (usuário do servidor)
IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'gamehub')
BEGIN
    CREATE LOGIN gamehub WITH PASSWORD = 'Saw50812@';
    PRINT '✅ Login gamehub criado';
END
GO

-- Cria o usuário no banco
IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'gamehub')
BEGIN
    CREATE USER gamehub FOR LOGIN gamehub;
    ALTER ROLE db_owner ADD MEMBER gamehub;
    PRINT '✅ User gamehub criado com permissões';
END
GO

PRINT '🎉 Banco inicializado com sucesso!';
GO