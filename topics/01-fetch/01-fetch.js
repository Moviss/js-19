'use strict';

console.clear();

const fetchUsersBtn = document.querySelector('.btn');
const userList = document.querySelector('.user-list');

const searchParams = new URLSearchParams({
  _limit: 5,
  _sort: "name"
});

function fetchUsers () {
  return fetch(`https://jsonplaceholder.typicode.com/users?${searchParams}`).
    then((response) => {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return response.json();
    });
}

function renderUserList (users) {
  const markup = users.map((user) => {
    return `
        <li>
            <p><b>Name</b>: ${user.name}</p>
            <p><b>Email</b>: ${user.email}</p>
            <p><b>Company</b>: ${user.company.name}</p>
        </li>
      `;
  }).join('');
  userList.innerHTML = markup;
}

fetchUsersBtn.addEventListener("click", () => {
  fetchUsers()
    .then((users) => renderUserList(users))
    .catch((error) => console.log(error));
});
