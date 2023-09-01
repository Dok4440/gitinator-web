// script.js

const gitInfoElement = document.getElementById('git-info');

// Use AJAX to fetch Git information from the server
fetch('/get-git-info') // Endpoint to your server-side script
    .then(response => response.json())
    .then(data => {
        if (data) {
            const {repository, branch, commit} = data;
            // gitInfoElement.textContent = `${repository} | Branch: ${branch} | Commit: ${commit}`;
            gitInfoElement.textContent = `${branch} | ${commit}`;
        } else {
            gitInfoElement.textContent = 'Git info unavailable';
        }
    })
    .catch(error => {
        console.error('Error fetching Git info:', error);
        gitInfoElement.textContent = 'Git info unavailable';
    });
