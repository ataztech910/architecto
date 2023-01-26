import fs from "fs";
import path from "path";

const getCurrentDirectoryBase = () => {
    return path.basename(process.cwd());
}

const directoryExists = (filePath: string) => {
    return fs.existsSync(filePath);
}

export { getCurrentDirectoryBase, directoryExists };