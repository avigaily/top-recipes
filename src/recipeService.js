import axios from 'axios'
const API = 'https://api.spoonacular.com/recipes'
// const API_KEY = process.env.API_RECIPE
const API_KEY = "ec7671d9c02943c9839b6797597a6823"
var gRecipes = null
// const key = 'recipes'

export default {
    query,
    getById
}

async function query(filterUrl, number = 15) {
    //filter: '?q={where to search}={value to search}'
    var filter = filterUrl.substring(3)
    if (!filter) {
        let recipes = await axios.get(`${API}/complexSearch?apiKey=${API_KEY}&number=${number}`)
        return recipes.data.results
    }
    var filterStr = _shortenStr(filter)
    let recipes = await axios.get(`${API}/complexSearch?apiKey=${API_KEY}${filterStr}&number=${number}`)
    gRecipes = await recipes.data.results
    return gRecipes
}

function _shortenStr(str) {
    var strMap = {}
    var shortStr = ''
    var parts = str.split('&')
    parts.forEach(part => {
        part = part.split('=')
        var category = part[0]
        var value = part[1]
        if (strMap[category]) {
            value = strMap[category]+',' + value
        }
        strMap[category] = value
    });
    for (const category in strMap) {
        shortStr = shortStr + '&' + category + '=' + strMap[category]
    }
    return shortStr
}

async function getById(id) {
    var recipe = await axios.get(`${API}/${id}/information?apiKey=${API_KEY}&includeNutrition=false`)
    console.log(recipe.data);
    return recipe.data
}
