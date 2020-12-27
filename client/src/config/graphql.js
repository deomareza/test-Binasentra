import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {GET_PREMI} from '../query/'

// var uri = "mongodb+srv://admin:admin@cluster0.tndye.mongodb.net/insurance?retryWrites=true&w=majority"

export const client = new ApolloClient({
  // uri: 'http://localhost:4000',
  uri: `http://18.141.202.237:4000`,
  cache: new InMemoryCache()
})

client.writeQuery({
  query: GET_PREMI,
  data: {
    premi: {}
  }
})