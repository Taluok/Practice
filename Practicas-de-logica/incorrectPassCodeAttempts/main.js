/*Un usuario muy importante (VIU) tiene un documento muy confidencial (VCD) almacenado en su cuenta de Dropbox.
No deja que nadie vea el VCD, especialmente sus compañeros de cuarto que a menudo tienen acceso a sus dispositivos.
Para abrir la aplicación móvil de Dropbox en la tableta de VIU se requiere un código de acceso de cuatro dígitos. 
Para garantizar la confidencialidad de la información almacenada, el dispositivo se bloquea en Dropbox después de
intentos fallidos 10 consecutivos de contraseña. Necesitamos implementar una función que, dada una serie de datos 
attemptsrealizados a lo largo del día y los correctos passcode, verifique si el dispositivo debe bloquearse, es decir, 
10si se realizaron más intentos fallidos consecutivos de contraseña.*/


function solution(passcode, attempts) {
    let failedAttempts = 0; //aca comienza el contador de datos atemporizado

    for (let attempt of attempts) { //si el passcode es incorrecto
        if ( attempt === passcode ) {
            failedAttempts = 0;
        }else if (++failedAttempts >=10) {
                return true; //aqui se tiene que bloquear    
        }
    }
    return false; 
}