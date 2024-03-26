"use strict";

const cors = require('cors')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true }))
app.use(express.json())

app.use(cors())

const port = 8000;

app.listen(port, () => {
    console.log(`listening to port:${port}`)
})