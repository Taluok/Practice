/*Un usuario muy importante (VIU) tiene un documento muy confidencial (VCD) almacenado en su cuenta de Dropbox.
No deja que nadie vea el VCD, especialmente sus compañeros de cuarto que a menudo tienen acceso a sus dispositivos.
Para abrir la aplicación móvil de Dropbox en la tableta de VIU se requiere un código de acceso de cuatro dígitos. 
Para garantizar la confidencialidad de la información almacenada, el dispositivo se bloquea en Dropbox después de
intentos fallidos 10 consecutivos de contraseña. Necesitamos implementar una función que, dada una serie de datos 
attemptsrealizados a lo largo del día y los correctos passcode, verifique si el dispositivo debe bloquearse, es decir, 
10si se realizaron más intentos fallidos consecutivos de contraseña.

cosas a tener en cuenta 

Cadena que consta exactamente de 4 dígitos que representan el código de acceso correcto.

Restricciones garantizadas: passcode.length = 4 .

[entrada] intentos de matriz.cadena

Matriz que representa los intentos de contraseña en el orden en que se realizaron. Cada elemento de attemptses una cadena que consta exactamente de 4dígitos.

Restricciones garantizadas:
0 ≤ attempts.length ≤ 20 ,
attempts[i].length = 4.

[salida] booleano

true si 10se realizaron o más intentos fallidos consecutivos de contraseña; 
falsede lo contrario.*/


function solution(passcode, attempts) {
    let failedAttempts = 0; //aca comienza el contador de datos atemporizado

    for (let attempt of attempts) { //si el passcode es incorrecto
        if ( attempt !== passcode ) {
            failedAttempts++;
            if (failedAttempts >=10) {
                return true; //aqui se tiene que bloquear
            }
        }else{//si el passcode es el correcto reiniciamos el contador
            failedAttempts = 0;
        }
    }
    return false; 
}