import "./App.css";
import Inputs from "./components/inputs/Inputs";
import List from "./components/list/List";

function App() {
  return (
    <div className="app">
      <h1>Feel Free to add text or gif</h1>
      <Inputs />
      <List />
    </div>
  );
}

export default App;
