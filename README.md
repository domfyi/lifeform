# lifeform

lifeform accepts an id for a classification of life and fetches a portfolio of information.

#### Install with NPM

```bash
npm install lifeform --save
```

#### Getting Started
At its simplest.

```js
const lifeform = require('lifeform')
const bobby_bacteria = await lifeform.find('123')
console.log(bobby_bacteria)

/*{ [Object lifeform]
    
    'id': '123',
    'name': 'bacterius bobberius'
    'articleLong: ['lorum ipsum chunk', 'lorum ipsum chunk'],
    'articleShort': 'lorum ipsum chunk',
    'facts': { discoveryYear: 1998, },
    'image': 'imgur.com/b0bBy.png,
    'lineage' ['id_of_kingdom', 'id_of_family', 'id_of_genus', ],
    'links': [ { type: 'paper', title: '', url: '', } ],
    'nearestVisualParent': [Object lifeform]
}*/
```

The only method is `lifeform.find(id, [include])`.

#### Include

`[include]` is an object that allows you to specify which fields are returned.

```js
const bob = await lifeform.find('123', ['name', 'articleShort'])
console.log(bob)
/*{ [Object lifeform]
    'id': '123',
    'name': 'bacterius bobberius',
    'articleShort': 'lorum ipsum chunk'
}*/
```

#### Notes

- All of the functions that make API calls to external services have rate-limiters attached.
- All of the functions that make API calls to external services have limiters attached.