import grapqhl from 'graphql-tag'

export default grapqhl`
     query listTypeIns {
     listTypeIns{
         items{
            id
            name
            typename
         }   
     }}
     `