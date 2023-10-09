const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by') // Deshabilita la cabecera que indica la tecnología que está siendo usada

app.use(express.json())

// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // Sólo llegan request que son POST y tiene el header Content-Type: application/json
//   let body = ''

//   // Escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     // Mutar la request y meter la información en el req.body
//     req.body = data
//     next()
//   })
// })

// app.get('/pokemon/ditto', (req, res) => {
//   res.json(dittoJSON)
// })

// app.post('/pokemon', (req, res) => {
//   // req.body deberíamos guardar en bbdd
//   res.status(201).json(req.body)
// })

// // La última a la que va a llegar
// app.use((req, res) => {
//   res.status(404).send('<h1>404</h1>')
// })

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
