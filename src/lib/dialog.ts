import { Messages } from "config/messages.js";
import inquirer from "inquirer";

const askGitCredentials = () => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: Messages.ENTER_EMAIL,
        validate: ( value: string ) => {
          if (value.length) {
            return true;
          } else {
            return Messages.RE_ENTER_EMAIL;
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: Messages.ENTER_PASSWORD,
        validate: (value: string) => {
          if (value.length) {
            return true;
          } else {
            return Messages.RE_ENTER_PASSWORD;
          }
        }
      }
    ];
    return inquirer.prompt(questions);
}

export { askGitCredentials };