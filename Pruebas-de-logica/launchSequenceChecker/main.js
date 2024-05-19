/*La secuencia de lanzamiento maestra consta de varias secuencias independientes para diferentes sistemas. 
Su objetivo es verificar que todas las secuencias individuales del sistema estén en orden estrictamente creciente. 
En otras palabras, para dos elementos cualesquiera iy j( i < j) de la secuencia de lanzamiento maestra que pertenecen 
al mismo sistema (que tienen systemNames[i] = systemNames[j]), sus valores deben estar en orden estrictamente creciente
(es decir, stepNumbers[i] < stepNumbers[j]).

a tener en cuenta: 

[límite de tiempo de ejecución] 4 segundos (js)

[límite de memoria] 1 GB

[entrada] array.string nombres del sistema

Una matriz de cadenas no vacías. systemNames[i]contiene el nombre del sistema al que pertenece el elemento de la secuencia de lanzamiento
maestra .ith

Restricciones garantizadas: , .
1 ≤ systemNames.length ≤ 5 · 104
1 ≤ systemNames[i].length ≤ 10

[entrada] matriz.números de pasos enteros

Una matriz de números enteros positivos. stepNumbers[i]contiene el valor del elemento de la secuencia de lanzamiento maestra .ith

Restricciones garantizadas:
stepNumbers.length = systemNames.length , .
1 ≤ stepNumbers[i] ≤ 109

[salida] booleano

Devuelve truesi todas las secuencias individuales del sistema están en orden estrictamente creciente; de ​​lo contrario, devuelve false.*/

//vamos a revisar que todos los elementos de un array pasen a una condicion con every
// y vamos a ir guardando cual es el contado anterior 

function solution(systemNames, stepNumbers) {
    const stored = {};

    return systemNames.every((systemName, index) => {
        const previousCounter = stored[systemName] || 0; // Verifica si el contador ya estaba previamente
        const currentCounter = stepNumbers[index]; // Contador actual

        // Verifica si el contador es decreciente y no creciente
        if (previousCounter >= currentCounter) {
            return false;
        }

        stored[systemName] = currentCounter;
        return true;
    });
}


