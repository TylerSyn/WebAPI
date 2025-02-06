--Setup--

For setup you will need mongoDB installed properly onto your computer, along wiht node package manager
once each are set up istall the project and open on visual studio code and run the npm install command to install the needed packages onto your computer
with mongo db set up a new connection with (localhost:27017/GamesList)
after which you should be to run the program,however some features may not work right away since you do not have the database set or or any data inside it
so either add data manually, or use different option within the app to add the data.

--Authentification--

The authentification work by having some data move from one page to another
each time the app gets something that requires authentification it will run a function to see if the user is authorized to be there
if not it will bring them to the login, if they are they can continue to the next page
this is further secured by bcrypt, as when a user registers their password is encrypted
and when a user logs in it will decrypt that password and compare it with what they put in
