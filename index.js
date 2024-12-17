const express = require('express')
const app = express()
const port = 3000
const { buildSchema } = require('graphql')
const { qraphqlHttp, graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose');
const User = require('./modules/User')

const schema = buildSchema(`
    type User {
        name: String
        password: String
        gmail: String
    }
    input InputCreateUser {
        name: String
        password: String
        gmail: String
    }
    type Query {
        hello: String
        showAllUsers:[User]
        showOneUser(id:String):User
    }  
    type Mutation {
        createUser(input: InputCreateUser): User
        deleteUser(id: String): String
        deleteAllUser: String
        loginUser(gmail:String,password:String):String
    }   
`)


const resolvers = {
    hello: () => "hello world",
    createUser:async({input})=>{
        const {name,password,gmail}= input
        const addNewUser= new  User({name, password , gmail})
        await addNewUser.save()
        return { 
            name,
            password,
            gmail
        }
    },
    showAllUsers: async () => {
        const users = await User.find(); 
        return users; 
    },
    showOneUser: async ({id}) => {
        const user = await User.findById(id); 
        const jsonUser= user.toJSON()
        console.log(jsonUser.name)
        return user; 
    },
    deleteUser:async ({id})=>{
        const user = await User.findById(id); 
        if (!user) {
            return "this is user is not funding"
        }
        await User.deleteOne({_id:id})
        return `Done delete User  , NAME : ${user.name} , GMAIL : ${user.gmail}`
    },
    deleteAllUser:async ()=>{
        await User.deleteMany()
        return "Done All Deleting"
    },
    loginUser: async ({ gmail, password }) => {
        // Use findOne to match gmail and password
        const user = await User.findOne({ gmail: gmail, password: password });
        
        if (user) {
            console.log("Login Successful", gmail, password);
            return "Login Successful";
        } else {
            console.log("Invalid Credentials", gmail, password);
            return "Invalid Credentials";
        }
    }    
}


app.use('/qraphql', graphqlHTTP({ schema, rootValue: resolvers, graphiql: true }))

app.listen(port, () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("DataBase is Running")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is Running`)
})