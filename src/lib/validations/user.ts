docker run --name sql_container -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=myPassword' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest


sudo /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "myPassword"

https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-cmd&tabs=cli#connect-to-sql-server

CREATE DATABASE Quero