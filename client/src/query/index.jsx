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


export const GET_OKUPASI = gql`
  query Okupasi {
    okupasi {
      _id
      name
      rate
    }
  }
`

export const GET_ONE_OKUPASI = gql`
  query FindOneOkupasi($_id:String){
    findOneOkupasi(_id:$_id){
      name
      rate
    }
  }
`

export const EDIT_OKUPASI = gql`
  query EditOneOkupasi($_id:String, $name:String, $rate:Float){
    editOkupasi(_id:$_id, name:$name, rate:$rate){
      name
      rate
    }
  }
`

export const INSERT_OKUPASI = gql`
  mutation InsertOkupasi($name:String, $rate:Float){
    insertOkupasi(name:$name, rate:$rate){
      name
      rate
    }
  }
`

export const GET_USER_REQUESTS = gql`
  query FindUserRequests($_id: String){
    findUserRequests(_id:$_id){
      polis
      invoice
      status
      _id
    }
  }
`

export const GET_ALL_REQUESTS = gql`
  query GetAllRequests{
    request{
      _id
      invoice
      alamat
      okupasi
      harga
      time
      status
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
      _id
    }
  }
`

export const GET_ONE_REQUEST = gql`
  query FindOneRequest($_id:String){
    findOneRequest(_id:$_id){
      time
      invoice
      harga
      okupasi
    }
  }
`
export const ADMIN_UPDATE_STATUS = gql`
  mutation AdminUpdateStatus($_id:String, $invoice:String, $status:String) {
    adminChangeStatus(_id:$_id, invoice:$invoice, status:$status){
      time
    }
  }
`