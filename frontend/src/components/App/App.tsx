import React from 'react'
import enhance from '../enhance'
import { contains } from 'ramda'

import './App.css'

const getTokenizedText = (): string[] => {
  const pageText = `Diese Studie untersucht einen neuen Behandlungsansatz der Krebsimmuntherapie für Betroffene mit
  nicht-kleinzelligem Lungenkrebs. Es soll die beste Dosierung bezüglich Sicherheit und Wirksamkeit für
  eine Kombinationstherapie mit zwei Prüfpräparaten, BI 836880 und BI 75409, gefunden werden, die
  das Tumorwachstum auf unterschiedliche Weise hemmen.`

  return pageText.split(" ")
}

const App = (props: any) => {
  const {
    words,
    getAnnotation,
    annotation
  } = props
  
  const text = getTokenizedText()
  const textToDisplay = text.map((word, i) => {
    if (words && contains(word, words)){
      return (
        <span 
          className="clickableWord"
          key={i}
          onClick={() => getAnnotation(word)}>{word} </span>
      )
    }
    return (
      <span key={i}>{word} </span>
    )
  })
  return (
    <div className="App">
    <div className="textContainer">
      <div className="mainText">
        {textToDisplay}
      </div>     
      <div className="annotation">
        {annotation}
      </div>
    </div>
    </div>
  )
}

export default enhance(App)
