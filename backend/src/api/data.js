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
  {
      id: 3,
      type: 'word',
      value: 'Tumorwachstum',
      definition: 3
  }
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
  },
  {
    id: 3,
    type: 'definition',
    value: `Tumoren können gutartig oder bösartig sein, fachsprachlich benigne oder maligne. 
    Nur bösartige Tumoren bezeichnet man als Krebs`
  }
]

export {
  words,
  definitions
}
