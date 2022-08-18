import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
function App() {
  return (
    <div className="App">
      <Header  />
      <section className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Micro-Frontends Architecture Course
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          By Juan Luis Rguez Hdez
        </a>
      </section>
      <Footer  />
    </div>
  );
}

export default App;
