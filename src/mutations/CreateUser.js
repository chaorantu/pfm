import graphql from 'graphql-tag'

export default graphql`
  mutation createUser(
  $id: ID!
  $username: String!
  $password: String!
  ){
  createUser(input:{
  id: $id, username: $username, password: $password})
  {
  id
  username
  password
  }
  }`