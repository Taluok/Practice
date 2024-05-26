import express from 'express'
import cors from 'cors'
import multer from 'multer' // Esto es un middleware
import csvToJson from 'convert-csv-to-json'

const app = express()
const storage = multer.memoryStorage()
const upload = multer({ storage })

let userData: Array<Record<string, string>> = []

app.use(cors()) // Aquí activo cors

app.post('/api/files', upload.single('file'), async (req, res) => {
    // Extraer el archivo de la solicitud
    const { file } = req
    // Validar que tengamos un archivo
    if (!file) {
        return res.status(500).json({ message: 'File is required' })
    }
    // Validar que el archivo sea CSV
    if (file.mimetype !== 'text/csv') {
        return res.status(500).json({ message: 'File must be CSV' })
    }
    // Transformar el archivo (buffer) a cadena de texto
    let json: Array<Record<string, string>> = []
    try {
        const rawCsv = Buffer.from(file.buffer).toString('utf-8') // Esto es porque la información viaja en binario y necesito cambiarlo a cadena de texto
        // Transformar la cadena de texto a JSON
        json = csvToJson.fieldDelimiter(',').csvStringToJson(rawCsv)
    } catch (error) {
        return res.status(500).json({ message: 'Error parsing the file' })
    }
    // Guardar el JSON en la base de datos (o en memoria)
    userData = json
    // Devolver 200 con el mensaje y el JSON
    return res.status(200).json({ data: json, message: 'El archivo se cargó correctamente' })
})

app.get('/api/users', async (req, res) => {
    // Extraer el parámetro de consulta 'q' de la solicitud
    const { q } = req.query
    // Validar que tengamos el parámetro de consulta
    if (!q) {
        return res.status(500).json({ message: 'Query param `q` is required' })
    }
    if (Array.isArray(q)) {
        return res.status(500).json({ message: 'Query param `q` must be a string' })
    }
    // Filtrar los datos de la base de datos (o memoria) con el parámetro de consulta
    const search = q.toString().toLowerCase()

    const filteredData = userData.filter(row => {
        return Object.values(row).some(value => value.toLowerCase().includes(search))
    })
    // Devolver 200 con los datos filtrados
    return res.status(200).json({ data: filteredData })
})

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})


