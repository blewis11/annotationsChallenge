import React from 'react'
import { compose, withHandlers, withState } from 'recompose' 
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { isEmpty } from 'ramda'

import withWords from '../graphql/withWords'

import './App.css'

const enhance = compose(
  withWords,
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

const App = (props: any) => {
  const {
    words,
    getAnnotation,
    annotation
  } = props
  
  return (
    <div className="App">
      <div>
        Diese Studie untersucht einen neuen Behandlungsansatz der <a onClick={() => getAnnotation("Kombinationstherapie")}> Krebsimmuntherapie </a> 
        für Betroffene mit nicht-kleinzelligem Lungenkrebs. Es soll die beste Dosierung bezüglich
        <a onClick={() => getAnnotation("Sicherheit")}> Sicherheit </a>und Wirksamkeit für
        eine kombinierte Behandlung mit zwei Prüfpräparaten, BI 836880 und BI 75409, gefunden werden, die
        das Tumorwachstum auf unterschiedliche Weise hemmen.
      </div>
      <div>
        -------------
        {annotation}
      </div>
    </div>
  )
}

export default enhance(App)
