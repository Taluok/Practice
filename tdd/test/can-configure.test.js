/*Estamos en la fabrica de Santa, creando como su no hubiera un mañana. Pensabamos que no ibamos a llegar pero Jeff Bezos 
ha tenido una idea genial para aprovechar las maquinas y optimizar al maximo la creacion de regalos. La gonfiguracion de las 
maquinas es un string. Podemos reconfigurarla para que se haga otro regalo y , para ello, podemos cambiar cada caracter por otro.
Pero esto tiene limitaciones al reemplazar el caracter se debe mantener el orden, no se puede asignar al mismo caracter a dos 
letras distintas(pero si a si mismo) y, claro la longitud del string debe ser el mismo.
Necesitamos una funcion que nos diga si podemos reconfigurar una maquina para que de un regalo pueda pasar a fabricar otro
segun las reglas mencionadas.*/ //reto de adventjs

import { describe } from "vitest";
const canReconfigure = (from,to) =>{ //no me debo olvidar de declarar la funcion
    if(from === undefined) throw new Error('From is requiered')
    if(typeof from !== 'string') throw new Error('From is not a string')
    if(typeof to !== 'string') throw new Error('To is not a string')

    const isSameLength = from.length == to.length
    if(!isSameLength) return false

    const hasSameUniqueLetters = new Set(from).size === new Set(to).size //utilizo el set para quitar los valores repetidos de un string
    if (!hasSameUniqueLetters) return false

    const trasnformation = {} //Se crea un objeto vacío transformations para almacenar las transformaciones de letras de una cadena from a otra cadena to.
    for (let i = 0; i < from.length; i++){ //Se itera sobre los caracteres de las cadenas from y to utilizando un bucle for.
        const fromletter = from[i] //En cada iteración, se obtiene el carácter en la posición i de las cadenas from y to.
        const toLetter = to[i]

        const storedLetter = trasnformations[fromletter] //Se verifica si ya existe una transformación registrada para el carácter fromletter en el objeto transformations.
        if (storedLetter && storedLetter !== toLetter) return false //Si existe una transformación y el carácter transformado no coincide con el carácter toLetter, se retorna false, indicando que la transformación no es válida.

        transformations[fromletter] = toLetter //Si no hay una transformación registrada para el carácter fromletter, se agrega la transformación al objeto transformations.
    }
    /* este fragmento de código recorre dos cadenas from y to, comparando los caracteres en cada posición y 
    verificando si las transformaciones son válidas. Si se encuentra una transformación previamente registrada 
    que no coincide con la transformación actual, se devuelve false, indicando que la transformación no es válida. 
    De lo contrario, se registra la transformación en el objeto transformations.*/
    return true
}

describe('canReconfigure', () => {
    it ('should be a function', ( ) => {
        expect(canReconfigure.toBeTypeOf('function'))//decimos que canReconfigure sea una funcion
    })

    //primeramente voy a mirar los parametros
    it('should throw if first parameter is missing', () => {
        expect(() => canReconfigure()).toThrow() //.toThrow() para asegurarte de que el error se arroja correctamente
    })

    it('should throw if first parameter not a string', () => {
        expect(() => canReconfigure(2)).toThrow()//.toThrow() para asegurarte de que el error se arroja correctamente
    })

    it('should throw if second parameter is missing', () => {
        expect(() => canReconfigure('a')).toThrow();
    })

    it('should return false if strings provided have different lenght', () => { //para que devuelva un booleano
        expect(() => canReconfigure('abc', 'de')).toBe(false);
    })

    it('should return false if strings provided have different number of unique letters', () => {
        expect(() => canReconfigure('abc', 'ddd')).toBe(false);
    })

    it('should return false if string has different order of transformation', () => {
        expect(canReconfigure('XBOX', 'XXBO')).tobe(false)
    })
});

