import { gql } from "@apollo/client"

export const GET_PREMI = gql`
  query GetPremi {
    premi {
      time
      okupasi
      harga
      konstruksi
      alamat
      provinsi
      kota
      kabupaten
      daerah
      gempa
    }
  }
`

export const GET_USERS = gql`
  query Users {
    users {
      _id
      role
      name
    }
  }
`

export const GET_ONE_USER = gql`
  query FindOneUser($_id: String) {
    findOneUser(_id: $_id) {
      name
      email
    }
  }
`

export const USER_LOGIN = gql`
  query UserLogin($email: String) {
    userLogin(email: $email) {
      _id
      role
      name
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($_id: String, $data: EditUserInput) {
    updateUser(_id: $_id, data: $data) {
      name
      email
    }
  }
`

export const ADD_ONE_REQUEST = gql`
  mutation InsertRequest($_id: String, $data: RequestInput) {
    insertRequest(_id: $_id, data: $data) {
      time
    }
  }
`
