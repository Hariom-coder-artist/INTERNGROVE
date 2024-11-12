document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("student-form");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const rollNoInput = document.getElementById("rollNo");
  const studentList = document.querySelector(".student-list");

  let editMode = false;
  let currentRow = null;

  // Add a new student to the list
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const rollNo = rollNoInput.value.trim();
    
    if (!firstName || !lastName || !rollNo) {
      alert("Please fill out all fields.");
      return;
    }
    if (editMode) {
      // Update existing row
      currentRow.children[0].textContent = firstName;
      currentRow.children[1].textContent = lastName;
      currentRow.children[2].textContent = rollNo;

      editMode = false;
      currentRow = null;
    } else {
      // Create a new row
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${rollNo}</td>
        <td>
          <button class="edit-btn btn btn-primary btn-sm">Edit</button>
          <button class="delete-btn btn btn-danger btn-sm">Delete</button>
        </td>
      `;
      studentList.appendChild(newRow);
    }
    // Reset form
    form.reset();
  });

  // Handle edit and delete actions
  studentList.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      // Edit student
      editMode = true;
      currentRow = e.target.closest("tr");

      firstNameInput.value = currentRow.children[0].textContent;
      lastNameInput.value = currentRow.children[1].textContent;
      rollNoInput.value = currentRow.children[2].textContent;
    } else if (e.target.classList.contains("delete-btn")) {
      // Delete student
      const row = e.target.closest("tr");
      studentList.removeChild(row);
    }
  });
});