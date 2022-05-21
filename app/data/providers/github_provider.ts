import { GithubRepository } from "~/data/repositories/github_repository/github_repository.server";
import { octokit } from "~/data/api/github_api.server";

const githubApiProvider = new GithubRepository(octokit);

export { githubApiProvider };
