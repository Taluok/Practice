//PRUEBA 6 - Vamos a crear nuestra propia utilidad dotenv en el archivo dotenv.js.
//La utilidad debe devolver un método config que lee el archivo .env y añade las variables de entorno que 
//haya en el archivo al objeto process.env.
/*Cosas a tener en cuenta:

Sólo se permite usar el módulo fs para leer el archivo.
Si el archivo no existe, no debe dar error, simplemente no hace nada.
Si el archivo existe, pero no tiene ninguna variable de entorno, no debe hacer nada.
Sólo debe soportar el archivo .env o el que se le pasa como parametro, no hace falta que soporte .env.local, .env.development y similares de forma automática.
Las variables de entorno siempre son strings, por lo que si en el archivo .env hay un número, por ejemplo PORT=8080, al leerlo con fs y añadirlo a process.env debe ser un string, no un número.
process.env es un objeto y, por lo tanto, es mutable. Esto significa que podemos añadir propiedades nuevas sin problemas.*/

import { readFileSync } from 'node:fs'; //Esto va a ser sincrono por que se repite una sola vez en el codigo

function parseEnv(env) { //La función parseEnv recibe un string que representa el contenido del archivo de configuración.
    const lines = env.split('\n') //Divide el contenido del archivo en líneas utilizando split('\n').

    lines.forEach(line => {
        const [key, ...value] = line.split('=') //tera sobre cada línea y separa la clave (key) y el valor (value) utilizando split('=').
        const valueString = value.join('')
        const hasQuotes = valueString.startsWith('"') && valueString.endsWith('"')
        const valueToStore = hasQuotes ? valueString.slice(1, -1) : valueString //Verifica si el valor tiene comillas y, si es así, elimina las comillas utilizando slice(1, -1).
        process.env[key] = valueToStore
    })

}

export function config({ path = '.env' } = {}) { //La función config recibe un objeto destructurado con una propiedad path que por defecto es '.env'.
    try {
        const env = readFileSync(path, 'utf8') //Intenta leer el contenido del archivo especificado en path utilizando readFileSync.
        parseEnv(env) //Llama a la función parseEnv con el contenido del archivo como parámetro.
    } catch (e) {
        console.error(e)
    }
}

const dotenv = { //Se crea un objeto dotenv que contiene la función config.
    config
}

export default dotenv
