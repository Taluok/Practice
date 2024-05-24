import React, { useState } from 'react';
import './App.css';

const APP_STATUS = {
  IDLE: 'idle', // cuando entra
  ERROR: 'error', // cuando aparece un error
  READY_UPLOAD: 'ready_upload', // cuando se elige un archivo
  UPLOADING: 'uploading', // mientras el archivo se sube
  READY_USAGE: 'ready_usage', // después de subir el archivo
} as const;

const BUTTON_TEXT = {
  [APP_STATUS.READY_UPLOAD]: 'Subir Archivo',
  [APP_STATUS.UPLOADING]: 'Subiendo Archivo',
};

type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS];

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) { //si no se puede hacer nada 
      return
    }
    //si si se puede hacer
    setAppStatus(APP_STATUS.UPLOADING)

  };

  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING;

  return (
    <>
      <h4>Upload CSV + Search</h4>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            disabled={appStatus === APP_STATUS.UPLOADING}
            onChange={handleInputChange}
            name="file"
            type="file"
            accept=".csv"
          />
        </label>
        {showButton && (
          <button disabled={appStatus === APP_STATUS.UPLOADING}>{BUTTON_TEXT[appStatus as keyof typeof BUTTON_TEXT]}</button>
        )}
      </form>
      {file && (
        <div>
          <p>Archivo seleccionado: {file.name}</p>
        </div>
      )}
    </>
  );
}

export default App;

