import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function RegistroUsuario() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const { data, error: errorRegistro } = await supabase.auth.signUp({
      email: correo,
      password: clave,
    });

    if (errorRegistro) {
      setError(errorRegistro.message);
      setMensaje('');
    } else {
      // Guardar el correo en la tabla `usuarios`
      await supabase.from('usuarios').insert([{ correo }]);

      setError('');
      setMensaje('Registro exitoso. Revisa tu correo para confirmar.');
      setTimeout(() => {
        navigate('/inicio-sesion');
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default RegistroUsuario;
