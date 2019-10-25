import { gql } from "apollo-server-express"

const types = gql`
    type Definition {
      id: Int
      type: String
      value: String
    }
    type Word {
      id: Int
      type: String
      value: String
      definition: [Definition]
    }
    type Query {
      definition(word: String!): [Definition]
      definitions: [Definition]
      words: [Word]
      word(id: Int!): [Word]
  }
`


export default types
