import React, { useState } from 'react';
import './App.css'

const APP_STATUS = {
  IDLE: 'idle', //cuando entra 
  ERROR: 'error', // cuando aparece un error 
  READY_UPLOAD: 'ready_upload', // cuando se elige un archivo
  UPLOADING: 'uploading', // mientras el archivo se sube
  READY_USAGE: 'ready_usage', //despues de subir el archivo
} as const


function App() {

  const [appStatus, setAppStatus] = useState(APP_STATUS.IDLE)
  ]

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
  };

  return (
    <>
      <h4>Upload CSV + Search</h4>
      <form onSubmit={handleSubmit}>
        <label>
          <input onChange={handleInputChange} name="file" type="file" accept=".csv" />
        </label>
        <button type="submit">Subir Archivo</button>
      </form>
      {file && (
        <div>
          <p>Archivo seleccionado: {file.name}</p>
          {/* Aquí puedes agregar más lógica para procesar el archivo */}
        </div>
      )}
    </>
  );
}

export default App;

