REM Configure your MongoDB and DB path. Make sure that the DB folder exists.
SET MONGO_PATH="C:/Program Files/MongoDB/Server/3.2/bin"
SET DB_PATH="D:/Workspaces/WorkspaceJS/NeverRESTing/data"

cd /d %MONGO_PATH%
mongod.exe --dbpath=%DB_PATH%
pause