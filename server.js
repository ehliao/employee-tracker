// Requires Packages
const inquirer = require('inquire');
const mysql = requre('mysql2');
const consoleTable = require('console.table');

// Connect to Database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'ehyl3424!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  
// Welcome Image
db.connect((err) => {
    if (err) throw err;
    console.log(",------------------------------------------------------------.")
    console.log("|    _______                  _                              |")
    console.log("|   |  _____|_ __ ___  _ ___ | | _____  _    _  ____  ____   |")
    console.log("|   |   __| | '_ ` _ \| '__ \| |/  _  \| |  | |/ __ \/ __ \  |")
    console.log("|   |  |____| | | | | | |_)  | |  ( )  | |__| |  ___/  ___/  |")
    console.log("|   |_______|_| |_|_|_| .___/| |\_____/ \__,  |\____|\____\  |")
    console.log("|                     |_|    |_|         |___/               |")
    console.log("|    __  __                                                  |")
    console.log("|   |  \/  | ___ _ _ __   ___ _  ___ _   ____ _ ___          |")
    console.log("|   | |\/| |/  _` | '_ \ /  _` |/  _`  |/ __ \ '___|         |")
    console.log("|   | |  | |  (_| | | | |  (_| |  (_|  |  ___/ |             |")
    console.log("|   |_|  |_|\___,_|_| |_|\___,_|\____, |\____|_|             |")
    console.log("|                                |____/                      |")
    console.log("`------------------------------------------------------------'")
    startPrompt();
})

// Starts prompt
const startPrompt = () => {
    inquirer.prompt ([
        {
        type: "list",
        message: "What would you like to do?",
        name: "choices",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Deparments",
            "Add Department",
            // BONUS: Additional functions
            "Update Employee's Manager",
            "View Employees by Manager",
            "View Employees by Department",
            "Delete Employee",
            "Delete Role",
            "Delete Department",
            "View Department Budget",
            "Exit"]
        }
    ])
    .then((response) => {
        switch (response.action) {
            case "View All Employees":
                viewEmployees();
                break;
            case "Add Employee":
                addEmployees();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            // BONUS: Additional Functions
            case "Update Employee's Manager":
                updateManager();
                break;
            case "View Employees by Manager":
                viewEmpMngr();
                break;
            case "View Employees by Department":
                viewEmpDept();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "Delete Role":
                deleteRole();
                break;
            case "Delete Department":
                deleteDept();
                break;
            case "View Department Budget":
                viewDeptBdgt();
                break;
            case "Exit":
                exit();
                break;
            }
        })
    };
    

        // const {choices} = response;
        // if (choices === "View All Employees") {
        //     viewEmployees();
        // }
        // if (choices === "Add Employee") {
        //     addEmployee();
        // }
        // if (choices === "Update Employee Role") {
        //     updateEmployee();
        // }
        // if (choices === "View All Roles") {
        //     viewRoles();
        // }
        // if (choices === "Add Role") {
        //     addRole();
        // }
        // if (choices === "View All Departments") {
        //     viewDepartments();
        // }
        // if (choices === "Add Department") {
        //     addDepartment();
        // }
        // BONUS: Additional functions
        // if (choices === "Update Employee Manager") {
        //     addDepartment();
        // }
        // if (choices === "Add Department") {
        //     addDepartment();
        // }
        // if (choices === "Add Department") {
        //     addDepartment();
        // }
        // if (choices === "Add Department") {
        //     addDepartment();
        // }
        // if (choices === "Add Department") {
        //     addDepartment();
        // }

// Individual Functions
function viewEmployees () {
    var query = `SELECT * FROM employee`;
    connection.query(query, function (err,res) {
        if (err) throw err;
        console.log(res.length + "Employees");
        console.table("All Employees:", res);
        options();
    })
};

function addEmployees () {
    inquirer.prompt ([
        {
            type: "input",
            name: "first_name",
            message: "Please enter employee's first name"
        },
        {
            type: "input",
            name: "last_name",
            message: "Please enter employee's last name"
        },
        {
            type: "input",
            name: "role_id",
            message: "Please enter employee's role ID"
        },
        {
            type: "input",
            name: "manager_id",
            message: "Please enter employee's manager ID"
        },
    ]).then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const roleId = res.roleId;
        const managerId = res.managerId;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}","${lastName}","${roleId}","${managerId}")`;
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log("Employee added");
            console.table(res);
        });
    });
}

function updateEmployee() {
    inquirer.prompt ([
        {
            type: "input",
            name:"updateEmpRole",
            message: "Select employee you want to update"
        },
        {
            type: "input",
            name: "newEmpRole",
            message: "Select new role for employee"
        }
    ]).then(function (res) {
        const updateEmpRole = res.updateEmpRole;
        const newEmpRole = res.newEmpRole;
        const updateQuery = `UPDATE employee SET role_id = "${newEmpRole}" WHERE id = "${updateEmpRole}"`;
        connection.query(updateQuery, function (err,res) {
            if (err) throw err;
            console.log("Employee updated");
            console.table(res);
        });
    });
}

function viewRoles () {
    var query = `SELECT * FROM role`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Roles:", res);
    });
}

function addRole () {
    inquirer.prompt ([
        {
            type: "input",
            name: "roleName",
            message: "Enter employee's role title"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Enter employee's salary"
        },
        {
            type: "input",
            name: "deptId",
            message: "Enter employee's department ID"
        },
    ]).then(function (res) {
        const title = res.roleName;
        const salary = res.roleSalary;
        const deptId = res.deptId;
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}","${salary}","${deptId}")`;
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log("Employee Role aded");
            console.table(res);
        });
    });
}

function viewDepartments () {
    var query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Departments:", res);
    });
}

function addDepartment () {
    inquirer.prompt ([
        {
            type:"input",
            name: "newDept";
            message: "Enter new department name"
        }
    ]).then(function (res) {
        const newDept = res.newDept;
        const query = `INSERT INTO department (department_name) VALUES ("${newDept}")`;
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log("Department Added");
            console.table(res);
        });
    });
}