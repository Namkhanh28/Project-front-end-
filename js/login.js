
let data = localStorage.getItem("users");
if (!data) {
  let defaultUsers = [
    {
      id: 0,
      firstname: "admin",
      lastname: "server",
      email: "admin01@gmail.com",
      password: "admin345",
      role: "admin",
    },
    {
      id: 1,
      firstname: "Lê",
      lastname: "Minh Thu",
      email: "minhthu@gmail.com",
      password: "123456",
      role: "user",
    },
  ];
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}
let users = JSON.parse(localStorage.getItem("users")) || [];

if (users.length === 0) {
  Swal.fire("Chưa có tài khoản", "Hãy đăng ký trước", "warning").then(() => {
    window.location.href = "./register.html";
  });
}

let form = document.getElementById("loginForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  if (!email || !password) {
    Swal.fire("Lỗi", "Vui lòng nhập đầy đủ thông tin", "error");
    return;
  }

  if (!email.includes("@gmail.com")) {
    Swal.fire("Lỗi", "Email phải có @gmail.com", "error");
    return;
  }
  let user = users.find(function (u) {
    return u.email === email && u.password === password;
  });

  if (!user) {
    Swal.fire("Lỗi", "Email hoặc mật khẩu không đúng", "error");
    return;
  }
  localStorage.setItem("currentUser", JSON.stringify(user));

  Swal.fire({
    title: "Đăng nhập thành công!",
    icon: "success",
  }).then(function () {
    if (user.role === "admin") {
      window.location.href = "./user_manager.html";
    } else {
      window.location.href = "../index.html"; 
    }
  });
});
