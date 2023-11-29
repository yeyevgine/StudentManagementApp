# StudentManagementApp

This project is a student management web application that offers functionalities for creating, retrieving, updating, and deleting student profiles.

**Backend Technologies Used** <br>
+ Node.js <br>
+ Express.js <br>
+ PostgreSQL (pg) <br>


**Setting Up the Project** 

git clone https://github.com/yeyevgine/StudentManagementApp.git

**Setting Up the Backend**

+ Navigate to the backend directory:
cd backend
+Install dependencies:
npm install

**Setting up the PostgreSQL database**
  +Ensure PostgreSQL is installed on your machine.<br>
  +Create a PostgreSQL database named student_profiles.<br>
  +Update the database configuration in db.js with your PostgreSQL credentials.<br>
  +Database Schema (PostgreSQL)<br>
    To set up the necessary database schema for the application, execute the following SQL script in your PostgreSQL           environment. This script will create a students table with specific columns:<br>
    CREATE TABLE students (<br>
         id SERIAL PRIMARY KEY,<br>
         first_name VARCHAR(50) NOT NULL,<br>
         last_name VARCHAR(50) NOT NULL,<br>
         username VARCHAR(50) UNIQUE NOT NULL,<br>
         password VARCHAR(100) NOT NULL,<br>
         email VARCHAR(100) UNIQUE NOT NULL<br>
    );<br>
