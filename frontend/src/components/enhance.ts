import { compose, withHandlers, withState, branch, renderComponent } from 'recompose' 
import { withApollo } from 'react-apollo'
import { isEmpty } from 'ramda'
import gql from 'graphql-tag'

import withWords from '../graphql/withWords'
import Loading from './LoadingText/Loading'

const displayLoadingState = branch(
  (props: any) => props.loading,
  renderComponent(Loading),
)

const enhance = compose(
  withWords,
  displayLoadingState,
  withApollo,
  withState('annotation', 'setAnnotation', ""),
  withHandlers({
    getAnnotation: (props: any) => async (wordToSearch: string) => {
      const { setAnnotation } = props

      const { data: {definition} } = await props.client.query({
        query: gql`
        query getAnnotation($word: String!) {
          definition(word: $word) {
            id,
            value
          }
        }
        `,
        variables: {
          word: wordToSearch
        },
      })

      console.log(definition)
      if (definition && !isEmpty(definition)) {
        setAnnotation(definition[0].value)
      } else {
        setAnnotation("Woops! Something went wrong with retrieving that definition")
      }

      return definition
    } 
  })
)

export default enhance
