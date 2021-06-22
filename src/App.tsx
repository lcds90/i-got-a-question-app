import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {
  // NOTE O exact determina que a rota precisa ser exatamente o que está especificado, caso a home não possua essa propriedade, os outros componentes não conseguem ser acessados.
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
    </BrowserRouter>
  );
}

export default App;
