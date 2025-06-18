const axios = require("axios");

const excludedPages = [
    "src/pages/topics/",
    "src/pages/blog/",
    "src/pages/offline-plugin-app-shell-fallback.jsx",
    "src/pages/404.html.jsx",
];

const isExcluded = (filePath) =>
    excludedPages.some((page) => filePath.startsWith(page));

const fetchLastCommitDate = async (filePath) => {
    const githubToken = process.env.GATSBY_GITHUB_TOKEN;
    const repoOwner = "mikeyfe6";
    const repoName = "menefex";

    if (isExcluded(filePath)) {
        console.warn(`Skipping commit check for excluded path: ${filePath}`);
        return null;
    }

    try {
        const response = await axios.get(
            `https://api.github.com/repos/${repoOwner}/${repoName}/commits`,
            {
                params: {
                    path: filePath,
                    per_page: 1,
                },
                headers: {
                    Authorization: `token ${githubToken}`,
                },
            }
        );

        if (response.data.length === 0) {
            console.warn(`No commits found for path: ${filePath}`);
            return null;
        }

        const lastCommitDate = response.data[0].commit.committer.date;
        return lastCommitDate;
    } catch (error) {
        console.error(`Error fetching last commit date: ${error.message}`);
        return null;
    }
};

module.exports = fetchLastCommitDate;
