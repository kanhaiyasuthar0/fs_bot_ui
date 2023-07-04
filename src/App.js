import { useEffect } from "react";
import "./App.css";
import Form from "./components/form/Form.tsx";

function App() {
  const tele = window.Telegram.WebApp;

  useEffect(() => {
    tele.ready();
  });
  return (
    <div className="App">
      <Form tele={tele} />
    </div>
  );
}

export default App;
