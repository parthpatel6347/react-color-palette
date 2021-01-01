import Pallete from "./Pallete";
import seedColors from "./seedPallete";

function App() {
  return (
    <div className="App">
      <Pallete {...seedColors[0]} />
    </div>
  );
}

export default App;
