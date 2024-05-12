import { describe, expect, it } from "vitest"

/*Consigna: Escribir una funcion que al pasar un numero: 
- Muestre "fizz" si es multiplo de 3.
- Muestre "buzz" si es multiplo de 5.
- Muestre "fizzbuzz" si es multiplo de 3 y 5.
-muestre el numero si no es multiplo de ninguno de los anteriores*/ 

const fizzbuzz = (num) => { //La función fizzbuzz recibe un parámetro num que se espera sea un número.
    if(typeof num !== 'number'){ //si el typeof num no es un num va a mostrar error
        throw new Error('parameter provided must be a number')
    }
    if (num % 3 === 0 && num % 5 === 0) {
        return 'fizzbuzz';
    } else if (num % 3 === 0) {
        return 'fizz';
    } else if (num % 5 === 0) {
        return 'buzz';
    } else {
        return num;
    }
}
describe('fizzbuzz', () => { //utilizo la función describe para agrupar las pruebas relacionadas con la función fizzbuzz.
    it('should be a function', () => { // it para definir cada prueba individual.
        expect(typeof fizzbuzz).toBe('function') //En la primera prueba, se verifica que fizzbuzz sea una función.
    })

    it('should throw if not number is provided as parameter', () => { //En la segunda prueba, se verifica que la función arroje un error si no se proporciona un número como parámetro.
        expect(() => fizzbuzz()).toThrow()
    })

    it('should throw a specific error message if not a number is provided as parameter', () => { //En la tercera prueba, se verifica que el error arrojado contenga la palabra 'number' en su mensaje.
        expect(() => fizzbuzz()).toThrow(/number/)
    })

    it('should return "fizz" if number is multiple of 3', () => {
        expect(fizzbuzz(3)).toBe('fizz');
        expect(fizzbuzz(6)).toBe('fizz');
    });

    it('should return "buzz" if number is multiple of 5', () => {
        expect(fizzbuzz(5)).toBe('buzz');
        expect(fizzbuzz(10)).toBe('buzz');
    });

    it('should return "fizzbuzz" if number is multiple of 3 and 5', () => {
        expect(fizzbuzz(15)).toBe('fizzbuzz');
        expect(fizzbuzz(30)).toBe('fizzbuzz');
    });

    it('should return the number if not multiple of 3 or 5', () => {
        expect(fizzbuzz(7)).toBe(7);
        expect(fizzbuzz(11)).toBe(11);
    });

})

/* Asi seria el refactor 
export const fizzbuzz = (number) : string | number => {
    if (typeof number =! 'number') throw new Error('parameter provided must be a number')
    if(Number.isNaN(number)) throw new Error('parameter provided must be a number')
        
    const multiplies = {3: 'fizz', 5: 'buzz' }
    
    let output = ''
    
    object
        .entries(multiplies)
        .forEach(([multiplier, word]) => {
            if (number % multiplier === 0) output += word
        })
        
    return output === '' ? number : output
    }*/ 