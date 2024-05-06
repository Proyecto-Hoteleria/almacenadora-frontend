import React, { useState } from "react"; // Importa React y la función useState desde el módulo "react"
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import './ListaTareas.css'; // Importa estilos personalizados para el componente

/**
 * Componente Funcional ListaTareas
 * Representa una lista de tareas con funcionalidades para agregar, editar, marcar como realizada y eliminar tareas.
 */

/////////////////////////////////////////////////////Parte 1 ///////////////////////////////////////////////////
const ListaTareas = () => {
  // Estado para almacenar la lista de tareas y su manipulación
  const [tareas, setTareas] = useState([]); // Almacena la lista de tareas
  const [nuevaTarea, setNuevaTarea] = useState({ // Almacena la información de la nueva tarea
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaCierre: "",
    realizada: "No realizada", // Estado por defecto para la tarea
    nombreApellido: "", // Nombre y apellido del creador
  });

  // Estado para manejar la edición de una tarea existente
  const [editando, setEditando] = useState(false); // Indica si se está editando una tarea existente
  const [tareaEditada, setTareaEditada] = useState(null); // Almacena la tarea que se está editando

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Si se está editando una tarea
    if (editando) {
      // Actualiza la lista de tareas reemplazando la tarea editada
      setTareas(
        tareas.map((tarea) =>
          tarea.id === tareaEditada.id ? { ...nuevaTarea, id: tarea.id } : tarea
        )
      );

      // Reinicia los estados
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
      // Si no se está editando y el nombre de la nueva tarea no está vacío
      // Agrega una nueva tarea a la lista de tareas
      const nuevaTareaConId = { ...nuevaTarea, id: Date.now() }; // Asigna un ID único a la nueva tarea
      setTareas([...tareas, nuevaTareaConId]); // Agrega la nueva tarea a la lista de tareas

      // Reinicia el estado de nuevaTarea después de agregar
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

////////////////////////////////////////////Concluye parte No.1////////////////////////////////////////////////////

  
  /////////////////////////////////////////////////////Pate no.2///////////////////////////////////////////////////

// Función para cambiar el estado de una tarea entre "Realizada" y "No realizada"




  const toggleRealizada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, realizada: tarea.realizada === "Realizada" ? "No realizada" : "Realizada" } : tarea
      )
    );
  };

  // Función para eliminar una tarea de la lista
  const eliminarTarea = async (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  // Función para preparar una tarea existente para su edición
  const editarTarea = (tarea) => {
    setEditando(true); // Establece el estado de edición a true
    setTareaEditada(tarea); // Almacena la tarea que se está editando
    setNuevaTarea(tarea); // Establece la tarea en el estado de nuevaTarea para su edición
  };


  //////////////////////////////////////////////////////Parte concluida//////////////////////////////////////




  // Renderizado del componente
  return (
    <div className="container-fluid bg-dark min-vh-100 d-flex justify-content-center align-items-center"> {/* Contenedor principal */}
      <div className="card text-white bg-dark"> {/* Tarjeta principal */}
        <div className="card-header">Lista de Tareas</div> {/* Encabezado de la tarjeta */}
        <div className="card-body"> {/* Cuerpo de la tarjeta */}
          {/* Formulario para agregar o editar una tarea */}
          <form onSubmit={handleSubmit} className="row g-3">
            {/* Campos del formulario */}
            {/* Nombre de la tarea */}
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
            {/* Descripción de la tarea */}
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

            {/*Conclucion para parte no.2*/}


            
            {/*inicio parte no.3*/}    
            
            {/* Fecha de inicio */}
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
            {/* Fecha de cierre */}
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
            {/* Estado de la tarea */}
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
            {/* Nombre y apellido del creador */}
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
            {/* Botón para agregar o editar una tarea */}
            <div className="col-12 mt-3">
              <button className="btn btn-primary" type="submit">
                {editando ? "Guardar cambios" : "Agregar"}
              </button>
            </div>
          </form>

          {/* Lista de tareas */}
          <ul className="list-group mt-3">
            {/* Mapeo de la lista de tareas */}
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
                {/* Información de la tarea */}
                <div>
                  <strong>Nombre: </strong>{tarea.nombre}<br />
                  <strong>Descripción: </strong>{tarea.descripcion}<br />
                  <strong>Fecha de Inicio: </strong>{tarea.fechaInicio}<br />
                  <strong>Fecha de Cierre: </strong>{tarea.fechaCierre}<br />
                  <strong>Estado: </strong>{tarea.realizada}<br />
                  <strong>Nombre y Apellido: </strong>{tarea.nombreApellido} {/* Cambio reflejado aquí */}
                </div>

                {/*Finaliza parte 3*/}


                {/*pARTE NUMERO no.2 */}
                {/* Botones de acción */}
                <div>
                  {/* Botón para eliminar una tarea */}
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    Eliminar
                  </button>
                  {/* Botón para editar una tarea */}
                  <button
                    className="btn btn-info"
                    onClick={() => editarTarea(tarea)}
                  >
                    Editar
                  </button>
                </div>

                {/**Fin de parte nomero no.2 */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListaTareas; // Exporta el componente ListaTareas
