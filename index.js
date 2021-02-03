//FACTORY FUNCTION FOR EMPLOYEES
const employees = (id, name, gender, location, email, phone, cell, picture) => {
    return {
        id,
        name,
        gender,
        location,
        email,
        phone,
        cell,
        id,
        picture,
    }
}

//EMPLOYEES ARRAY
let employeesList = [];


//TABLE CREATION
function employeesTable (table ,employeesList) {
    let keys = Object.keys(employeesList[0]);

    //CREATION OF TABLE HEAD
    let thead = table.createTHead();
    thead.className = "thead";
    let row = thead.insertRow();

    for(let key of keys){
        let th = document.createElement("th");
        th.className = "header";
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }

    //CREATION OF TABLE BODY
    let tbody = table.createTBody();
    for (let element of employeesList) {
        let row = tbody.insertRow(); 
        for (key in element) {
          let cell = row.insertCell();
          cell.className="row"          
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
    }
}

/* DATATABLE ATTEMPT FUNCTION
function dataTable(list){
    $(document).ready(function() {
        $('#tables').DataTable( {
            data: list,
            columns: [
                { title: "Id" },
                { title: "Name" },
                { title: "Gender" },
                { title: "Location" },
                { title: "Email" },
                { title: "Phone" },
                { title: "Call"},
                { title: "Picture"}
            ]
        } );
    } );
}
*/

//FETCH REQUEST
async function getEmployees () {
    let response = await fetch("https://randomuser.me/api/?results=20");
    let json = await response.json();
    for (let person in json.results) {

        //EMPLOYEELIST ARRAY FILLING PROCESS
        employeesList.push(
            employees(
                json.results[person].id.value,
                json.results[person].name.first + " "+json.results[person].name.last,
                json.results[person].gender,                
                json.results[person].location.city,
                json.results[person].email,
                json.results[person].phone,
                json.results[person].cell,
                json.results[person].picture.medium                
            )
        );
    }

    let table = document.getElementById('table');
    employeesTable(table, employeesList);

    //dataTable(employeesList);
}

getEmployees();