import { IGitStrategy } from "../types/git.models.js";

class GitContext {
    private strategy: IGitStrategy;

    constructor(strategy: IGitStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: IGitStrategy) {
        this.strategy = strategy;
    }

    public async auth(loginOrToken: string, password?: string): Promise<string> {
        return this.strategy.getAuthToken(loginOrToken, password)
    }
}

export default GitContext;