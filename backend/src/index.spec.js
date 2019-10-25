import { makeExecutableSchema } from 'graphql-tools'
import test from 'ava'
import { graphql } from 'graphql'

import resolvers from './api/resolvers'
import typeDefs from './api/schema'

test.before(async (t) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  t.context = {
    ...t.context,
    schema
  }
})
test('Should be able to retreieve a list of words to annotate', async (t) => {
  const { schema } = t.context

  const query = `
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

  const result = await graphql(schema, query, null, {})
  t.pass()
})

test('Given a word, a definition should be returned', async (t) => {
  const { schema } = t.context

  const query = `
    query getAnnotation($word: String!) {
      definition(word: $word) {
        id,
        value
      }
    }
  `
  const wordToSearch = 'Kombinationstherapie'
  const result = await graphql(schema, query, null, {}, {word: wordToSearch })
  t.pass()
})

test('If an invalid word is given, a meaningful error is returned', async (t) => {
  const { schema } = t.context

  const query = `
    query getAnnotation($word: String!) {
      definition(word: $word) {
        id,
        value
      }
    }
  `
  const wordToSearch = 'iamnotarealword'
  const result = await graphql(schema, query, null, {}, {word: wordToSearch })
  console.log(JSON.stringify(result))
  t.pass()
})
