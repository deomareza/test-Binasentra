import {client} from '../config/graphql'
import {GET_PREMI} from '../query/'

export function UserCheckPremi() {
  const {premi} = client.readQuery({
    query: GET_PREMI
  })
  return(
    <div>User check premi page
      {JSON.stringify(premi)}

    </div>
  )
}