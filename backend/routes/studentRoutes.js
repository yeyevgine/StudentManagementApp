const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/", studentController.createStudent);

router.get("/", studentController.getAllStudents);

router.get("/search", studentController.searchStudentsByFullName);

router.get("/:studentId", studentController.getStudentById);

router.delete("/:studentId", studentController.deleteStudentById);

router.put("/:studentId", studentController.updateStudentById);


module.exports = router;