import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar estilos de Bootstrap
import './ListaTareas.css';

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaCierre: "",
    realizada: "No realizada", // Estado por defecto para la tarea
    nombreApellido: "", // Cambio realizado: "Nombre y apellido" en lugar de "creador"
  });

  const [editando, setEditando] = useState(false);
  const [tareaEditada, setTareaEditada] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editando) {
      setTareas(
        tareas.map((tarea) =>
          tarea.id === tareaEditada.id ? { ...nuevaTarea, id: tarea.id } : tarea
        )
      );

      setEditando(false);
      setTareaEditada(null);
      setNuevaTarea({
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaCierre: "",
        realizada: "No realizada", // Reiniciar el estado después de editar
        nombreApellido: "", // Reiniciar el nombre y apellido después de editar
      });
    } else if (nuevaTarea.nombre.trim()) {
      const nuevaTareaConId = { ...nuevaTarea, id: Date.now() };
      setTareas([...tareas, nuevaTareaConId]);
      setNuevaTarea({
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaCierre: "",
        realizada: "No realizada", // Reiniciar el estado después de agregar
        nombreApellido: "", // Reiniciar el nombre y apellido después de agregar
      });
    }
  };

  const toggleRealizada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, realizada: tarea.realizada === "Realizada" ? "No realizada" : "Realizada" } : tarea
      )
    );
  };

  const eliminarTarea = async (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const editarTarea = (tarea) => {
    setEditando(true);
    setTareaEditada(tarea);
    setNuevaTarea(tarea);
  };

  return (
    <div className="container-fluid bg-dark min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card text-white bg-dark">
        <div className="card-header">Lista de Tareas</div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombreTarea" className="form-label">Nombre de la tarea</label>
              <input
                type="text"
                className="form-control"
                id="nombreTarea"
                value={editando ? tareaEditada.nombre : nuevaTarea.nombre}
                onChange={(e) =>
                  editando
                    ? setTareaEditada({ ...tareaEditada, nombre: e.target.value })
                    : setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })
                }
                placeholder="Nombre de la tarea"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="descripcionTarea" className="form-label">Descripción de la tarea</label>
              <textarea
                className="form-control"
                id="descripcionTarea"
                value={nuevaTarea.descripcion}
                onChange={(e) =>
                  setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })
                }
                placeholder="Descripción de la tarea"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="fechaInicioTarea" className="form-label">Fecha de Inicio</label>
              <input
                type="date"
                className="form-control"
                id="fechaInicioTarea"
                value={nuevaTarea.fechaInicio}
                onChange={(e) =>
                  setNuevaTarea({ ...nuevaTarea, fechaInicio: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="fechaCierreTarea" className="form-label">Fecha de Cierre</label>
              <input
                type="date"
                className="form-control"
                id="fechaCierreTarea"
                value={nuevaTarea.fechaCierre}
                onChange={(e) =>
                  setNuevaTarea({ ...nuevaTarea, fechaCierre: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="realizadaTarea" className="form-label">Estado</label>
              <select
                className="form-control"
                id="realizadaTarea"
                value={nuevaTarea.realizada}
                onChange={(e) =>
                  setNuevaTarea({ ...nuevaTarea, realizada: e.target.value })
                }
              >
                <option value="No realizada">No realizada</option>
                <option value="Realizada">Realizada</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="nombreApellidoTarea" className="form-label">Nombre y Apellido</label>
              <input
                type="text"
                className="form-control"
                id="nombreApellidoTarea"
                value={nuevaTarea.nombreApellido}
                onChange={(e) =>
                  setNuevaTarea({ ...nuevaTarea, nombreApellido: e.target.value })
                }
                placeholder="Nombre y Apellido del Creador"
              />
            </div>
            <div className="col-12 mt-3">
              <button className="btn btn-primary" type="submit">
                {editando ? "Guardar cambios" : "Agregar"}
              </button>
            </div>
          </form>
          <ul className="list-group mt-3">
            {tareas.map((tarea) => (
              <li
                key={tarea.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  tarea.realizada === "Realizada" ? "list-group-item-success" : ""
                }`}
                style={{
                  backgroundColor: "#444",
                  borderColor: "#555",
                  color: "white",
                }}
              >
                <div>
                  <strong>Nombre: </strong>{tarea.nombre}<br />
                  <strong>Descripción: </strong>{tarea.descripcion}<br />
                  <strong>Fecha de Inicio: </strong>{tarea.fechaInicio}<br />
                  <strong>Fecha de Cierre: </strong>{tarea.fechaCierre}<br />
                  <strong>Estado: </strong>{tarea.realizada}<br />
                  <strong>Nombre y Apellido: </strong>{tarea.nombreApellido} {/* Cambio reflejado aquí */}
                </div>
                <div>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => editarTarea(tarea)}
                  >
                    Editar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListaTareas;