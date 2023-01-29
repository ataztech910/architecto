interface IGitStrategy {
    getAuthToken(loginOrToken: string, password?: string): Promise<string>;
    createRepo(repoName: string): string;
}
 export { IGitStrategy };