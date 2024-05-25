import React, { useState } from 'react';
import './App.css';
import { uploadFile } from './assets/services/upload';
import { Toaster, toast } from 'sonner'; // para mostrar los errores
import { Data } from './types';

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
  const [data, setData] = useState<Data | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      return;
    }

    setAppStatus(APP_STATUS.UPLOADING);

    try {
      const [err, newData] = await uploadFile(file);
      if (err) {
        setAppStatus(APP_STATUS.ERROR);
        toast.error(err.message);
        return;
      }

      setAppStatus(APP_STATUS.READY_USAGE);
      if (newData) setData(newData);
      toast.success('Archivo subido exitosamente');
    } catch (error) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error('Error al subir el archivo');
    }
  };

  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING;

  return (
    <>
      <Toaster />
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
          <button disabled={appStatus === APP_STATUS.UPLOADING}>{BUTTON_TEXT[appStatus]}</button>
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
