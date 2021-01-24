const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];

function switchStatement() {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of employee is being added?",
            choices: ["Manager", "Intern", "Engineer", "Team Complete"],
            name: "userChoice"
        }
    ])
        .then(function (answers) {
            switch (answers.userChoice) {
                case "Manager":
                    addManager()
                    break;
                case "Intern":
                    addIntern()
                    break;
                case "Engineer":
                    addEngineer()
                    break;
                default:
                    createTeam()
            }
        })
}
const manQ = [
    {
        type: "input",
        message: "What is the manager's name?",
        name: "managerName",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a name";
        }
    },
    {
        type: "input",
        message: "What is the manager's ID number?",
        name: "ManagerID",
    },
    {
        type: "input",
        message: "What is the manager's email address?",
        name: "managerEmail",
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNum"
    }
]

const intQ = [
    {
        type: "input",
        message: "What is the intern's name?",
        name: "intName",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a name";
        }
    },
    {
        type: "input",
        message: "What is the intern's ID number",
        name: "intID"
    },
    {
        type: "input",
        message: "What is the intern's email address?",
        name: "intEmail"
    },
    {
        type: "input",
        message: "What is the intern's school?",
        name: "intSchool"
    }
]

const enginQ = [
    {
        type: "input",
        message: "What is the engineer's name?",
        name: "enginName",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter a name.";
        }
    },
    {
        type: "input",
        message:"What is the engineer's ID number?",
        name:"enginNumber",
    },
    {
        type:"input",
        message:"What is the Engineer's Email Address?",
        name:"enginEmail",
    },
    {
        type:"input",
        message:"What is the engineer's github account name?",
        name:"enginGithub"
    }

]

function addManager() {
    inquirer.prompt(manQ).then(
        function (response) {
            const manager = new Manager(response.managerName, response.ManagerID, response.managerEmail, response.officeNum)
            team.push(manager)
            switchStatement()
        }
    );
}
function addIntern() {
    inquirer.prompt(intQ).then(
        function (response) {
            const intern = new Intern(response.intName, response.intID, response.intEmail, response.intSchool)
            team.push(intern)
            switchStatement()
        }
    )
}
function addEngineer(){
    inquirer.prompt(enginQ).then(
        function (response) {
            const engineer = new Engineer(response.enginName, response.enginNumber, response.enginEmail, response.enginGithub )
        team.push(engineer)
        switchStatement()
        }
    )
}


function createTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    } fs.writeFileSync(outputPath, render(team), "utf-8")
}

switchStatement()