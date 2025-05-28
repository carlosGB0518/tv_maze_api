import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import InicioSesion from './componentes/InicioSesion';
import RegistroUsuario from './componentes/RegistroUsuario';
import DetalleSerie from './componentes/DetalleSerie'; 
import Favoritos from './paginas/Favoritos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/serie/:id" element={<DetalleSerie />} />
        <Route path="/favoritos" element={<Favoritos />} />
        {/* Si más adelante agregas una página 404, puedes incluir esta línea: */}
        {/* <Route path="*" element={<NoEncontrado />} /> */}
      </Routes>
       <ToastContainer position="bottom-center" autoClose={2000} />
       </>
    </BrowserRouter>
  );
  
}

export default App;
