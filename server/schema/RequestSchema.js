const { gql } = require("apollo-server")
const RequestController = require("../controllers/RequestController")

const typeDefs = gql`
  type Request {
    _id: ID
    user: User
    invoice: String
    time: Int
    okupasi: String
    harga: Int
    konstruksi: String
    alamat: String
    provinsi: String
    kota: String
    kabupaten: String
    daerah: String
    gempa: Boolean
    status: String

  }

  input RequestInput {
    time: Int
    okupasi: String
    harga: Int
    konstruksi: String
    alamat: String
    provinsi: String
    kota: String
    kabupaten: String
    daerah: String
    gempa: Boolean
    status: String
  }

  type Okupasi {
    _id: ID
    name: String
  }

  extend type Query {
    request: [Request]
    okupasi: [Okupasi]
  }

  extend type Mutation {
    insertRequest(_id:String, data: RequestInput): Request

    insertOkupasi(name: String): Okupasi
    editOkupasi(_id: ID, name: String): Okupasi
  }
`
const resolvers = {
  Query: {
    request: async () => {
      return await RequestController.fetchRequests()
    }
  },
  Mutation: {
    insertRequest: async (_, args) => {
      const data =  await RequestController.insertRequest(args)
      return data
    },
  },
}

module.exports = { typeDefs, resolvers }
