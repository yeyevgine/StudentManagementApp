const db = require("../db");

const Student = {
    async createStudent({ first_name, last_name, username, password, email }) {
        try {
            const query = `INSERT INTO students (first_name, last_name, username, password, email)
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING *`;

            const values = [first_name, last_name, username, password, email];
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            throw new Error("Failed to create a new student. Please check your input.");
        }
    },

    async getAllStudents() {
        try {
            const query = "SELECT * FROM students";
            const { rows } = await db.query(query);
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getStudentById(studentId) {
        try {
            const query = "SELECT * FROM students WHERE id = $1";
            const values = [studentId];
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getStudentByUsername(username) {
        try {
            const query = "SELECT * FROM students WHERE username = $1";
            const values = [username];
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async deleteStudentById(studentId) {
        try {
            const query = "DELETE FROM students WHERE id = $1";
            const values = [studentId];
            await db.query(query, values);
            return { message: "Student deleted successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateStudentById(studentId, { first_name, last_name, username, password, email }) {
        try {
            const query = `
                UPDATE students
                SET first_name = $2, last_name = $3, username = $4, password = $5, email = $6
                WHERE id = $1
                RETURNING *`;

            const values = [studentId, first_name, last_name, username, password, email];
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async searchStudentsByFullName(fullName) {
        try {
            const query = `
                SELECT * FROM students
                WHERE CONCAT(first_name, ' ', last_name) ILIKE $1`;

            const values = [fullName];
            const { rows } = await db.query(query, values);
            return rows;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = Student;