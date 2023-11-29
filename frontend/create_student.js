document.addEventListener("DOMContentLoaded", () => {
  const newStudentForm = document.getElementById("newStudentForm");
  const gotoStudentListButton = document.getElementById("gotoStudentList");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const usernameInput = document.getElementById("username");
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

  newStudentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      first_name: document.getElementById("firstName").value,
      last_name: document.getElementById("lastName").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      email: document.getElementById("email").value,
    };

    try {
      const response = await fetch("http://localhost:4000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        messageContainer.textContent = "Student profile created successfully!";
        messageContainer.style.color = "green";
        newStudentForm.reset();

      } else {
        throw new Error("Failed to create student profile");
      }
    } catch (error) {
      messageContainer.textContent = "Failed to create student profile";
      messageContainer.style.color = "red";
    }
  });

  gotoStudentListButton.addEventListener("click", () => {
    window.location.href = "student_list.html";
  });
});
