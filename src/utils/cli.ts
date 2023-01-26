const clearCLI = () => {
    process.stdout.write('\x1b[2J');
}

export { clearCLI };