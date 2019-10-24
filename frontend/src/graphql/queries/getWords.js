import gql from 'graphql-tag'

const getWords = gql`
  query getWords {
    words {
      id,
      value,
      definition {
        value
      }
    }
  }
`

export default getWords
