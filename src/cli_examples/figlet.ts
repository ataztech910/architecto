import figlet from "figlet";

const operation = (err: Error | null, data?: string) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
};

// Uncomment this for hello worl emaple
// figlet('Hello IBM!!', operation);

// Uncomment this for more examples
// const font = 'Ghost'; // Ghost | Graffiti | Big Money-ne | Sub-Zero
// figlet.text('Never know best', {
//     font,
//     horizontalLayout: 'default',
//     verticalLayout: 'default',
//     width: 100,
//     whitespaceBreak: true
// }, operation);