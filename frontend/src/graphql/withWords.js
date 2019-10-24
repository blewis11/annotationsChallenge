import { graphql } from 'react-apollo'

import getWords from './queries/getWords'

const withWords = graphql(getWords, {
  props: ({data: {loading, words }}) => ({
    loading,
    words
  })
})

export default withWords
