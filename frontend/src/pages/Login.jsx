import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};
