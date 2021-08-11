
var nameInput=document.getElementById("name");
var ageInput=document.getElementById("age");
var salaryInput=document.getElementById("salary");
var phoneInput=document.getElementById("phone");
var inputs=document.getElementsByClassName("form-control");
var employees;
var updateIndex;

if(localStorage.getItem("employesslist")==null)
{
  employees=[];
}
else{
    employees=JSON.parse(localStorage.getItem("employesslist"));
    displayData();
}


var addBtn=document.getElementById("addBtn");
addBtn.onclick=function(){
  if(addBtn.innerHTML==("Add Employee")){
    addEmployee();
  } 
  else{
    returnUpdatedData();
    }

 displayData(); 
 resetForm(); 
}


function addEmployee(){

    var employee=
    {
        name:nameInput.value,
        age:ageInput.value,
        salary:salaryInput.value,
        phone:phoneInput.value,
    }
      employees.push(employee);
      localStorage.setItem("employesslist",JSON.stringify(employees));

}

function displayData(){

    var trs="";

    for(var i=0;i<employees.length;i++)
    {
        trs+=`
        <tr>
        <td>${employees[i].name}</td>
        <td>${employees[i].age}</td>
        <td>${employees[i].salary}</td>
        <td>${employees[i].phone}</td>
        <td><button onclick="deleteEmployee(${i})" class="btn btn-danger"> Delete </button></td>
        <td><button onclick="updateEmployee(${i})" class="btn btn-warning"> Update </button></td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML=trs;
    
}

function resetForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
}

function deleteEmployee(index){
    employees.splice(index,1);
    displayData();
    localStorage.setItem("employesslist",JSON.stringify(employees));
}

function search(searchText){

    var trs="";

    for(var i=0;i<employees.length;i++)
    {
        if(employees[i].name.toLowerCase().includes(searchText.toLowerCase())){
        trs+=`
        <tr>
        <td>${employees[i].name}</td>
        <td>${employees[i].age}</td>
        <td>${employees[i].salary}</td>
        <td>${employees[i].phone}</td>
        <td><button onclick="deleteEmployee(${i})" class="btn btn-danger"> Delete </button></td>
        <td><button onclick="updateEmployee(${i})" returnUpdatedData(${i}) { class="btn btn-warning"> Update </button></td>
        </tr>`
    }
}
    document.getElementById("tableBody").innerHTML=trs;
    
}


function updateEmployee(index){
    addBtn.innerHTML=("Edit Employee");
    nameInput.value=employees[index].name;
    ageInput.value=employees[index].age;
    salaryInput.value=employees[index].salary;
    phoneInput.value=employees[index].phone;
    updateIndex=index;
}
function returnUpdatedData(){
    var employee=
    {
        name:nameInput.value,
        age:ageInput.value,
        salary:salaryInput.value,
        phone:phoneInput.value,
    }
    employees[updateIndex]=employee;
    localStorage.setItem("employesslist",JSON.stringify(employees));
    displayData();
    addBtn.innerHTML=("Add Employee");
   }





