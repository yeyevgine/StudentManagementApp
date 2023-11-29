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
  +Ensure PostgreSQL is installed on your machine.
  +Create a PostgreSQL database named student_profiles.
  +Update the database configuration in db.js with your PostgreSQL credentials.
  +Database Schema (PostgreSQL)
    To set up the necessary database schema for the application, execute the following SQL script in your PostgreSQL           environment. This script will create a students table with specific columns:
    CREATE TABLE students (
         id SERIAL PRIMARY KEY,
         first_name VARCHAR(50) NOT NULL,
         last_name VARCHAR(50) NOT NULL,
         username VARCHAR(50) UNIQUE NOT NULL,
         password VARCHAR(100) NOT NULL,
         email VARCHAR(100) UNIQUE NOT NULL
    );
