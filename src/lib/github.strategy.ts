import { IGitStrategy } from "types/git.models.ts";
import { createTokenAuth } from "@octokit/auth-token";
import clui from "clui";
import inquirer from "inquirer";


const getTwoFactorAuthenticationCode = () => {
    return inquirer.prompt({
      name: 'twoFactorAuthenticationCode',
      type: 'input',
      message: 'Enter your two-factor authentication code:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your two-factor authentication code.';
        }
      }
    });
};

class GitHubStrategy implements IGitStrategy {
    async getAuthToken(login: string): Promise<string> {
        const { Spinner } = clui;
        const status = new Spinner('Authenticating you, please wait...');
        status.start();
        const auth = createTokenAuth(login);

          try {
            const res: Partial<any> = await auth();
      
            if(res.token) {
              return res.token;
            } else {
              throw new Error("GitHub token was not found in the response");
            }
          } finally {
            status.stop();
          }
    }
    createRepo(repoName: string): string {
        throw new Error("Method not implemented.");
    }
    
}

export default GitHubStrategy;