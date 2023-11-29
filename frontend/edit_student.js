document.addEventListener("DOMContentLoaded", () => {
    const editStudentForm = document.getElementById("editStudentForm");
    const messageContainer = document.getElementById("messageContainer");
  
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get("id");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const emailInput = document.getElementById("email");
  
    const validateLatinLetters = (inputElement) => {
      inputElement.addEventListener("input", () => {
        const regex = /^[a-zA-Z]+$/;
        const inputValue = inputElement.value;
  
        if (!regex.test(inputValue)) {
          inputElement.value = inputValue.slice(0, -1);
        }
      });
    };
  
    const validateUsername = (inputElement) => {
      inputElement.addEventListener("input", () => {
        const regex = /^[a-zA-Z0-9-._]+$/;
        const inputValue = inputElement.value;
  
        if (!regex.test(inputValue)) {
          inputElement.value = inputValue.slice(0, -1);
        }
      });
    };
  
    const validateEmail = (inputElement) => {
      inputElement.addEventListener("input", () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const inputValue = inputElement.value;
  
        if (!regex.test(inputValue)) {
          emailInput.setCustomValidity("Please enter a valid email address");
        } else {
          emailInput.setCustomValidity("");
        }
      });
    };
  
    validateLatinLetters(firstNameInput);
    validateLatinLetters(lastNameInput);
    validateUsername(usernameInput);
    validateEmail(emailInput);
    
    const fetchStudentDetails = async () => {
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
  
    const populateFormFields = async () => {
      const studentDetails = await fetchStudentDetails();
      if (studentDetails) {
        const { first_name, last_name, username, password, email } = studentDetails;
        firstNameInput.value = first_name;
        lastNameInput.value = last_name;
        usernameInput.value = username;
        passwordInput.value = password;
        emailInput.value = email;
      } else {
        messageContainer.textContent = "Failed to fetch student details.";
        messageContainer.style.color = "red";
      }
    };
  
    populateFormFields();
  
    editStudentForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const updatedStudent = {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
        email: emailInput.value
      };
  
      try {
        const response = await fetch(`http://localhost:4000/students/${studentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedStudent)
        });
  
        if (response.ok) {
          messageContainer.textContent = "Student details updated successfully!";
          messageContainer.style.color = "green";
        } else {
          throw new Error("Failed to update student details");
        }
      } catch (error) {
        messageContainer.textContent = "Failed to update student details!";
        messageContainer.style.color = "red";
        console.error("Error updating student details:", error);
      }
    });
  
    const backToStudentListButton = document.getElementById("backToStudentListButton");
    backToStudentListButton.addEventListener("click", () => {
      window.location.href = "student_list.html";
    });
  });