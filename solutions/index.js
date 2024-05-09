// PRUEBA 1 - Arregla esta función para que el código posterior funcione como se espera:
//Cuando una funcion dice que no hace lo que se espera siempre fijarme en los parametros
//Intento Ejecutarlo con node solutions/index.js


import net from 'node:net'
import fs from 'node:fs' //fs es filesystem

export const ping = (ip, callback) => { //Aqui agrego la funcion Callback
    const startTime = process.hrtime()

    const client = net.connect({ port: 80, host: ip }, () => {
        client.end()
        //return { time: process.hrtime(startTime), ip } <-- el return que estaba implementado aca no funciona, entonces paso a usar el callback
        callback(null, { time: process.hrtime(startTime), ip }) //el primer parametro el callback es el error y segundo parametro la info que queremos devolver
    })

    client.on('error', (err) => { //no olvidar que aqui tambien se aplica el callback
        callback(err)
        //throw err <-- Esto tampoco funciona
        client.end()
    })
}

ping('taluok.dev', (err, info) => { //en este caso no se esta ejecutando el callback
    if (err) console.error(err) //aqui si tiene un error muestra el error y si no muestra la info
    else console.log(info) //agrego un else
})


// PRUEBA 2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:

export function obtenerDatosPromise() {//Quito el Callback y empleo un return
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            try {
                resolve({ data: 'datos importantes' });//quito el callback y agrego el resolve
            } catch (e) {
                reject(e);
            }
        }, 2000);
    });
}

obtenerDatosPromise()
    .then(info => {
        console.log(info)
    })

// PRUEBA 3 - Explica qué hace la funcion.Identifica y corrige los errores en el siguiente código.Si ves algo innecesario, elimínalo.
//Luego mejoralo para que siga funcionando con callback y luego haz lo que consideres para mejorar su legibilidad.

/*export function procesarArchivo(callback) { //aqui paso el callback
    fs.readFile('input.txt', 'utf8', (error, contenido) => {//Lee un archivo llamado input.txt, lo lee con la codificacion utf8, ademas impoprtar el modulo fs
        if (error) {
            console.error('Error leyendo archivo:', error.message);
            callback(error); //return false; <-- se elimina el return false 
        }

        const textoProcesado = contenido.toUpperCase();

        fs.writeFile('output.txt', textoProcesado, error => {
            if (error) {
                console.error('Error guardando archivo:', error.message);
                callback (error);
            }

            console.log('Archivo procesado y guardado con éxito');
            callback (null);
        });    
    });
    //quito el setTimeout por que se estaria esperando solamente un segundo para hacer en mayuscula el texto
} 
//veo si funciona con callback 
procesarArchivo(() => {
    console.log('Funcionando')
})*/

//Ahora paso el ejercico de arriba de callback a promesas y ademas evito el callbackhell

export async function procesarArchivoPromise() {
    let contenido = ''

    try {
        contenido = await fs.promises.readFile('input.txt', 'utf8');
    } catch (error) {
        console.error('Error guardando archivo:', error.message);
        throw error //esto seria como el callback error
    }
    const textoProcesado = contenido.toUpperCase();
    try {
        await fs.promises.writeFile('output.txt', textoProcesado);
    } catch (error) {
        console.error('Error leyendo archivo:', error.message);
        throw error
    }
};

await procesarArchivoPromise()

/* 
para que funcione se debe importar el fs
import fs from 'node:fs'
y para poder quitar el promises que va despues del fs, lo impotarmos asi
import fs from 'node:fs/promises'
y ya podriamos escribir fs.readfile('input.txt etc ...)


oldway
fs.readFile('input.txt', 'utf8', () => {
    console.log('un texto al azar')
});

NewWay
fs.promises.readFile('input.txt', 'utf8')
    .then(() => { 
        console.log('un texto al azar')
    });

con el then se soluciona y con el await se espera que se solucione
await fs.promises.readFile('ínput.txt','utf8')

*/

//PRUEBA 4 - ¿Cómo mejorarías el siguiente código y por qué? Arregla los tests si es necesario:

export async function leerArchivos() {//la combierto en asincrona y secuencial con async en paralelo
    console.time('leerArchivos') //este console lo utizo para ver cuanto tiempo tarda en realizar la tarea 
    const [archivo3, archivo2, archivo1] = await Promise.allSetled([ //allSetled esto hace que si bien alguna de las promesas falle, las otras se puede utilizar
        fs.promises.readFile('archivo1.txt', 'utf8'),
        fs.promises.readFile('archivo2.txt', 'utf8'),
        fs.promises.readFile('archivo3.txt', 'utf8')
    ]).catch(err => {
        console.log(err);
        return []
    }) //aqui hago que se resuelvan todas las tareas al mismo tiempo

    //const archivo1 = fs.promises.readFile('archivo1.txt', 'utf8');//cambio readFileSync
    //const archivo2 = fs.promises.readFile('archivo2.txt', 'utf8');
    //const archivo3 = fs.promises.readFile('archivo3.txt', 'utf8');
    console.end('leerArchivos')
    return `${archivo1.value} ${archivo2.value} ${archivo3.value}`
}

leerArchivos();

// PRUEBA 5 - Escribe una funcion delay que retorne una promesa que se resuelva después de n milisegundos. Por ejemplo:

export async function delay(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}
