const express = require("express")
const app = express()

let superHeroes = require("../superheroes.json")

// ***** MIDDLEWARES ******

//--- middleware qui vérifie que le hero n'existe pas
const existingHero = (req, res, next) => {
    const { slug } = req.body
    const hero = superHeroes.find(hero => hero.slug === slug)

    if (hero) {
        res.status(409).send("This hero is already in the list")
    } else {
        next()
    }
}

//--- middleware qui valide les info arrivant dans le body de la requête sont les mêmes que le format de base
const validateHero = (req, res, next) => {
    const element = superHeroes[0]
    const heroKeys = Object.keys(element)
    const heroBody = Object.keys(req.body)
    const invalidKey = heroBody.find(key => !heroKeys.icludes(key))

    if (invalidKey){
        res.status(409).send(`The key ${invalidKey} does not exist`)
    } else {
        next()
    }
}


// ***** ROUTES *****

//--- route heroes qui récupère tous les héros
app.get("/", (req, res) => {
    res.json(superHeroes)
})

//--- route qui récupère un super héros
app.get("/:slug", existingHero, (req, res) => {
    const { slug } = req.params
    const hero = superHeroes.find(hero => hero.slug === slug)
    res.json(hero)
})

//--- route qui récupère les pouvoirs d'un super héros
app.get("/:slug/power", (req, res) => {
    const { slug } = req.params
    const power = superHeroes.find(power => power.slug === slug )
    const powers = power.power
    res.json(powers)
})

//--- route qui ajoute un super héros
app.post("/", existingHero, (req, res) => {
    const newHero = {
        id: superHeroes.length + 1,
        ...req.body
    }

    superHeroes = [...superHeroes, newHero]
    res.json(superHeroes)
})

//--- route qui ajoute un pouvoir à un super héros
app.put("/:slug/power", (req, res) => {
    const { slug } = req.params
    const heroPower = superHeroes.find(power => power.slug === slug)
    const superpower = req.body.power // power = clé 'power' du fichier json

    heroPower.power = [...heroPower.power, superpower]
    res.json(heroPower.power)
})

//--- route qui efface un héros de la liste
app.delete("/:slug", existingHero, (req, res) => {
    const { slug } = req.params
    const index = superHeroes.findIndex(hero => hero.slug === slug)

    superHeroes.splice(index, 1)
    res.status(409).send(`The super hero ${index} has been delete.`)
})

//--- route qui efface un pouvoir du héro spécifique
app.delete("/:slug/power/:power", existingHero, (req, res) => {
    const { slug, power } = req.params
    const hero = superHeroes.find(hero => hero.slug === slug)
    const index = hero.power.findIndex(element => element === power )

    hero.power.splice(index, 1)
    res.status(409).send(`The power ${index} of the hero ${hero.name} has been delete.`)
})

//--- route qui remplace tous les valeurs du héro existant par celles qui arrivent dans la requête
app.put ("/:slug", existingHero, validateHero, (req,res) => {
    const { slug } = req.params
    const indexHero = superHeroes.findIndex(element => element.slug === slug)

    superHeroes[indexHero].slug = req.body.slug
    superHeroes[indexHero.name] = req.body.name
    superHeroes[indexHero.power] = req.body.power
    superHeroes[indexHero.color] = req.body.color
    superHeroes[indexHero.isAlive] = req.body.isAlive
    superHeroes[indexHero.age] = req.body.age
    superHeroes[indexHero.image] = req.body.image

    res.json(heroes[indexHero])
})

module.exports = app