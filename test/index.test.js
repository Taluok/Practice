import { ping, obtenerDatosPromise, procesarArchivoPromise, procesarArchivo, leerArchivos } from "../solutions/index.js";

import { describe, it, beforeEach, afterEach } from 'node:test'
import { equal, ifError } from 'node:assert/strict'
import { unlinkSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

describe('1. ping', () => { //creo un grupo de pruebas relacionada con ping
    it('1.1. ping taluok.dev', (_, done) => {//it define una prueba individual, la llamada del 1.1 ping verifica el comportaminto de la funcion ping cuanbdo se pasa el argumento taluok.dev
        ping('taluok.dev', (err, info) => { // La función ping espera un callback que manejará el resultado de la operación.
            ifError(err) //ifError verifica si hay un error.
            equal(info.ip, 'taluok.dev') //equal es una función de aserción que se utiliza para comparar dos valores.
            done() //la llamo al final de la prueba para indicar que la prueba ha finalizado.
        })
    })
})

describe('2. obtenerDatosPromise', () => {
    it('2.1. obtenerDatosPromise', async () => {
        const { data } = await obtenerDatosPromise({ time: 1 }) //Se llama a la función obtenerDatosPromise con un objeto { time: 1 } como argumento. La función await espera a que la Promesa devuelta por obtenerDatosPromise se resuelva y luego desestructura el resultado para obtener la propiedad data.
        equal(data, 'datos importantes') //equal es una función de aserción que se utiliza para comparar dos valores.
    })
})

describe('3. procesarArchivoPromise', () => {
    afterEach(() => {
        try {
            unlinkSync('output.txt')
        } catch { }
    })

    it('3.1. procesarArchivo', (t, done) => {
        writeFileSync('input.txt', 'gogogo')
        procesarArchivo((err) => {
            ifError(err)
            readFile('output.txt', 'utf8')
                .then((contenido) => {
                    equal(contenido, 'GOGOGO')
                    done()
                })
        })
    })
})