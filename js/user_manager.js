let users = JSON.parse(localStorage.getItem("users")) || [];
if (users.length === 0) {
  users = [
    {
      id: 1,
      firstname: "Olivia",
      lastname: "Rhye",
      email: "olivia@gmail.com",
      status: "active",
    },
    {
      id: 2,
      firstname: "Phoenix",
      lastname: "Baker",
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
        <div class="user">
          <img src="https://i.pravatar.cc/40?img=1" />
          <div>
            ${users.firstname + " " + users.lastname}<br />
            <span class="username">${user.email}</span>
          </div>
        </div>
      </td>
      <td class="status">
        ${user.status || (user.role === "admin" ? "admin" : "user")}
      </td>
      <td>${user.email}</td>
      <td class="action">
        <a class="block">block</a>
        <a class="unblock">unblock</a>
      
    `;
    table.appendChild(row);
  });
};
renderData();
