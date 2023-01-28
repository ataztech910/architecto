#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import * as files from "./lib/files.js";
import { clearCLI } from "./utils/cli.js";
import * as dialog from "./lib/dialog.js";
import questions from "./config/questions.js";
import { IQuestion } from "./types/data.models.js";
import Store from "./service/store.js";
import { generateConfiguration } from "./lib/files.js";

clearCLI();
const store = Store.getInstance();

console.log(
    chalk.yellow(
        figlet.textSync('Architecto', { horizontalLayout: 'full' })
    )
);

if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a Git repository!'));
}

const run = async () => {
    const credentials = await dialog.buildDialog();
    const credentialsArray = Object.keys(credentials);
    credentialsArray.forEach((key: string) => {
        const item = questions.find((question: IQuestion) => question.name === key);
        if (item?.valut) {
            credentials[key] = '%USER_VAULT%';
        }
        store.updateData(key, credentials[key]);
    });
    generateConfiguration(store.storeData);
};

run();
