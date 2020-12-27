import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {GET_PREMI} from '../query/'

export const client = new ApolloClient({
  // uri: 'http://localhost:4000',
  uri: 'http://18.141.202.237:4000',
  cache: new InMemoryCache()
})

client.writeQuery({
  query: GET_PREMI,
  data: {
    premi: {}
  }
})