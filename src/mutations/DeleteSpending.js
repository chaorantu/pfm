import grapqhl from 'graphql-tag'

export default grapqhl`
     mutation deleteSpending (
     $id: ID!
     ){
  deleteSpending(input:{
  id: $id})
  {
  id
  }
  }`