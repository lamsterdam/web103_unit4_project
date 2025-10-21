import dotenv from 'dotenv'

// tell the server how to read the .env file so it can use the variables in the database config
// use dotenv package and config to tell the server the path of the env 
dotenv.config({path: '../.env'})