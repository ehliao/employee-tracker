// Requires Packages
const inquirer = require('inquirer')
const mysql = require('mysql2')
const consoleTable = require('console.table')

// Connect to Database
const db = mysql.createConnection(
    {
      host: "localhost",
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
    console.log("|   |  \\/  | ___ _ _ __   ___ _  ___ _   ____ _ ___          |")
    console.log("|   | |\/| |/  _` | '_ \ /  _` |/  _`  |/ __ \ '___|         |")
    console.log("|   | |  | |  (_| | | | |  (_| |  (_|  |  ___/ |             |")
    console.log("|   |_|  |_|\___,_|_| |_|\___,_|\____, |\____|_|             |")
    console.log("|                                |____/                      |")
    console.log("`------------------------------------------------------------'")
    startPrompt();
});

// Starts prompt
const startPrompt = () => {
    inquirer.prompt ([
        {
        type: "list",
        message: "What would you like to do?",
        name: "startPrompt",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Deparments",
            "Add Department",
            "Exit"]
        }
    ]).then(function(answer) {
        switch (answer.startPrompt) {
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
            case "Exit":
                exit();
                break;
            }
        })
    };
    
// Individual Functions
function viewEmployees () {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

function addEmployees () {
    inquirer.prompt ([
        {
            type: "input",
            name: "firstName",
            message: "Please enter employee's first name"
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter employee's last name"
        },
        {
            type: "input",
            name: "roleId",
            message: "Please enter employee's role ID"
        },
        {
            type: "input",
            name: "managerId",
            message: "Please enter employee's manager ID"
        },
    ]).then(function (answer) {
        const firstName = answer.firstName;
        const lastName = answer.lastName;
        const roleId = answer.roleId;
        const managerId = answer.managerId;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}","${lastName}","${roleId}","${managerId}")`;
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log("Employee added");
            console.table(res);
            startPrompt();
        });
    });
};

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
    ]).then(function (answer) {
        const updateEmpRole = answer.updateEmpRole;
        const newEmpRole = answer.newEmpRole;
        const updateQuery = `UPDATE employee SET role_id = "${newEmpRole}" WHERE id = "${updateEmpRole}"`;
        db.query(updateQuery, function (err,res) {
            if (err) throw err;
            console.log("Employee updated");
            console.table(res);
            startPrompt();
        });
    });
}

function viewRoles () {
    var query = `SELECT * FROM role`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
};

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
    ]).then(function (answer) {
        const title = answer.roleName;
        const salary = answer.roleSalary;
        const deptId = answer.deptId;
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}","${salary}","${deptId}")`;
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log("Employee Role aded");
            console.table(res);
            startPrompt();
        });
    });
};

function viewDepartments () {
    var query = `SELECT * FROM department`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
};

function addDepartment () {
    inquirer.prompt ([
        {
            type:"input",
            name: "newDept",
            message: "Enter new department name"
        }
    ]).then(function (answer) {
        const newDept = answer.newDept;
        const query = `INSERT INTO department (department_name) VALUES ("${newDept}")`;
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log("Department Added");
            console.table(res);
            startPrompt();
        });
    });
};