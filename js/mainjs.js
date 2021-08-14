
var nameInput = document.getElementById("name");
var ageInput = document.getElementById("age");
var salaryInput = document.getElementById("salary");
var phoneInput = document.getElementById("phone");
var submitBtn = document.getElementById("submitBtn");
var inputs = document.getElementsByClassName("form-control");
var employees;
var editIndex;


if (localStorage.getItem("employeeList") == null) {
    employees = [];
}
else {
    employees = JSON.parse(localStorage.getItem("employeeList"));
    displayData();
}

submitBtn.onclick = function () {
    if (submitBtn.innerHTML == ("Add Employee")) {
        addEmployee();
    }
    else {
        updateEmployee()
    }
    displayData();
    resetForm();
}

function addEmployee() {
        var employee =
        {
            name: nameInput.value,
            age: ageInput.value,
            salary: salaryInput.value,
            phone: phoneInput.value,
        }
        employees.push(employee);
        localStorage.setItem("employeeList", JSON.stringify(employees));    
}

function displayData() {
    var trs = "";
    for (var i = 0; i < employees.length; i++) {
        trs += `<tr>
        <td>${employees[i].name}</td>
        <td>${employees[i].age}</td>
        <td>${employees[i].salary}</td>
        <td>${employees[i].phone}</td>
        <td><button onclick="deleteEmployee(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="getEmployeeData(${i})" class="btn btn-warning">Update</button></td>
        </tr>`
    }
    document.getElementById("tBody").innerHTML = trs;
}

function resetForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    displayData();
    localStorage.setItem("employeeList", JSON.stringify(employees));
}

function search(searchText) {
    var trs = "";
    for (var i = 0; i < employees.length; i++) {
        if (employees[i].name.toLowerCase().includes(searchText.toLowerCase())) {
            trs += `<tr>
        <td>${employees[i].name}</td>
        <td>${employees[i].age}</td>
        <td>${employees[i].salary}</td>
        <td>${employees[i].phone}</td>
        <td><button onclick="deleteEmployee(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="getEmployeeData(${i})" class="btn btn-warning">Update</button></td>
        </tr>`
        }
    }
    document.getElementById("tBody").innerHTML = trs;
}

function getEmployeeData(index) {
    submitBtn.innerHTML = ("Edit Employee");
    nameInput.value = employees[index].name;
    ageInput.value = employees[index].age;
    salaryInput.value = employees[index].salary;
    phoneInput.value = employees[index].phone;
    editIndex = index;
}

function updateEmployee() {
    var employee =
    {
        name: nameInput.value,
        age: ageInput.value,
        salary: salaryInput.value,
        phone: phoneInput.value,
    }
    employees[editIndex] = employee;
    localStorage.setItem("employeeList", JSON.stringify(employees));
    displayData();
    submitBtn.innerHTML = ("Add Employee");
}

function nameValdtion() {
    var nameRejex = /^[A-Z][a-z]{2,7}$/;
    if (!nameRejex.test(nameInput.value)) {
        submitBtn.disabled = "true";
        return false;
    }
    else {
        submitBtn.removeAttribute("disabled");
        return true;
    }
}

function ageValdtion(){
    var ageRejex = /^([2-7][0-9]|80)$/;
    if (!ageRejex.test(ageInput.value)) {
        submitBtn.disabled = "true";
        return false;
    }
    else {
        submitBtn.removeAttribute("disabled");
        return true;
    }  
}

function phoneValdtion() {
    var phoneRejex = /^01[0125]{1}[0-9]{8}$/;
    if (!phoneRejex.test(phoneInput.value)) {
        submitBtn.disabled = "true";
        return false;
    }
    else {
        submitBtn.removeAttribute("disabled");
        return true;
    }
}

function salaryValdtion(){
    salaryRejex=/^[0-9]{0,6}$/
    if(!salaryRejex.test(salaryInput.value))
    {
       submitBtn.disabled="true";
       return false;
    }
    else
    {
     submitBtn.removeAttribute("disabled");
     return true;
    }
}

nameInput.onkeyup = function(){
    nameValdtion();
}
ageInput.onkeyup = function(){
    ageValdtion();
}
salaryInput.onkeyup = function(){
    salaryValdtion();
}
phoneInput.onkeyup = function(){
    phoneValdtion();
}
