document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const studentDataContainer = document.getElementById("studentTableBody");
  const createStudentButton = document.getElementById("createStudentButton");
  const messageContainer = document.getElementById("messageContainer");
  const showOriginalListButton = document.getElementById("showOriginalListButton");

  const fetchStudentData = async () => {
    try {
      const response = await fetch("http://localhost:4000/students");

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching student data:", error);
      return [];
    }
  };

  const populateStudentTable = async () => {
    const students = await fetchStudentData();

    studentDataContainer.innerHTML = "";

    students.forEach(student => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${student.first_name}</td>
          <td>${student.last_name}</td>
          <td>${student.username}</td>
          <td>${student.password}</td>
          <td>${student.email}</td>
          <td>
            <button class="editButton" data-id="${student.id}" id="editButton">Edit</button>
          </td>
          <td>
            <button class="deleteButton" data-id="${student.id}" id="deleteButton">Delete</button>
          </td>
        `;
      studentDataContainer.appendChild(row);
    });
  };

  const filterStudents = async (fullName) => {
    try {
      const response = await fetch(`http://localhost:4000/students/search?fullName=${fullName}`);
      console.log(response.ok)
      if (!response.ok) {
        throw new Error("Failed to fetch filtered student data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error filtering student data:", error);
      return [];
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:4000/students/${studentId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      return false;
    }
  };

  const fetchStudentDetailsById = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:4000/students/${studentId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }
      const studentDetails = await response.json();
      return studentDetails;
    } catch (error) {
      console.error("Error fetching student details:", error);
      return null;
    }
  };

  const showOriginalList = async () => {
    searchInput.value = "";
    populateStudentTable();
  };

  searchButton.addEventListener("click", async () => {
    const fullName = searchInput.value.trim();
    messageContainer.textContent = "";

    if (fullName) {
      try {
        const studentData = await filterStudents(fullName);
        if (studentData.length > 0) {
          const studentTableBody = document.getElementById("studentTableBody");
          studentTableBody.innerHTML = "";

          studentData.forEach(student => {
            const row = document.createElement("tr");

            const firstNameCell = document.createElement("td");
            firstNameCell.textContent = student.first_name;
            row.appendChild(firstNameCell);

            const lastNameCell = document.createElement("td");
            lastNameCell.textContent = student.last_name;
            row.appendChild(lastNameCell);

            const usernameCell = document.createElement("td");
            usernameCell.textContent = student.username;
            row.appendChild(usernameCell);

            const passwordCell = document.createElement("td");
            passwordCell.textContent = student.password;
            row.appendChild(passwordCell);

            const emailCell = document.createElement("td");
            emailCell.textContent = student.email;
            row.appendChild(emailCell);


            studentTableBody.appendChild(row);
          });
        } else {
          messageContainer.textContent = "No students found with the provided name.";
          messageContainer.style.color = "red";
          console.log("No students found with the provided name.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    } else {
      messageContainer.textContent = "Please enter a full name to search.";
      messageContainer.style.color = "red";
      console.log("Please enter a full name to search.");
    }
  });

  populateStudentTable();

  showOriginalListButton.addEventListener("click", async () => {
    messageContainer.textContent = "";
    showOriginalList();
  });

  studentDataContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("editButton")) {
      const studentId = event.target.dataset.id;
      try {
        const studentDetails = await fetchStudentDetailsById(studentId);

        if (studentDetails) {
          const { id, first_name, last_name, username, password, email } = studentDetails;
          window.location.href = `edit_student.html?id=${id}&firstName=${first_name}&lastName=${last_name}&username=${username}&password=${password}&email=${email}`;
        }
      } catch (error) {
        console.error("Error when editing student:", error);
      }
    }
  });

  studentDataContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("deleteButton")) {
      const confirmDelete = window.confirm("Are you sure you want to delete this student?");

      if (confirmDelete) {
        const studentId = event.target.dataset.id;
        const isDeleted = await deleteStudent(studentId);

        if (isDeleted) {
          populateStudentTable();
          console.log("Student deleted successfully");
        } else {
          console.log("Failed to delete student");
        }
      }
    }
  });

  createStudentButton.addEventListener("click", () => {
    window.location.href = "create_student.html";
  });
});