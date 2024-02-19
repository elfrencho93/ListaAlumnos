// Data of the students
const students = [
    { "name": "Jane Doe", "age": 20, "id": "001", "email": "jane.doe@example.com" },
    { "name": "Scoutmaster Lumpus", "age": 22, "id": "002", "email": "lumpus@example.com" },
    { "name": "Ghost Johnson", "age": 21, "id": "003", "email": "ghost.johnson@example.com" },
    { "name": "Little Pinto", "age": 26, "id": "004", "email": "little.pinto@example.com" },
    { "name": "Giggles Logano", "age": 23, "id": "005", "email": "loganito@example.com" },
    { "name": "Juanito Montoya", "age": 32, "id": "006", "email": "jetdryer@example.com" },
    { "name": "Angelina Wade", "age": 24, "id": "007", "email": "dr4g0n5lay3r@example.com" },
    { "name": "Monsta Rhett", "age": 23, "id": "008", "email": "montserrat@example.com" },
    { "name": "Veruca Salt", "age": 19, "id": "009", "email": "s0ng0ku@example.com" },
    { "name": "Willy Wonka", "age": 28, "id": "010", "email": "ch0c0lateman@example.com" },
    { "name": "Denny Hamster", "age": 18, "id": "011", "email": "ham5t3rman@example.com" },
    { "name": "Gloria Escocia", "age": 17, "id": "012", "email": "p0k3m0n35p4d4@example.com" },
    { "name": "Ivo Eggman Robotnik", "age": 30, "id": "013", "email": "p1nga5@example.com" },
    { "name": "Norberto Beavero", "age": 18, "id": "014", "email": "norb@example.com" },
        
];
  
// Student table function
function renderTable() {
const tableBody = document.querySelector('#studentTable tbody');
tableBody.innerHTML = '';

  students.forEach(function (student, index) {
    const row = document.createElement('tr');
    row.innerHTML = `<td class="center-align">${student.name}</td>
                      <td class="center-align">${student.age}</td>
                      <td class="center-align">${student.id}</td>
                      <td class="center-align">${student.email}</td>
                      <td class="center-align">
                      <i class="fa-solid fa-file-pen fa-lg icon-edit" onclick="editStudent(${index})" style="color: blue; cursor: pointer;"></i>
                      <i class="fa-solid fa-delete-left fa-lg icon-delete" onclick="deleteStudent(${index})" style="color: red; cursor: pointer;"></i>
                      </td>`;
    row.setAttribute('data-index', index);
    tableBody.appendChild(row);
  });
}
    
//Sorting columns in order
let currentSortColumn = 'name';
let isAscending = true;

function sortTable(column) {
  if (currentSortColumn === column) {
      isAscending = !isAscending;
      } else {
              currentSortColumn = column;
              isAscending = true;
            }

      students.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          } else {
        return isAscending ? valueA - valueB : valueB - valueA;
    }
});

    renderTable();
    }

  
// Function to filter the table based on input
function filterTable() {
  let input, filter, table, tr, td, i, txtValue;
      input = document.getElementById('searchInput');
      filter = input.value.toUpperCase();
      table = document.getElementById('studentTable');
      tr = table.getElementsByTagName('tr');
  
      for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName('td');
          for (let j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = '';
              break;
            } else {
              tr[i].style.display = 'none';
              }
        }
    }
}
  
// Initial rendering of the table
renderTable();
  
// Event listener for input changes
document.getElementById('searchInput').addEventListener('input', filterTable);

// Function to open the modal
function openModal() {
document.getElementById('myModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
  // Removing any existing error messages
  const existingErrorMessage = document.querySelector('.error-message');
  if (existingErrorMessage) {
    existingErrorMessage.remove();
  }

  document.getElementById('myModal').style.display = 'none';
}


// Function to open the modal for adding a new student
function openAddModal() {
  document.getElementById('registrationForm').reset(); // Reset form fields
  openModal();
}

// Function to open the modal for editing a student
function openEditModal(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('age').value = student.age;
  document.getElementById('id').value = student.id;
  document.getElementById('email').value = student.email;

  openModal();
}

// Function to handle form submission
function submitForm() {
  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);
  const id = document.getElementById('id').value;
  const email = document.getElementById('email').value;

  // Removing any existing error messages
  const existingErrorMessage = document.querySelector('.error-message');
  if (existingErrorMessage) {
    existingErrorMessage.remove();
  }

  // Validating form fields
  if (!name || isNaN(age) || !id || !email) {
    // Displaying an error message above the form
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = '<p style="color: red; font-weight: bold;">Por favor llene todos los campos.</p>';
    
    // Inserting the error message above the form
    const modalContent = document.querySelector('.modal-content');
    modalContent.insertBefore(errorMessage, modalContent.firstChild);
    
    // Returning to stop the function execution
    return;
  }

  const formData = { name, age, id, email };

  // Determining whether to add or edit a student
  if (editingIndex !== null) {
    // Editing existing student
    students[editingIndex] = formData;
  } else {
    // Adding new student
    students.push(formData);
  }

  renderTable();
  closeModal();
}


// Variable to store the index of the student being edited
let editingIndex = null;

// Function to add a new student
function addStudent() {
  editingIndex = null;
  openAddModal();
}

// Edit student function
function editStudent(index) {
  editingIndex = index;
  openEditModal(index);
}


// Delete student function
function deleteStudent(index) {
const confirmDelete = confirm('¿Deseas eliminar a este alumno?');
  if (confirmDelete) {
    students.splice(index, 1);
    renderTable();
  }
}

// Event listener for the "Añadir" button
document.querySelector('.btnadd').addEventListener('click', addStudent);

// Event listener for input fields to trigger button click on "Entrar"
document.getElementById('name').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    submitForm();
  }
});

document.getElementById('age').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    submitForm();
  }
});

document.getElementById('id').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    submitForm();
  }
});

document.getElementById('email').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    submitForm();
  }
});

 