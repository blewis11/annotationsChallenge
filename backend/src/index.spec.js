import { makeExecutableSchema } from 'graphql-tools'
import test from 'ava'
import { graphql } from 'graphql'

import resolvers from './api/resolvers'
import typeDefs from './api/schema'
import { definitions } from './api/data'

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

  const { data }  = await graphql(schema, query, null, {})
  
  t.truthy(data.words)

  const { words } = data

  t.is(words.length, 2)
})

test('Given a word, a definition should be returned', async (t) => {
  const { schema } = t.context
  const correctDefinition = definitions[1].value

  const query = `
    query getAnnotation($word: String!) {
      definition(word: $word) {
        id,
        value
      }
    }
  `

  const { data } = await graphql(schema, query, null, {}, {word:  'Kombinationstherapie'})
  t.truthy(data.definition)
  
  const { definition } = data
  t.true(definition.length > 0)
  t.is(definition[0].value, correctDefinition)
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
  t.truthy(result.errors)
  const { errors } = result
  t.is(errors[0].message, "no word items found")
})
