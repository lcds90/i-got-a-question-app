import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
 
  // NOTE O exact determina que a rota precisa ser exatamente o que está especificado, caso a home não possua essa propriedade, os outros componentes não conseguem ser acessados.
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path='/' exact component={Home} />
        <Route path='/rooms/new' component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
