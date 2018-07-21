import graphql from 'graphql-tag'

export default graphql`
  mutation createTypeIn(
  $id: ID!
  $name: String!
  $typename: String!
  ){
  createTypeIn(input:{
  id: $id, name: $name, typename: $typename})
  {
  id
  name
  typename
  }
  }`