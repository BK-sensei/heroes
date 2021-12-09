const express = require("express")
const app = express()

let superHeroes = require("../superheroes.json")

//--- route heroes qui récupère tous les héros
app.get("/", (req, res) => {
    res.json(superHeroes)
})

//--- route qui récupère un super héros
app.get("/:slug", (req, res) => {
    const { slug } = req.params
    const hero = superHeroes.find(hero => hero.slug === slug )
    res.json(power)
})

//--- route qui récupère les pouvoirs d'un super héros
app.get("/:slug/powers", (req, res) => {
    const { slug } = req.params
    const power = superHeroes.find(power => power.slug === slug )
    const powers = power.power
    res.json(powers)
})

//--- route qui ajoute un super héros
app.post("/", (req, res) => {
    // middleware qui vérifie que le hero n'existe pas
    const existingHero = superHeroes.find(hero => hero.slug === req.body.slug)

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
app.put("/:slug/powers", (req, res) => {
    const { slug } = req.params
    const heroPower = superHeroes.find(power => power.slug === slug)
    const superpower = req.body.power // power = clé 'power' du fichier json
    const newPower = [...heroPower.power, superpower]
    res.json(newPower)
})

module.exports = app