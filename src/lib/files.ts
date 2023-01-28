import chalk from "chalk";
import fs from "fs";
import path from "path";
import * as jsyaml from "js-yaml";

const getCurrentDirectoryBase = () => {
    return path.basename(process.cwd());
}

const directoryExists = (filePath: string) => {
    return fs.existsSync(filePath);
}

const generateConfiguration = (configuration: {[key: string]: string}) => {
    if (!fs.existsSync(configuration['projectName'])) {
        fs.mkdirSync(configuration['projectName']);
    }

    fs.writeFile(configuration['projectName'] + '/' +configuration['projectName'] + '.yaml', jsyaml.dump(configuration), function (err) {;
        if (err) throw err;
        console.log(chalk.green('YAML file is created successfully!'));
    });
}

export { getCurrentDirectoryBase, directoryExists, generateConfiguration };