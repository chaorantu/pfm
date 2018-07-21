import grapqhl from 'graphql-tag'

export default grapqhl`
     query listTypeOuts {
     listTypeOuts{
         items{
            id
            name
            typename
         }   
     }}
     `