import './App.css'

function App() {

  const handleInputChange = (event: React.
    ChangeEvent<HTMLInputElement>) => {
      const [file] = event.target.files ?? []
      console.log(file)
    }

  return (
    ) 
    <>
      <h4>Upload CSV + Search</h4>
      <form>
        <label>
        <input onChange={handleInputChange} name="file" type="file" accept=".csv" />
        </label>
        <button>Subir Archivo</button>
      </form>
    </>
  )
}

export default App
