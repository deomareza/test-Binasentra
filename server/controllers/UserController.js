const { database, ObjectID } = require("../config/config")
const collection = database.collection("Users")
const requestCollection = database.collection("Requests")

class UserController {
  static async findUsers() {
    try {
      return await collection.find().toArray()
    } catch (error) {
      console.log(error)
    }
  }

  static async findOneUser(payload) {
    try {
      const { _id } = payload
      const user = await collection.findOne({"_id":ObjectID(_id)})
      return user
      
    } catch (error) {
      console.log(error)
    }
  }
  static async userLogin(payload) {
    try {
      const { email } = payload
      const user = await collection.findOne({"email":email})

      return user
    } catch (error) {
      console.log(error)
    }
  }

  static async findUserRequest(payload) {
    try {
      const _id = payload
      const requests = await requestCollection.find({"user._id": ObjectID(_id)}).toArray()
      return requests
      
    } catch (error) {
      console.log(error)
    }
  }

  static async insertUser(payload) {
    try {
      const { name, email, role } = payload

      const data = await collection.insertOne({
        name,
        email,
        role,
      })

      return data.ops[0]

    } catch (error) {
      console.log(error)
    }
  }

  static async updateUser(payload) {
    try {
      const { _id } = payload
      const { name, email } = payload.data

      const data = await collection.findOneAndUpdate(
        { _id: ObjectID(_id) },
        { $set: {
          name, email
        }}
      )
      
      return data.value

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserController
