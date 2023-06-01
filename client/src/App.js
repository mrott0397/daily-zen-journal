import './App.css';
import Header from './components/Header';
import Journal from './components/Journal';
import Footer from './components/Footer';
import Homepage from './components/Homepage';


function App() {
  return (
    <div className="App">
   <div>
  <Header /> 
  <div className="cover-image">
  </div>
  <main>
    <section id="homepage" className="page-section">
    <Homepage />
    </section>
    <Journal />
    <Footer />
  </main>
</div>

    </div>
  );
}

export default App;
