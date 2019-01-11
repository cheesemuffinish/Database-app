# CS 4092 Homework #3

By Audrey Becker, Joseph Kollin, and Dane Isburgh

For the third homework assignment, we built web application that interfaces with the Reporting Developer database using a combination of [Node.js](https://nodejs.org/en/) and the [Tedious](http://tediousjs.github.io/tedious/) module to connect to a local SQL server.  The application's front-end and form inputs are built using simple HTML, CSS (with [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)), and JavaScript to send input requests to the server.

Below are steps to setup our web application on Windows 10 with SQL Server 2017 using the Reporting Developer database:
1.	Ensure you have a valid username/password user login for SQL Server authentication (application uses username: **admin** with password: **password**) with access to the Reporting Developer database and Server Roles set to serveradmin/sysadmin.  Click [here](https://msdn.microsoft.com/en-us/library/aa337562(v=sql.105).aspx) for more info.
2.	Ensure you enable the TCP/IP network protocol for SQL Server.  Click [here](https://technet.microsoft.com/en-us/library/hh231672(v=sql.110).aspx) for more info.
3.	Make sure the SQL Server and SQL Server Browser services are running.  Click [here](https://technet.microsoft.com/en-us/library/ms165734(v=sql.90).aspx) for more info.
4.	Install Node.js: https://nodejs.org/en/
5.	Clone the repository: `https://github.uc.edu/kollinjr/DatabaseDesignHW3.git`
6.	Change into project directory: `cd DatabaseDesignHW3`
6.	Install the dependencies: `npm install`
7.	Update database configuration variables
	- Open DatabaseDesignHW3 > app.js
	- Update the config variable (line 13) with your SQL Server’s associated key values
8.	Run the application: `npm start`
9.	Open app in browser: http://localhost:3000/
