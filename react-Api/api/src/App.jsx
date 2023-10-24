import { useState } from "react";
import "./App.css";
import CrudComponent from "./component/Crud";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CrudComponent />
    </>
  );
}

export default App;
