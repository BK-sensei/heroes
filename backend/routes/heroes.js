const express = require("express")
const app = express()

let superHeroes = require("../superheroes.json")

//--- middleware qui vérifie que le hero n'existe pas
const existingHero = (req, res, next) => {
    const { slug } = req.params
    const hero = superHeroes.find(hero => hero.slug === (slug))

    if (!hero) {
        res.status(404).send("Not found")
    } else {
        next()
    }
}

//--- route heroes qui récupère tous les héros
app.get("/", (req, res) => {
    res.json(superHeroes)
})

//--- route qui récupère un super héros
app.get("/:slug", existingHero, (req, res) => {
    const { slug } = req.params
    const hero = superHeroes.find(hero => hero.slug === slug )
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
app.post("/", (req, res) => {

    // condition si l'héro ajouté est déjà présent dans la liste, alors on renvoit un message d'erreur sinon, le nouvel héro est ajouté à la liste
    if (existingHero){
        res.status(409).send("This hero is already in the list")
    } else {
        const hero = {
            id: superHeroes.length + 1,
            ...req.body
        }
        superHeroes = [...superHeroes, hero]
    }

    res.json(superHeroes)
})

//--- route qui ajoute un pouvoir à un super héros
app.put("/:slug/power", (req, res) => {
    const { slug } = req.params
    const heroPower = superHeroes.find(power => power.slug === slug)
    const superpower = req.body.power // power = clé 'power' du fichier json
    const newPower = [...heroPower.power, superpower]
    res.json(newPower)
})

//--- route qui efface un héros de la liste
app.delete("/:slug", existingHero, (req, res) => {
    const { slug } = req.params
    const index = superHeroes.findIndex(hero => hero.slug === slug)

    superHeroes.splice(index, 1)
    res.status(204).send(`The super hero ${index} has been delete.`)
})

//--- route qui efface un pouvoir du héro spécifique
app.delete("/:slug/power/:power", existingHero, (req, res) => {
    const { slug } = req.params
    const { power } = req.params
    const index = superHeroes.power.findIndex(power => power.slug === slug )
    superHeroes.power.splice(index, 1)
    res.status(204).send(`The power ${power} of the hero ${slug} has been delete.`)
})

module.exports = app