import graphql from 'graphql-tag'

export default graphql`
  mutation createIncome(
  $id: ID!
  $username: String!
  $type: String!
  $name: String!
  $date: String!
  $amount: Float!
  ){
  createIncome(input:{
  id: $id, username:$username,
  type:$type,
  name:$name,
  date:$date,
  amount:$amount})
  {
  id
  username
  type
  name
  date
  amount
  }
  }`