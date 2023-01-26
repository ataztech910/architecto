import chalk from "chalk";
import figlet from "figlet";
import * as files from "./lib/files.js";
import { clearCLI } from "./utils/cli.js";
import * as dialog from "./lib/dialog.js";

clearCLI();

console.log(
    chalk.yellow(
        figlet.textSync('Architecto', { horizontalLayout: 'full' })
    )
);

if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a Git repository!'));
    // process.exit();
}

const run = async () => {
    const credentials = await dialog.askGitCredentials();
    console.log(credentials);
};

run();