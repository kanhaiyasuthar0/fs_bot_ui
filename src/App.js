import { useEffect } from "react";
import "./App.css";
import FormComponent from "./components/form/Form.tsx";

function App() {
  const tele = window.Telegram.WebApp;
  useEffect(() => {
    console.log("TELEGRAM", window.Telegram);
    tele.ready();
    // setMobileNumber(queryMobileNumber);
  });
  return (
    <div className="App">
      <FormComponent tele={tele} />
    </div>
  );
}

export default App;
