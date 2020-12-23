const {gql} = require('apollo-server')
const UserController = require('../controllers/UserController')

const typeDefs = gql `
  type User {
    _id: ID
    name: String
    email: String
    role: String
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

  extend type Query {
    users: [User]
    userRequest(_id: ID): [Request]
  }

  extend type Mutation {
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
    },
    userRequest: async (_, args) => {
      try {
        const _id = args._id
        return await UserController.findUserRequest(_id)
        
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

module.exports = { typeDefs, resolvers }