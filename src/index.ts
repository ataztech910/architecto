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
import GitContext from "./lib/git.js";
import GitHubStrategy from "./lib/github.strategy.js";

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

    // For the example purpose the strategy will be set manually
    const gitContext = new GitContext(new GitHubStrategy());

    const gitToken = await gitContext.auth(store.storeData['personal_token']);
    if (!gitToken) {
        console.log(chalk.red('Git auth incorrect'));
        return false;
    }
    Store.getInstance().updateData("git_token", gitToken);
    
    console.log(store.storeData);
};

run();
