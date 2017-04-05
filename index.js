
// NCBI

const ncbiPrefix = 'https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi'

// Let's do the NCBI stuff first. We scrape the page and grab everything we can. Cheerio is going to do the DOM traversal. Our aim it to get the following straight from the page:

// Name. Rank. Lineage. Links. 

const cheerio = require('cheerio')
const querystring = require('querystring')
const request = require('request-promise')

// We need do some pretty ugly scrapey stuff to be frank, especially to strip out the lineage. We are removing items that have been designated no rank from the lineage too, reducing noise. We are grabbing the name of the lifeform from the page titel. Look at that regex, yikes.

const getFactsheet = id =>
{
  return new Promise(async (resolve, reject) => {
    const url = `${ ncbiPrefix }?mode=Info&id=${ id }`
    let data = await request(url)
    if (!data) return reject()
    let $ = cheerio.load(data)
    const name = $('title').text().slice(0, -1).replace('Taxonomy browser (', '')
    const rankHTML = $("em:contains('Rank: ')").parent().html()
    const regex = /Rank: <\/em>([a-zA-Z]*)(<br><em>)/g
    const rankMatch = regex.exec(rankHTML)
    const rank = rankMatch ? rankMatch[1] : 'unknown'
    const lineage = extractLineage($('dl dd a'))
    const links = extractLinks(data)
    return resolve({ name, rank, lineage, links })
  })
}

const extractLineage = (data) =>
{
  let lineage = []
  data.map((i, tag) => {
    const id = querystring.parse(tag.attribs.href).id
    const name = tag.children[0].data.trim()
    const rank = tag.attribs.title
    if (id && name && rank && rank !== 'no rank') lineage.push({ id, name, rank })
  })
  return lineage
}

const extractLinks = (data) =>
{
  return ['todo']
}



// Article

const wtf_wikipedia = require("wtf_wikipedia")

// For the article, we're going through the page and grabbing the first sentence from each section and building these fragments up up into a new summary. This is a crude attempt at useful information parsing but until we can train a little deep learning model to do it for us, it does work suprisingly well.

// This wtf_wikipedia runs a bunch of markup-stripping scripts to break it down to the pure words but it falls down a little. A bit of patching up here, we remove anything found inside either rounded or triangular brackets. For the description we are checking if the first sentance starts with the name of the lifeform and the word 'is'. We can strip that and have it still make semenatic sense.

const getText = (name) =>
{
  return new Promise(function (resolve, reject) {
    wtf_wikipedia.from_api(name, 'en', (markup) => {
      const data = (wtf_wikipedia.parse(markup))
      const summary = [...data.text.entries()].map(function (item) {
        return item[1][0].text
          .replace(/\s*\<.*?\>\s*/g, '')
          .replace(/\s*\(.*?\)\s*/g, '')
      })
      const commonStart = `${name} is `.toLowerCase()
      let description = summary[0]
      if (description && description.toLowerCase().slice(0, commonStart.length) === commonStart) {
        description = description.slice(commonStart.length).trim()
      }
      const article = summary.slice(0, 7)
      resolve({ description, article })
    })
  })
}



// Image

const nodeWiki = require('nodemw')
const wiki = new nodeWiki({ protocol: 'https', server: 'en.wikipedia.org', path: '/w'})

// Find an image. We're using the mediaWiki library to search for wikipedia CC images. We make sure that the image is big enough too and the right format.

const imageFormats = ['.jpg', '.png', '.gif']
const minSizePX = 300

// These callbacks are horrible. We need to promisify these STAT. Also, it's only checking the first image for suitability, it should check every single one in the array.

const getImage = (name) =>
{
  return new Promise(async (resolve, reject) => {
    try {
      if (!name) return resolve()
      wiki.getArticle(name, true, (error, data, redirect) => {
        if (redirect && redirect.to) name = redirect.to
        wiki.getImagesFromArticle(name, (error, data) => {
          const images = data.filter(image => imageFormats.includes(image.title.slice(-4)))
          if (!images.length) return resolve()
          const image = images[0].title 
          wiki.getImageInfo(image, (error, data) => {
            if (data.url && data.width > minSizePX && data.height > minSizePX) {
              const imageURL = data.url
              const thumbnail = 'todo'
              return resolve({ imageURL, thumbnail })
            }
            resolve()
          })
        })
      })
    }
    catch (error) {
      resolve()
    }
  })
}



// Parent With Image

// This runs down the lineage, looking for a parent with an image using the getImage method above on loop. Once it finds one it just returns the parents id.

const getParentWithImage = (lineage) =>
{
  return new Promise(async (resolve, reject) => {
    for (let item of lineage.reverse()) {
      try {
        let url = await getImage(item.name)
        if (url) return resolve(item.id)
      }
      catch (error) {  }
    }
    reject()
  })
}



// Ship.

// Facts, links, and thumbnail are still todo.

module.exports =
{
  find: (id, include) => {
    return new Promise(async (resolve, reject) => {
      try {
        const requested = new Date()

        const { name, rank, lineage, links } = await getFactsheet(id)
        const { description, article } = await getText(name)
        const { imageURL, thumbnail } = await getImage(name)
        const parentWithImage = (!imageURL) ? await getParentWithImage(lineage) : false
        const facts = { /* todo */ }
      
        const elapsed = `${(((new Date()) - requested) / 1000).toFixed(1)}s`
        
        resolve({
          id,
          article,
          description,
          facts,
          imageURL,
          lineage,
          links,
          name,
          parentWithImage,
          rank,
          thumbnail,
          _meta: { requested, elapsed },
        })
      }

      catch (error) { reject(error) }
    })
  }
}