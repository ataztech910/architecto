import { IQuestion } from "types/data.models.ts";
import { Messages } from "./messages";

const questions: IQuestion[] = [
    {
        name: 'username',
        type: 'input',
        message: Messages.ENTER_EMAIL,
        messageOnFailure: Messages.RE_ENTER_EMAIL,
        valut: true
    },
    {
        name: 'password',
        type: 'password',
        message: Messages.ENTER_PASSWORD,
        messageOnFailure: Messages.RE_ENTER_PASSWORD,
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