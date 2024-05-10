//PRUEBA 7 - Diseña una API REST utilizando Express que permite a los usuarios crear, leer, modificar, 
//actualizar y eliminar elementos de una lista.

//Haz la solución en el archivo solutions/server.js y exporta el app y server creado. 
//Instala Express con npm install express. No te preocupes por CORS.

import express from 'express'

export const app = express()
app.use(express.json())

const items= [{
    id: 1,
    content: 'Item 1'
}]

//Aqui debo utilizar GET/items, GET/items/:id, POST/items , PUT/items/:id, DELETE/items:id

//GET/items (para recuperarlos todos)
app.get('/items', (req, res) => {
    return res.json(items)
});
//GET/items/:d (para recuperar uno)
app.get('/items/:d', (req, res) => { //segmento dinamico
    const {id} = req.params
    const itemFound = items.find(item => item.id === Number(id))
    return res.json (itemFound)
});
//POST/items (para crear uno)
app.post('/items', (req, res) => {
    const { content } = req.body
    const newId = items.length + 1 
    const newItem = { id: newId, content }
    item.push(newItem)
});
//PUT/items/:id, (actualizar)
app.put('/items/:id', (req, res) => {
    const { id } = req.params
    const { content } = req.body
    const itemFound = items.find(item => item.id === Number(id))
    itemFound.content = content //uso esto en este caso por que no estamos trabajando con una base de datos, si fuera el caso no sirve
    return res.json(itemFound)
});
//DELETE/items:id (borrar)
app.delete('/items/:id', (req, res) => {
    const { id } = req.params
    const itemIndex = items.findIndex(item => item.id === Number(id))
    items.splice(itemIndex, 1) //decimos que queremos eliminar uno
    return res.status(200).json()
});

export const server = app.listen (process.env.PORT ?? 3000)