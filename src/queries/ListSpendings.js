import grapqhl from 'graphql-tag'

export default grapqhl`
     query listSpendings {
     listSpendings{
         items{
            id
            username
            type
            name
            date
            amount
         }   
     }}`