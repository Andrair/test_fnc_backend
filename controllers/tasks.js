const connectionDatabase = require("../config/configDatabase");
const { validationResult } = require("express-validator");

// GET
exports.getTasks = async (req, res) => {
  const db = await connectionDatabase;
  try {
    const [tasksList] = await db.query(
      `SELECT task.id_task,task.name,task.description,task.duration,task.init_date,task.end_date,status.name as status,priority.name as priority FROM task  left join status on task.id_status = status.id_status left join priority as priority on task.id_priority = priority.id_priority ORDER BY duration ASC, priority.id_priority ASC`
    );
    res.json(tasksList);
  } catch (error) {
    res.status(500).send(`Hubo un error ${error}`);
  }
};

// POST
exports.createTask = async (req, res) => {
  const db = await connectionDatabase;
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  // ---------------------------------------
  const { name, description, duration, status, priority } = req.body;
  if (status !== "Iniciada") {
    return res
      .status(400)
      .send(`El Estado de la tarea al crearla debe ser Iniciada primero`);
  }
  const init_date = new Date().getTime()
  const priority_type = setPriority(priority)

  try {
    await db.query(
      `INSERT INTO task (name, description, init_date, end_date, duration, id_status, id_priority)
		VALUES ('${name}', '${description}','${init_date}','${0}','${duration}','${1}','${priority_type}');`
    );

    res.json("Tarea agregada con Exito");
  } catch (error) {
    res.status(500).send(`Hubo un error ${error}`);
  }
};

// PUT
exports.updateTask = async (req, res) => {
  const db = await connectionDatabase;
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  // ---------------------------------------
  const { id } = req.params;
  const { name, description, init_date, duration, status, priority } = req.body;

  const status_type = setStatus(status)
  const priority_type = setPriority(priority)
  const end_date = status_type === 3 ? new Date().getTime() : 0

  try {
    await db.query(
      `UPDATE tasks.task SET name = '${name}', description = '${description}', init_date = '${init_date}',
 	   end_date = '${end_date}', duration = '${duration}', id_status = '${status_type}', id_priority = '${priority_type}' 
       WHERE (id_task = '${id}');`
    );

    res.json("Tarea actualizada con Exito");
  } catch (error) {
    res.status(500).send(`Hubo un error ${error}`);
  }

};

// DELETE
exports.deleteTask = async (req, res) => {
  const db = await connectionDatabase;
  const { id } = req.params;

  try {
    await db.query(
      `DELETE FROM tasks.task WHERE (id_task = '${id}');`
    );

    res.json("La Tarea se elimino correctamente")
  } catch (error) {
    res.status(500).send(`Hubo un error ${error}`);
  }
};

// GET
exports.getTaskById = async (req, res) => {
  const db = await connectionDatabase;
  const { id } = req.params;

  try {
    const [tasksList] = await db.query(
      `SELECT * FROM task WHERE id_task = '${id}'`
    );
    res.json(tasksList[0]);
  } catch (error) {
    res.status(500).send(`Hubo un error ${error}`);
  }
};


const setPriority = (priority) => {
	switch (priority) {
		case "Urgente":
			return 1
		case "Normal":
			return 2
		case "Baja":
			return 3
		default:
			return 3
	}
}

const setStatus = (status) => {
	switch (status) {
		case "En Proceso":
			return 2
		case "Terminada":
			return 3
		default:
			return 1
	}
}

