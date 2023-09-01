// git-info.js

const {execSync} = require('child_process');

function getGitInfo() {
    try {
        const repository = execSync('git config --get remote.origin.url', {encoding: 'utf8'}).trim();
        const branch = execSync('git branch --show-current', {encoding: 'utf8'}).trim();
        const commit = execSync('git log --pretty=%h -n 1', {encoding: 'utf8'}).trim();

        return {
            repository,
            branch,
            commit,
        };
    } catch (error) {
        return null;
    }
}

module.exports = getGitInfo;
