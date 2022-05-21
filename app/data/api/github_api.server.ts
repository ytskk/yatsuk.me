import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = "ytskk";
const repo = "yatsuk.me";

export { octokit, owner, repo };
