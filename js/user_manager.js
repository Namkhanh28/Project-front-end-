let users = JSON.parse(localStorage.getItem("users")) || [];
if (users.length === 0) {
  users = [
    {
      id: 1,
      firstName: "Olivia",
      lastName: "Rhye",
      email: "olivia@gmail.com",
      status: "active",
    },
    {
      id: 2,
      firstName: "Phoenix",
      lastName: "Baker",
      email: "phoenix@gmail.com",
      status: "active",
    },
  ];
  localStorage.setItem("users", JSON.stringify(users));
}

const renderData = () => {
  let table = document.getElementById("userTable");
  table.innerHTML = "";
  users.forEach((user, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="user">
          <img src="https://i.pravatar.cc/40?img=${index + 1}" />
          <div>
            ${user.firstName} ${user.lastName}<br />
            <span class="username">${user.email}</span>
          </div>
        </div>
      </td>
      <td class="status">
        ${user.status || "active"}
      </td>
      <td>${user.email}</td>
      <td class="action">
        <a class="block">block</a>
        <a class="unblock">unblock</a>
      </td>
    `;

    table.appendChild(row);
  });
};
renderData();
