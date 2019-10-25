import { isEmpty } from 'ramda'

import { words, definitions } from './data'

const data = [...words, ...definitions]

const resolvers = {
  Query: {
      definition: (root, { word }) => {
        const matchingWords = words.filter(item => {
            return item.value === word
        })
        
        if (isEmpty(matchingWords)){
            throw new Error("no word items found")
        }

        return data.filter(data => {
            return (
                data.type === 'definition' &&
                data.id === matchingWords[0].definition
            )
        })
      }, 
      definitions: () => {
        return data.filter(data => {
            return (data.type === 'definition')
        })
      },
      words: () => {
        return data.filter(data => {
            return (data.type === 'word')
        })
      },
      word: (root, { id }) => {
          return data.filter(data => {
                return (
                  data.type === 'word' && 
                  data.id === id
                )
          })
      }
  },
  Word: {
      definition: parent => {
        return data.filter(data => {
            return (
                data.type === "definition" &&
                data.id === parent.definition
            )
        })
      }
  }
}

export default resolvers
