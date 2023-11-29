const Student = require("../models/studentModel");

const studentController = {
    createStudent: async (req, res) => {
        try {
            const newStudent = await Student.createStudent(req.body);
            res.status(201).json(newStudent);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAllStudents: async (req, res) => {
        try {
            const allStudents = await Student.getAllStudents();
            res.status(201).json(allStudents);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getStudentById: async (req, res) => {
        try {
            const { studentId } = req.params;
            const student = await Student.getStudentById(studentId);
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.status(200).json(student);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteStudentById: async (req, res) => {
        try {
            const { studentId } = req.params;
            await Student.deleteStudentById(studentId);
            res.json({ message: "Student deleted succesfully!" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateStudentById: async (req, res) => {
        try {
            const { studentId } = req.params;
            const updateStudent = await Student.updateStudentById(studentId, req.body);
            res.json(updateStudent);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    searchStudentsByFullName: async (req, res) => {
        try {
            const { fullName } = req.query;
            if (!fullName) {
                return res.status(400).json({ message: "Please provide a full name for the search!" });
            }
            const students = await Student.searchStudentsByFullName(fullName);
            res.json(students);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = studentController;