const { database, ObjectID } = require("../config/config")
const { invoiceNumberFormat, polisGenerator } = require("../helpers/invoiceNumberFormat")
const userCollection = database.collection("Users")
const collection = database.collection("Requests")
const okupasiCollection = database.collection("Okupasi")

class RequestController {
  static async fetchRequests() {
    try {
      return await collection.find().toArray()
    } catch (error) {
      console.log(error)
    }
  }

  static async fetchOneRequest(payload) {
    try {
      const _id = payload._id
      return await collection.findOne({ _id: ObjectID(_id) })
    } catch (error) {
      console.log(error)
    }
  }

  static async fetchUserRequests(payload) {
    try {
      const _id = payload._id
      console.log(payload, "<<< dari controller")
      return await collection.find({ user: _id }).toArray()
    } catch (error) {
      console.log(error)
    }
  }

  static async fetchOneOkupasi(payload) {
    try {
      const _id = payload._id
      return await okupasiCollection.findOne({ _id: ObjectID(_id) })
    } catch (error) {
      console.log(error)
    }
  }

  static async insertRequest(payload) {
    try {
      const user = payload._id

      const lastRecord = await collection.find().sort({ _id:-1}).limit(1).toArray()
      console.log(lastRecord, '<<< last record')
      let runningNumber
      if(!lastRecord) {
        runningNumber = 1
      } else {
        runningNumber = lastRecord[0].invoice.split('.')[2]
        runningNumber = +runningNumber
      }

      const invoice = `K.001.${invoiceNumberFormat(runningNumber + 1)}`

      // const user = await userCollection.findOne({_id: ObjectID(_id)})
      const data = await collection.insertOne({
        ...payload.data,
        user,
        invoice,
      })

      return data.ops[0]
    } catch (error) {
      console.log(error)
    }
  }

  static async adminChangeStatus(payload){
    try {
      const {_id, invoice, status} = payload

      let polis

      if(status === "approved") {
        polis = polisGenerator(invoice)
      } 

      const data = await collection.findOneAndUpdate({ _id: ObjectID(_id)}, {
        $set: {
          status: status,
          polis: polis
        }
      })
      return data

    } catch (error) {
      console.log(error)
    }
  }

  static async fetchOkupasi() {
    try {
      return await okupasiCollection.find().toArray()
    } catch (error) {
      console.log(error)
    }
  }

  static async insertOkupasi(payload) {
    try {
      const data = await okupasiCollection.insertOne(payload)
      return data.ops[0]
    } catch (error) {
      console.log(error)
    }
  }

  static async editOkupasi(payload) {
    try {
      const { _id, name, rate } = payload
      const data = await okupasiCollection.findOneAndUpdate(
        { _id: ObjectID(_id) },
        { $set: {
          name, rate
        } }
      )
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = RequestController
