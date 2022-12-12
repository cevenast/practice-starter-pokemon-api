const express = require('express')
const app = express()
const PORT = 8000

const pokemon = {
    starterPoke: {
    kanto: ['bulbasaur', 'charmander', 'squirtle'],
    johto: ['chikorita', 'cyndaquil', 'totodile'],
    hoenn: ['treecko', 'torchic', 'mudkip'],
    sinnoh: ['turtwig', 'chimchar', 'piplup'],
    unova: ['snivy', 'tepig', 'oshawott'],
    notRegion: ['grass','fire','water']
},
    types: {
        getType: function(type) {
            poke = []
            for (let region in pokemon.starterPoke){
            poke.push(pokemon.starterPoke[region][pokemon.types.typeConvertion[type]]) //change the [1]
            }
            poke.pop()
            return poke
        },
        typeConvertion:{grass: '0', fire: 1, water: 2}
    },
}


app.get('/', (req,res) => {
    res.sendFile(__dirname + '\\index.html')
})

app.get('/api/region/:pokemonRegion', (req,res) => {
    let region = req.params.pokemonRegion.toLowerCase()
    pokemon.starterPoke[region] ? res.json(pokemon.starterPoke[region]) : res.json(pokemon.starterPoke['notRegion'])
})

app.get('/api/type/:pokemonType', (req,res) => {
    let type = req.params.pokemonType.toLowerCase()
    pokemon.types.typeConvertion[type] ? res.json(pokemon.types.getType(type)) : res.json(['no such starter pokemon'])
    res.json(pokemon.types.getType(type))
    }
    )

app.listen(PORT, (req, res) => {
    console.log(`The server is now running on PORT ${PORT}`)
})
