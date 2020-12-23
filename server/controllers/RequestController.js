const { database, ObjectID } = require("../config/config")
const {invoiceNumberFormat} = require('../helpers/invoiceNumberFormat')
const userCollection = database.collection("Users")
const collection = database.collection("Requests")

class RequestController{
  static async fetchRequests(){
    try {
      return await collection.find().toArray()
    } catch (error) {
      console.log(error)
    }
  }

  static async insertRequest(payload){
    try {
      const _id = payload._id
      const runningNumber = await collection.countDocuments()
      const invoice = `K.001.${invoiceNumberFormat(runningNumber + 1)}`

      const user = await userCollection.findOne({_id: ObjectID(_id)})
      const data = await collection.insertOne({...payload.data, user, invoice})

      return data.ops[0]

    } catch (error) {
      console.log(error)
    }
  }


}

module.exports = RequestController