import { appendFile } from "fs";

import timeToString from "./timetostring";

class Logger {
    logFile: string;
    level: number = 2;
    colorData = {
        RESET: "\x1b[0m",
        BLACK: "\x1b[30m",
        RED: "\x1b[31m",
        GREEN: "\x1b[32m",
        YELLOW: "\x1b[33m",
        BLUE: "\x1b[34m",
        MAGENTA: "\x1b[35m",
        CYAN: "\x1b[36m",
        WHITE: "\x1b[37m",
    };
    levelNumber = {
        DEBUG: 1,
        WARNING: 2,
        INFO: 3,
    };

    constructor(logFile: string) {
        this.logFile = logFile;
    }

    async setLevel(level: string) {
        this.level = this.levelNumber[level.toUpperCase()];
        if (this.level === 1) {
            await this.warn("Log level is set to DEBUG");
        }
    }

    formatLog(level: string, content: string, color?: string) {
        return `${color ?? ""}[${level.toUpperCase()}]${
            color ? this.colorData.RESET : ""
        } ${content}`;
    }

    async fileLog(level: string, content: string) {
        await appendFile(
            this.logFile,
            `${this.formatLog(level, content)} (${timeToString(Date.now())})\n`,
            () => null
        );
    }

    async log(level: string, content: string, color?: string) {
        if (this.levelNumber[level.toUpperCase()] >= this.level) {
            console.log(this.formatLog(level, content, color));
            await this.fileLog(level, content);
        }
    }

    async info(content: string) {
        await this.log("info", content, this.colorData.GREEN);
    }

    async error(content: string) {
        await this.log("error", content, this.colorData.RED);
    }

    async warn(content: string) {
        await this.log("warn", content, this.colorData.YELLOW);
    }

    async debug(content: string) {
        await this.log("debug", content, this.colorData.BLUE);
    }
}

export default new Logger(config.logFile);
