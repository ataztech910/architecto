## Required libraries

npm install chalk clear clui figlet inquirer minimist configstore @octokit/rest @octokit/auth-basic

## Clear the CLI 

if (fullClear === true) {
        process.stdout.write('\x1b[2J');
}

process.stdout.write('\x1b[0f');