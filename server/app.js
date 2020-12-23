const {ApolloServer, gql} = require('apollo-server')
const {database, ObjectID, client} = require('./config/config')
const UserController = require ('./controllers/UserController')

const PORT = 4000

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    role: String
    request : [Request]
  }

  type Request {
    _id: ID
    userID : String
    time: Int
    okupasi: String
    harga : Int
    konstruksi : String
    alamat: String
    provinsi: String
    kota: String
    kabupaten: String
    daerah: String
    gempa: Boolean
  }

  input UserInput {
    name: String
    email : String
    role : String
  }

  input EditUserInput {
    name: String
    email: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    insertUser(data: UserInput) : User
    updateUser(_id:ID, data: EditUserInput) : User
  }
`

const resolvers = {
  Query: {
    users: async () => {
      try {
        console.log('fetching user data')
        return await UserController.findUsers()

      } catch (error) {
        console.log(error)
      }
    }

  },
  Mutation: {
    insertUser: async (_, args) => {
      try {
        return await UserController.insertUser(args.data)

      } catch (error) {
        console.log(error)
      }
    },

    updateUser: async(_, args) => {
      try {
        console.log(args)
        return await UserController.updateUser(args)

        return returnedData
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({ port: PORT })
.then(({ url }) => {
  console.log(`server ready at ${url}`)
})