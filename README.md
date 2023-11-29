# StudentManagementApp

This project is a student management web application that offers functionalities for creating, retrieving, updating, and deleting student profiles.

**Backend Technologies Used** <br>
+ Node.js <br>
+ Express.js <br>
+ PostgreSQL (pg) <br>


**Setting Up the Project** 

git clone https://github.com/yeyevgine/StudentManagementApp.git

**Setting Up the Backend**

+ Navigate to the backend directory: <br>
cd backend <br>
+ Install dependencies: <br>
npm install <br>

**Setting up the PostgreSQL database** <br>
  + Ensure PostgreSQL is installed on your machine. <br>
  + Create a PostgreSQL database named student_profiles. <br>
  + Update the database configuration in db.js with your PostgreSQL credentials. <br>
  + Database Schema (PostgreSQL) <br>
    To set up the necessary database schema for the application, execute the following SQL script in your PostgreSQL           environment. This script will create a students table with specific columns: <br>

     CREATE TABLE students ( <br>
         id SERIAL PRIMARY KEY, <br>
         first_name VARCHAR(50) NOT NULL, <br>
         last_name VARCHAR(50) NOT NULL, <br>
         username VARCHAR(50) UNIQUE NOT NULL, <br>
         password VARCHAR(100) NOT NULL, <br>
         email VARCHAR(100) UNIQUE NOT NULL <br>
    ); <br>

   + Ensure the PostgreSQL server is running. <br>

+ Run the server: <br>
**npm run dev**  OR    node app.js <br>

**The server will run on http://localhost:4000.** <br>


**Backend API Endpoints** <br>
+ **GET /students** - Retrieve all students. <br>
+ **GET /students/:studentId** - Retrieve a student by ID. <br>
+ **POST /students** - Create a new student. <br>
+ **PUT /students/:studentId** - Update a student by ID. <br>
+ **DELETE /students/:studentId** - Delete a student by ID. <br>
+ **GET /students/search?fullName=<full_name>** - Search for students by their full name. <br>


**Frontend Pages** <br>

+ Create Student Profile <br>
File: **create_student.html** <br>
Features a form to create a new student profile. <br>
    + Validations:
      + First Name: Accepts alphabetic characters only. Ensures only letters are entered.
      + Last Name: Accepts alphabetic characters only. Ensures only letters are entered.
      + Username: Accepts alphanumeric characters, hyphens, periods, and underscores. Ensures usernames contain only specific characters.

+ Student List <br>
File: **student_list.html** <br>
Displays a list of students with options to search, edit, and delete student profiles. <br>

+ Edit Student Details <br>
File: **edit_student.html** <br>
Allows editing and updating existing student details. <br>

**Usage** <br>
+ Access the frontend by opening the respective HTML files in your web browser (create_student.html, student_list.html, edit_student.html). <br>
+ Interact with the frontend forms and functionalities to create, view, edit, or delete student profiles.<br>
+ Ensure the backend server is running (http://localhost:4000) to enable communication between the frontend and backend.<br>






    
