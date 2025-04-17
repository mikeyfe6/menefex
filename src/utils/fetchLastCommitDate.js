const axios = require("axios");

const excludedPaths = [
    "src/pages/offline-plugin-app-shell-fallback.jsx",
    "src/pages/blog/differentieer-jouw-business.jsx",
    "src/pages/blog/haal-meer-uit-jouw-web-product.jsx",
    "src/pages/blog/van-wordpress-naar-fully-code.jsx",
    "src/pages/blog/seo-onmisbare-tool.jsx",
    "src/pages/blog/verschillen-webapplicatie-en-website.jsx",
    "src/pages/blog/lancering-afrodiasphere.jsx",
    "src/pages/blog/officieel-afscheid-nieuw-voorkomen.jsx",
    "src/pages/topics/informatie.jsx",
    "src/pages/topics/de-beste-van.jsx",
    "src/pages/topics/op-reis.jsx",
    "src/pages/topics/doe-het-zelf.jsx",
    "src/pages/topics/progressie.jsx",
    "src/pages/topics/nieuws.jsx",
    "src/pages/topics/search-engine-optimization.jsx",
    "src/pages/topics/interne-projecten.jsx",
    "src/pages/topics/tips-en-weetjes.jsx",
    "src/pages/topics/vergelijken.jsx",
];

const fetchLastCommitDate = async (filePath) => {
    const githubToken = process.env.GATSBY_GITHUB_TOKEN;
    const repoOwner = "mikeyfe6";
    const repoName = "menefex";

    if (excludedPaths.includes(filePath)) {
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
