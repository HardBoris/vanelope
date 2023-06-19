import React from "react";
import "./styles/global.css";
import "./styles/layout.css";
import { AppRouter } from "./routes";
import { Navigator } from "./components/Navigator";

function App() {
  return (
    <div>
      <header>
        <Navigator />
      </header>
      <main>
        <AppRouter />
      </main>
      <footer>
        <div className="prueba">Powered by BG</div>
      </footer>
    </div>
  );
}

export default App;
