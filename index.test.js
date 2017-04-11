
// node test.js

const lifeform = require('./index.js')

it('wolf', async () => {
  const wolf = await lifeform.find('9612')
  await expect(wolf).toBeDefined()
  await expect(wolf.name).toBeDefined()
  await expect(wolf.rank).toBeDefined()
  await expect(wolf.article.length).toBeGreaterThan(0)
  await expect(wolf.lineage.length).toBeGreaterThan(0)
})

/*

  { 

  id: '9612',
  article: [
    
    'The gray wolf or grey wolf, also known as the timber wolf or western wolf, is a canine native to the wilderness and remote areas of Eurasia and North America.',

    'The English \'wolf\' stems from the Old English wulf, which is itself thought to be derived from the Proto-Germanic *wulfaz.',

    'The species Canis lupus was first recorded by Carl Linnaeus in his publication Systema Naturae in 1758, with the Latinclassification translating into the English words "dog wolf".',

    'etc..'
  ],
  facts: {},
  imageURL: undefined,
  lineage:
   [ { id: '9611', name: 'Canis', rank: 'genus' },
     { id: '9608', name: 'Canidae', rank: 'family' },
     { id: '379584', name: 'Caniformia', rank: 'suborder' },
     { id: '33554', name: 'Carnivora', rank: 'order' },
     { id: '314145', name: 'Laurasiatheria', rank: 'superorder' },
     { id: '40674', name: 'Mammalia', rank: 'class' },
     { id: '89593', name: 'Craniata', rank: 'subphylum' },
     { id: '7711', name: 'Chordata', rank: 'phylum' },
     { id: '33208', name: 'Metazoa', rank: 'kingdom' },
     { id: '2759', name: 'Eukaryota', rank: 'superkingdom' } ],
  links: 'todo',
  meta: { requested: 2017-04-01T16:15:24.567Z, elapsed: '3.5s' },
  name: 'Canis lupus',
  parentWithImage: '9611',
  rank: 'species',
  thumbnail: undefined }

*/