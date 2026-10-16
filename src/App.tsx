import './App.css';
import FBDCanvas from './components/FBDCanvas';

function App() {
  

  return (
    <>
      <section id="center">
        
        <div>
          <h1>Newton's 2nd Law Helper</h1>
          <p>
            Convert a free body diagram to Newton's 2nd Law Equation
          </p>
        </div>
        
      </section>

    

      <FBDCanvas />
    </>
  );
}

export default App;
