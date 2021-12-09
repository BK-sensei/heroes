const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 5000

const superHeroes = require("./routes/heroes")

app.use(cors())

app.use(express.json())

app.use('/heroes', superHeroes)

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})