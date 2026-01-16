import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/api';
import '../styles/Tasks.css';

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Error al cargar las tareas');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) {
      setError('El título es requerido');
      return;
    }

    setLoading(true);
    try {
      setError('');
      await taskService.createTask(titulo, descripcion, prioridad);
      setTitulo('');
      setDescripcion('');
      setPrioridad('media');
      await fetchTasks();
    } catch (err) {
      setError('Error al crear la tarea');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (err) {
      setError('Error al eliminar la tarea');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await taskService.updateTask(task._id, { completada: !task.completada });
      await fetchTasks();
    } catch (err) {
      setError('Error al actualizar la tarea');
    }
  };

  return (
    <div className="tasks-container">
      <div className="header">
        <h1>Mis Tareas</h1>
        <div className="user-info">
          <span>Hola, {user?.nombre}</span>
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleCreateTask} className="task-form">
        <h3>Nueva Tarea</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Título de la tarea"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Tarea'}
        </button>
      </form>

      <div className="tasks-list">
        <h3>Tareas ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <p className="no-tasks">No tienes tareas. ¡Crea una nueva!</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className={`task-item ${task.completada ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completada}
                  onChange={() => handleToggleComplete(task)}
                />
                <div className="task-details">
                  <h4>{task.titulo}</h4>
                  {task.descripcion && <p>{task.descripcion}</p>}
                  <span className={`priority ${task.prioridad}`}>{task.prioridad}</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="delete-btn"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
