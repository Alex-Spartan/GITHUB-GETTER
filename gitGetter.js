const prompt = require('prompt-sync')();
const apiURL = "https://api.github.com/users";

/* 
1. take username
2. display - html_url, followers, following
    repos link: Name, html_url, created_at, updated_at, language
3. end the program
*/
let getUser = async () => {
    let userName = prompt("Enter the username: ");

    let html_link = await fetch(apiURL + `/${userName}`);
    let res = await html_link.json();

    console.log("USERNAME: " + res.login);
    console.log("ACCOUNT LINK: " + res.html_url);
    console.log("NO. OF PUBLIC REPOS: " + res.public_repos);
    console.log("REPOSITORIES LINK: " + res.repos_url);

    console.log("FOLLOWERS: " + res.followers);
    console.log("FOLLOWING: " + res.following);
    console.log("CREATED ON: " + res.created_at);
    console.log("UPDATED ON: " + res.updated_at + "\n");

    console.log("Enter: 1: repo links \t 0: exit")

    let num = parseFloat(prompt("Type: "));
    if (num == 1) {
        const repoLink = await fetch(apiURL + `/${userName}/repos`);
        const repoRes = await repoLink.json();
        let repoLength = repoRes.length;

        let i = 0

        let getNext = () => {
            while (i <= repoLength) {
                console.log(i);
                console.log("REPO NAME: " + repoRes[i].name);
                console.log("REPO LINK: " + repoRes[i].html_url);
                console.log("CREATED ON: " + repoRes[i].created_at);
                console.log("UPDATED ON: " + repoRes[i].updated_at);
                console.log("PUSHED ON: " + repoRes[i].pushed_at + "\n");
                i++;
                if (i % 5 === 0) break
                console.log("run")
            }
        }
        getNext();
        console.log("1: Next 5 repo\t0: exit")
        let showNext = prompt("Type: ");
        if (showNext == 1) {
            getNext();
        } else return null;
    }

}

getUser();
