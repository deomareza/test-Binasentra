const {ApolloServer, gql, makeExecutableSchema} = require('apollo-server')
const {database, ObjectID, client} = require('./config/config')
const {typeDefs : userTypes, resolvers: userResolvers} = require('./schema/UserSchema')
const {typeDefs : requestTypes, resolvers: requestResolvers} = require('./schema/RequestSchema')
// const RequestSchema = require('./schema/RequestSchema')

const PORT = 4000

const typeDefs = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    userTypes,
    requestTypes
  ],
  resolvers: [
    userResolvers,
    requestResolvers
  ]
})


const server = new ApolloServer({
  schema
})

server.listen({ port: PORT })
.then(({ url }) => {
  console.log(`server ready at ${url}`)
})