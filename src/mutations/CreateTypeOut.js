import graphql from 'graphql-tag'

export default graphql`
  mutation createTypeOut(
  $id: ID!
  $name: String!
  $typename: String!
  ){
  createTypeOut(input:{
  id: $id, name: $name, typename: $typename})
  {
  id
  name
  typename
  }
  }`