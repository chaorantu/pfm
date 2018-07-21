import grapqhl from 'graphql-tag'

export default grapqhl`
     mutation deleteIncome (
     $id: ID!
     ){
  deleteIncome(input:{
  id: $id})
  {
  id
  }
  }`