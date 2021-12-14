const express = require("express")
const app = express()

let superHeroes = require("../superheroes.json")

// ***** MIDDLEWARES ******

//--- middleware qui vérifie que le hero n'existe pas
const existingHero = (req, res, next) => {
    const { name } = req.body
    const hero = superHeroes.find(hero => hero.name === name)

    if (hero) {
        res.status(409).send("This hero is already in the list")
    } else {
        next()
    }
}

//--- middleware qui verifie qu'un hero existe avant de faire la suite
const successIfExists = (req, res, next) => {
    const { slug } = req.params
    const hero = superHeroes.find(hero => hero.slug === slug)
  
    if (hero) {
      next()
    } else {
      res.send(404).send("Hero not found")
    }
}

//--- middleware qui valide les info arrivant dans le body de la requête sont les mêmes que le format de base
const validateHero = (req, res, next) => {
    const allowedKeys = Object.keys(superHeroes[0])
    const bodyKeys = Object.keys(req.body)
    const invalidKey = bodyKeys.find(key => !allowedKeys.icludes(key))

    if (invalidKey){
        res.status(400).send("This request is invalide")
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
app.get("/:slug", successIfExists, (req, res) => {
    const { slug } = req.params
    const hero = superHeroes.find(hero => hero.slug === slug)
    res.json(hero)
})

//--- route qui récupère les pouvoirs d'un super héros
app.get("/:slug/power", successIfExists, (req, res) => {
    const { slug } = req.params
    const hero = superHeroes.find(power => power.slug === slug )
    const powers = hero.power
    res.json(powers)
})

//--- route qui ajoute un super héros
app.post("/", existingHero, validateHero, (req, res) => {
    const newHero = {
        slug: req.body.name.toLowerCase().replace(/[^\w]/gi,'-'),
        ...req.body
    }

    superHeroes = [...superHeroes, newHero]
    res.json(newHero)
})

//--- route qui ajoute un pouvoir à un super héros
app.put("/:slug/power", successIfExists, (req, res) => {
    const { slug } = req.params
    const heroPower = superHeroes.find(power => power.slug === slug)
    const superpower = req.body.power // power = clé 'power' du fichier json

    heroPower.power = [...heroPower.power, superpower]
    res.json(heroPower.power)

    //--- solution n°2 ---
    // const { slug } = req.params
    // const hero = superHeroes.find(hero => hero.slug === slug)
    // hero.power = [ ...hero.power, req.body.power ] // => hero.power.push(req.body.power)
    // res.json(hero)
})

//--- route qui efface un héros de la liste
app.delete("/:slug", successIfExists, (req, res) => {
    const { slug } = req.params
    const hero = superHeroes.find(hero => hero.slug === slug)

    //--- methode 1: splice ---
    // const index = superHeroes.findIndex(hero => hero.slug === slug)
    // superHeroes.splice(index, 1)

    //--- methode 2: filter ---
    superHeroes = superHeroes.filter(hero => hero.slug !== slug)

    res.json(`The super hero ${hero.name} has been deleted.`)
})

//--- route qui efface un pouvoir du héro spécifique
app.delete("/:slug/power/:power", successIfExists, (req, res) => {
    const { slug, power } = req.params
    const hero = superHeroes.find(hero => hero.slug === slug)

    //--- methode 1: splice ---
    // const index = hero.power.findIndex(element => element === power )
    // hero.power.splice(index, 1)

    //--- methode 2: filter ---
    hero.power = hero.power.filter(p => p !== power)

    res.json(`The power ${power} of the hero ${hero.name} has been delete.`)
})

//--- route qui remplace tous les valeurs du héro existant par celles qui arrivent dans la requête
app.put ("/:slug", successIfExists, validateHero, (req,res) => {
    const { slug } = req.params
    const indexHero = superHeroes.findIndex(hero => hero.slug === slug)
    let hero = superHeroes[index]

    // res.json(heroes[indexHero])

    hero = {
        // hero de base
        ...hero,
    
        // chaque clés de req.body dont le nom correspond a une clé du hero de base va mettre a jour la valeur de la clé du hero de base
        ...req.body,
        slug: req.body.name.toLowerCase().replace(/[^\w]/gi, '-')
      }
    

    res.json(hero)
})

module.exports = app