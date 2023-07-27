const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");
const { check } = require("express-validator");

router.get("/", tasksController.getTasks);

router.post(
	"/",
	[check("name", "El nombre de la tarea es obligatorio").not().isEmpty()],
	tasksController.createTask,
);

router.put(
	"/:id",
	[check("name", "El nombre de la tarea es obligatorio").not().isEmpty()],
	tasksController.updateTask,
);

router.delete("/:id", tasksController.deleteTask);

router.get("/:id", tasksController.getTaskById);

module.exports = router;
