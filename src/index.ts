import { getInput, info } from "@actions/core";
import { getOctokit } from "@actions/github";

interface Input {
  token: string;
  organization: string;
}

const getInputs = (): Input => {
  const result = {} as Input;
  result.token = getInput("github-token");
  result.organization = getInput("organization");
  if (!result.token || result.token === "") {
    throw new Error("github-token is required");
  }
  return result;
}

export const run = async (): Promise<void> => {
  const input = getInputs();
  const octokit = getOctokit(input.token);
  
  info(`Getting members of ${input.organization}`);
  const users = await octokit.paginate(octokit.rest.orgs.listMembers, {
    org: input.organization,
  });
  
  const since = new Date();
  since.setDate(since.getDate() - 90);
  const formattedSince = since.toISOString().slice(0, 10);

  for (const user of users) {
    const commits = await octokit.rest.search.commits({
      q: `author:${user.login} org:${input.organization} committer-date:<${formattedSince}`,
    });
    info(JSON.stringify(commits, null, 2));
  }
};

run();
