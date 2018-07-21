import grapqhl from 'graphql-tag'

export default grapqhl`
     query listUsers {
     listUsers{
         items{
            id
            username
            password
         }   
     }}
     `