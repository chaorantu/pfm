import grapqhl from 'graphql-tag'

export default grapqhl`
     mutation deleteTypeOut (
     $id: ID!
     ){
  deleteTypeOut(input:{
  id: $id})
  {
  id
  }
  }`