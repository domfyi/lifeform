# lifeform

lifeform accepts an id for a classification of life and fetches a portfolio of information.

### Install with NPM

```bash
npm install lifeform --save
```

### Getting Started
At its simplest.

```js
const lifeform = require('lifeform')
lifeform.find('123').then(console.log)

/*{ [Object lifeform]
    
    'id': '123',
    'name': 'bacterius bobberius'
    'articleLong: ['lorum ipsum chunk', 'lorum ipsum chunk'],
    'articleShort': 'lorum ipsum chunk',
    'facts': { discoveryYear: 1998, },
    'image': 'imgur.com/b0bBy.png,
    'lineage' ['id_of_kingdom', 'id_of_family', 'id_of_genus', ],
    'links': [ { type: 'paper', title: '', url: '', } ],
    'nearestVisualParent': [Object lifeform],
    'thumbnail': ';base64'
}*/
```

### Find

The only method is `lifeform.find(id, [include])`.

`[include]` is an array that allows you to specify a list of keys to return. The example in the *Getting Started* section shows the fields which are returned by default (all of them).

```js
lifeform.find('123', ['name', 'articleShort']).then(console.log)

/*{ [Object lifeform]

    'id': '123',
    'name': 'bacterius bobberius',
    'articleShort': 'lorum ipsum chunk'
}*/
```

### Notes

- Conservative. Better no match than an incorrect match.
- All of the functions that make API calls to external services have rate-limiters attached.