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
console.log(await lifeform.find('123'))

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

#### Find

The only method is `lifeform.find(id, [include])`.

`[include]` is an object that allows you to specify which fields are returned. The example in the *Getting Started* section above shows the fields which are returned by default (all of them).

```js
console.log(await lifeform.find('123', ['name', 'articleShort']))

/*{ [Object lifeform]

    'id': '123',
    'name': 'bacterius bobberius',
    'articleShort': 'lorum ipsum chunk'
}*/
```

#### Notes

- Conservative. Better no match than an incorrect match.
- All of the functions that make API calls to external services have rate-limiters attached.