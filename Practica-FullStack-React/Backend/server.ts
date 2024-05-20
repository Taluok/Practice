import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csvToJson from 'convert-csv-to-json'

const app = express()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors()) //aqui activo cors

app.post('/api/files', async (req, res) => {
    //extract file from request
    //validate that we have a file
    //transform the file (buffer) to string
    //trasnform string to CSV
    //save the Json to db (or memory)
    //return 200 with the message and the Json
    return res.status(200).json({data: [], message:'El archivo se cargo correctamente'})
})

app.get('/api/users',async (req, res) => {
    //extract the query param 'q' from the request
    //validate that we have the query param
    //filter the data from the db (or memory) with the query param
    //return 200 with the filtered data 
    return res.status(200).json({data:[]})
})

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

