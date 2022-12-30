## HOT TAKES

Backend server for Project 6 of OpenClassrooms' Web Developer path.

### Installation

Run `npm install` to get all the dependencies 


### Connection to the database

Create a .env file at the base the root of the project folder and add the provided credentials. 
The app will connect to an empty and ready to use database on start.
Connection to the database is normally restricted by IP whitelisting, but this setting has been disabled to allow OpenClassroms mentors to use the app form anywhere. 

### Running the app

Then run `npm run dev` to start the server and wait for a the following message to appear in the console before opening the front app : 
"Connection to MongoDB successful!" 

The backend should be avaible on : 
```
http://localhost:3000
```


### Testing routes 

I've used the vscode extension [REST Client from Huachao Mao](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to create simple http request. 
You'll find them in the .http file.
The requests it contains were made using data from my local testing.
Please make sure to update the relevant part for your own testing desire. 


The frontend to use this app with has been provided by OpenClassrooms and is available on this repo : 
[Student repository for project 6 of the Web Developer Path](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6)