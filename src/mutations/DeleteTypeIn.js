import grapqhl from 'graphql-tag'

export default grapqhl`
     mutation deleteTypeIn (
     $id: ID!
     ){
  deleteTypeIn(input:{
  id: $id})
  {
  id
  }
  }`