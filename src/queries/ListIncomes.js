import grapqhl from 'graphql-tag'

export default grapqhl`
     query listIncomes {
     listIncomes{
         items{
            id
            username
            type
            name
            date
            amount
         }   
     }}`