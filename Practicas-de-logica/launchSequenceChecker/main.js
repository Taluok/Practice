/*La secuencia de lanzamiento maestra consta de varias secuencias independientes para diferentes sistemas. 
Su objetivo es verificar que todas las secuencias individuales del sistema estén en orden estrictamente creciente. 
En otras palabras, para dos elementos cualesquiera iy j( i < j) de la secuencia de lanzamiento maestra que pertenecen 
al mismo sistema (que tienen systemNames[i] = systemNames[j]), sus valores deben estar en orden estrictamente creciente
(es decir, stepNumbers[i] < stepNumbers[j]).*/

//vamos a revisar que todos los elementos de un array pasen a una condicion con every
// y vamos a ir guardando cual es el contado anterior 

function solution(systemNames, stepNumbers) {
    const stored = {};
    //la condicion del contador debe ser creciente
    return systemNames.every((systemName, index) => {
        if (stored[systemName] >= stepNumbers[index]) return false
        stored[systemName] = stepNumbers[index]
        return true
    })
}


