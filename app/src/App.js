import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={async () => {
          try {
            const response = await fetch('/incrCounter', { method: "POST" })
            const json = await response.json()
            alert(json)
          } catch(err) {
            console.log(err)
          }
        }} >
          COUNT!
        </button>
      </header>
    </div>
  );
}

export default App;
