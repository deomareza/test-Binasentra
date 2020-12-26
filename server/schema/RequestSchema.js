const { gql } = require("apollo-server")
const RequestController = require("../controllers/RequestController")

const typeDefs = gql`
  type Request {
    _id: ID
    user: String
    invoice: String
    polis: String
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
    rate: Float
  }

  extend type Query {
    request: [Request]
    findOneRequest(_id:String): Request
    findUserRequests(_id:String) : [Request]
    
    okupasi: [Okupasi]
    findOneOkupasi(_id:String) : Okupasi
  }

  extend type Mutation {
    insertRequest(_id:String, data: RequestInput): Request

    adminChangeStatus(_id:String, invoice:String, status:String) : Request

    insertOkupasi(name: String, rate:Float): Okupasi
    editOkupasi(_id: ID, name: String, rate:Float): Okupasi
  }
`
const resolvers = {
  Query: {
    request: async () => {
      return await RequestController.fetchRequests()
    },

    okupasi: async () => {
      return await RequestController.fetchOkupasi()
    },

    findOneRequest: async (_, args, context) => {
      console.log(context)
      return await RequestController.fetchOneRequest(args)
    },

    findUserRequests: async(_, args) => {
      console.log(args)
      return await RequestController.fetchUserRequests(args)
    },

    findOneOkupasi: async(_, args) => {
      return await RequestController.fetchOneOkupasi(args)
    }
  },
  Mutation: {
    insertRequest: async (_, args) => {
      // console.log('inserting request')
      // console.log(args)
      const data =  await RequestController.insertRequest(args)
      return data
    },

    insertOkupasi: async(_, args) => {
      console.log('inserting okupasi')
      console.log(args)
      const data = await RequestController.insertOkupasi(args)
      return data
    },

    editOkupasi: async(_, args, ) => {
      console.log('edit okupasi')
      const data = await RequestController.editOkupasi(args)
      return data
    },

    adminChangeStatus: async(_, args) => {
      // console.log('admin approving request')
      // console.log(args)
      console.log(args)
      const data = await RequestController.adminChangeStatus(args)
      return data
    }
  },
}

module.exports = { typeDefs, resolvers }
