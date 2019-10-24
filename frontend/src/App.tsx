import React from 'react'
import logo from './logo.svg'
import { compose, withHandlers } from 'recompose' 
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import withWords from './graphql/withWords'

import './App.css'

const enhance = compose(
  withWords,
  withApollo,
  withHandlers({
    getAnnotation: (props: any) => async (wordToSearch: string) => {
      console.log({props})
      const { data } = await props.client.query({
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

      console.log({data})
      return data
    } 
  }),
)

const App = (props: any) => {
  const {
    words,
    getAnnotation
  } = props
  
  console.log({words})
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getAnnotation("Kombinationstherapie")}>Click me</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default enhance(App)
