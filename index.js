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
    }  
    type Mutation {
        createUser(input: InputCreateUser): User
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