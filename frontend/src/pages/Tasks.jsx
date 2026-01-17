import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/api';
import { PlusIcon, TrashIcon, LogOutIcon, CheckCircleIcon, XCircleIcon } from '../components/Icons';
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
        <div className="header-content">
          <h1>Mis Tareas</h1>
          <p className="welcome-text">Hola, {user?.nombre}</p>
        </div>
        <button onClick={logout} className="logout-btn" title="Cerrar Sesión">
          <LogOutIcon size={20} />
          <span>Salir</span>
        </button>
      </div>

      <div className="tasks-content">
        <div className="task-form-card">
          <h3>Nueva Tarea</h3>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleCreateTask}>
            <div className="form-group">
              <input
                type="text"
                placeholder="¿Qué tienes pendiente?"
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
            <div className="form-row">
              <div className="form-group select-group">
                <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                  <option value="baja">Prioridad Baja</option>
                  <option value="media">Prioridad Media</option>
                  <option value="alta">Prioridad Alta</option>
                </select>
              </div>
              <button type="submit" disabled={loading} className="create-btn">
                {loading ? <span className="loader"></span> : <PlusIcon size={20} />}
                {loading ? 'Creando...' : 'Crear'}
              </button>
            </div>
          </form>
        </div>

        <div className="tasks-list-section">
          <h3>Tu Lista ({tasks.length})</h3>
          <div className="tasks-list">
            {tasks.length === 0 ? (
              <div className="no-tasks">
                <div className="empty-state-icon">📝</div>
                <p>No tienes tareas pendientes.</p>
                <span>¡Agrega una nueva arriba!</span>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className={`task-item ${task.completada ? 'completed' : ''}`}>
                  <button
                    className={`status-btn ${task.completada ? 'checked' : ''}`}
                    onClick={() => handleToggleComplete(task)}
                    title={task.completada ? "Marcar como pendiente" : "Marcar como completada"}
                  >
                    {task.completada ? <CheckCircleIcon size={24} /> : <div className="unchecked-circle"></div>}
                  </button>

                  <div className="task-details">
                    <h4>{task.titulo}</h4>
                    {task.descripcion && <p>{task.descripcion}</p>}
                    <span className={`priority-badge ${task.prioridad}`}>{task.prioridad}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="delete-icon-btn"
                    title="Eliminar tarea"
                  >
                    <TrashIcon size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
