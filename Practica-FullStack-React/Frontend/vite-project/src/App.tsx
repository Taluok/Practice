import React, { useState } from 'react';
import './App.css'

function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <>
      <h4>Upload CSV + Search</h4>
      <form>
        <label>
          <input onChange={handleInputChange} name="file" type="file" accept=".csv" />
        </label>
        <button type="submit">Subir Archivo</button>
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

