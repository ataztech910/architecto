import { IQuestion } from "types/data.models.ts";
import { Messages } from "./messages";

const questions: IQuestion[] = [
    {
        name: 'personal_token',
        type: 'input',
        message: Messages.ENTER_TOKEN,
        messageOnFailure: Messages.RE_ENTER_TOKEN,
        valut: true
    },
    {
        name: 'projectName',
        type: 'input',
        message: Messages.ENTER_PROJECT_NAME,
        messageOnFailure: Messages.RE_ENTER_PROJECT_NAME
    },
];

export default questions;