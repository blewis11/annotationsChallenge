import { isEmpty } from 'ramda'

const words =  [ 
    {
        id: 1,
        type: 'word',
        value: 'Sicherheit',
        definition: 1
    },
    {
        id: 2,
        type: 'word',
        value: 'Kombinationstherapie',
        definition: 2
    },
]

const definitions = [
    {
        id: 1,
        type: 'definition',
        value: `Im Kontext von klinischen Studien bezeichnet der Begriff die Schwere, Häufigkeit und Art
        von unerwünschten Nebenwirkungen, die unter der Behandlung mit einem Medikament auftreten`,
    },
    {
        id: 2,
        type: 'definition',
        value: `Anwendung von zwei oder mehr Therapien zur Behandlung der gleichen Erkrankung. Es
        kann dabei um die Behandlung mit mehreren Medikamenten oder auch um eine Anwendung mehrerer
        Therapieformen (z.B. Medikamente plus Bestrahlung) gehen. Nicht damit gemeint ist die Einnahme von
        mehreren Medikamenten zur Behandlung verschiedener Erkrankungen`,
    }
]

const data = [...words, ...definitions]

const resolvers = {
  Query: {
      definition: (root, { word }) => {
        const matchingWords = words.filter(item => {
            return item.value === word
        }) // need to error handle
        
        if (isEmpty(matchingWords)){
            console.log('no word items found')
            return null;
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
        console.log(`we are in words query`)
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
