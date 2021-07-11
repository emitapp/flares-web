const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
const fs = require('fs');
const fsPromises = require('fs/promises');


const copy = async () => {
    try {
        const currentProjectName = (await exec('firebase use')).stdout.trim()
        let availableProjectsFile = fs.readFileSync('.firebaserc');
        let availableProjects = JSON.parse(availableProjectsFile).projects;
        if (!availableProjects.dev || !availableProjects.production) throw "Invalid .firebaserc file"
        if (availableProjects.dev != currentProjectName && availableProjects.prod != currentProjectName) {
            console.log("currentProjectName: ", currentProjectName)
            console.log("availableProjects: ", availableProjects)
            throw "Invalid current alias"
        }

        let srcFileName = ""
        if (availableProjects.dev == currentProjectName) {
            console.log("Copying over dev config")
            srcFileName = ".env/firebaseconfigdev.js"
        }
        if (availableProjects.production == currentProjectName) {
            console.log("Copying over prod config")
            srcFileName = ".env/firebaseconfigprod.js"
        }
        await fsPromises.copyFile(srcFileName, './hosting/src/firebaseconfig.js');

    } catch (e) {
        console.error(e)
        process.exit(1);
    }
}

copy()