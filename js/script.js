/*
- Author: Eric M.
- Purpose: GitHub Repo Gallery Program
- Date: 11-NOV-2022 thru 12-NOV-2022
*/

//======================================
// ==== GitHub Repo Gallery Program ====
// =====================================

// ==================
// === variables ====
// ==================

// --- targeting .overview div: profile info goes here ---
const overview = document.querySelector(".overview");
const username = "lyolayale";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewRepos = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

// ===================
// ==== async fn ====
// ===================

const fetchGithub = async function (
  url = `https://api.github.com/users/${username}`
) {
  const res = await fetch(url);
  const data = await res.json();

  // ******** Delete when program is finished ********
  console.log(data);

  displayGithubInfo(data);
};

// --- this fn is linked to fetchGithub async fn

const displayGithubInfo = function (data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  overview.append(userInfo);

  userInfo.innerHTML = `
  <figure>
    <img src=${data.avatar_url}/>
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>
  `;
};

// ===================
// ==== async fn ====
// ===================

const fetchGithubRepos = async function (
  url = `https://api.github.com/users/${username}/repos?sort=update&per_page=100`
) {
  const res = await fetch(url);
  let data = await res.json();

  // ******** Delete when program is finished ********
  console.log(data);

  fetchRepoInfo(data);
};

// --- this fn is linked to fetchGithubRepos async fn

const fetchRepoInfo = function (repos) {
  filterInput.classList.remove("hide");
  for (let repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

// ========================
// ==== event listener ====
// ========================

// --- click on repo name ---

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    fetchSpecificRepoInfo(repoName);
  }
});

// --- async fn for repo name event listener ---

const fetchSpecificRepoInfo = async function (repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await res.json();
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  const languages = [];
  for (let lang in languageData) {
    languages.push(lang);
  }

  displaySpecificRepoInfo(repoInfo, languages);

  // ******** Delete when program is finished ********
  console.log(repoInfo);
  console.log(languages);
};

// --- fn for specific repo info event listener ---

const displaySpecificRepoInfo = function (repoInfo, lang) {
  repoData.innerHTML = "";

  const repoDiv = document.createElement("div");
  repoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${lang.join(", ")}</p>
    <a class="visit" href=${
      repoInfo.html_url
    } target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;

  repoData.append(repoDiv);

  repoData.classList.remove("hide");
  repos.classList.add("hide");
  viewRepos.classList.remove("hide");
};

// ========================
// ==== event listener ====
// ========================

// --- viewRepos event listener ---

viewRepos.addEventListener("click", function () {
  repos.classList.remove("hide");
  repoData.classList.add("hide");
  this.classList.add("hide");
});

// ========================
// ==== event listener ====
// ========================

// --- filterInput event listener ---

filterInput.addEventListener("input", function (e) {
  const inputValue = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerInputValue = inputValue.toLowerCase();

  for (let repo of repos) {
    const lowerTextRepo = repo.innerText.toLowerCase();

    if (lowerTextRepo.includes(lowerInputValue)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});

// ==== fetch data --> init program ====
// --- comment out due to rate limit --> GitHub API calls ---

fetchGithub();
fetchGithubRepos();
