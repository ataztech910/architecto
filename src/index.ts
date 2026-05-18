import { runInit } from './cli/init.js';
import { runValidate } from './cli/validate.js';

const [command, ...args] = process.argv.slice(2);

async function main() {
  try {
    switch (command) {
      case 'init':
        await runInit(args);
        break;
      case 'validate':
        await runValidate(args);
        break;
      case '--help':
      case '-h':
      case 'help':
        printHelp();
        break;
      case '--version':
      case '-v':
        console.log('Architecto v0.1.0');
        break;
      default:
        if (!command) {
          printHelp();
        } else {
          console.error(`Unknown command: ${command}\n`);
          printHelp();
          process.exit(1);
        }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
Architecto v0.1 — AI-first declarative architecture protocol

Usage:
  architecto init [--force]              Initialize a new Architecto project
  architecto validate [--dir DIR]        Validate architecture specs

Options:
  --force                                Overwrite existing files during init
  --dir DIR                              Custom specs directory for validate (default: ./specs)
  --help, -h                             Show this help message
  --version, -v                          Show version

Examples:
  architecto init                        Create specs/ and ai/ in current directory
  architecto validate                    Validate all YAML specs in ./specs
  architecto validate --dir ./examples   Validate specs in custom directory

Learn more:
  https://github.com/ataztech910/architecto
`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
