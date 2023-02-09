import chalk from 'chalk';

// Uncomment this line for simple chalk example
// console.log(chalk.blue('Hello world!'));

// Uncomment this line for combined example 
// console.log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// Ucomment this line to add background and bold font style in chain way
// console.log(chalk.blue.bgRed.bold('Hello world!'));

// Uncomment this line to combine styles in waterfall way
// console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// Uncomment this line to have one colored main string with another colored substring
// console.log(chalk.green(
// 	'I am a green line ' +
// 	chalk.blue.underline.bold('with a blue substring') +
// 	' that becomes green again!'
// ));

// Uncomment this line to use modern ESNext string style
// console.log(`
//     CPU: ${chalk.red('90%')}
//     RAM: ${chalk.green('40%')}
//     DISK: ${chalk.yellow('70%')}
// `);

// Uncomment this line to use rgb
// console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
// console.log(chalk.hex('#DEADED').bold('Bold gray!'));

// Uncomment this to use cusom theme
// const error = chalk.bold.red;
// const warning = chalk.hex('#FFA500');
// console.log(error('Error!'));
// console.log(warning('Warning!'));

// Uncomment this to substitute string
// const name = 'IBM';
// console.log(chalk.green('Hello %s'), name);