import React from "react";
import "./styles/global.css";
import "./styles/layout.css";
import { AppRouter } from "./routes";
import { Navigator } from "./components/Navigator";

function App() {
  return (
    <>
      <header>
        <Navigator />
      </header>
      <main>
        <AppRouter />
      </main>
    </>
  );
}

export default App;
