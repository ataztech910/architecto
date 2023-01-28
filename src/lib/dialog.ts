import { Alerts } from "../config/messages.js";
import questions from "../config/questions.js";
import inquirer from "inquirer";
import { IQuestion } from "types/data.models.ts";

const buildDialog = () => {
    if (!Array.isArray(questions) || questions.length === 0) {
      return Promise.reject(Alerts.WRONG_ARRAY);
    }

    questions.forEach((question: IQuestion) => {
      question.validate = async ( value: string ) => {
            if (!value) {
              return question.messageOnFailure;
            } else {
              return true;
            }
      }
    });

    return inquirer.prompt(questions);
}

export { buildDialog };