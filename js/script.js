/*
- Author: Eric M.
- Purpose: GitHub Repo Gallery Program
- Date: 11-NOV-2022
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

// ===================
// ==== async fn ====
// ===================

const fetchGithub = async function (
  url = `https://api.github.com/users/${username}`
) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayGithubInfo(data);
};

// =============
// ==== fns ====
// =============

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
  console.log(data);
  fetchRepoInfo(data);
};

const fetchRepoInfo = function (repos) {
  for (let repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

// ==== fetch data ====

fetchGithub();
fetchGithubRepos();
