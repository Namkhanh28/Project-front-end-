let form = document.getElementsByClassName("form-box");
let registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (firstName === "" || lastName === "") {
    Swal.fire("Lỗi", "Không được để trống họ tên", "error");
    return;
  }
  if (email === "") {
    Swal.fire("Lỗi", "Email không được để trống", "error");
    return;
  }
  if (!email.includes("@gmail.com")) {
    Swal.fire("Lỗi", "Email phải có đuôi @gmail.com", "error");
    return;
  }
  if (password.length < 6) {
    Swal.fire("Lỗi", "Mật khẩu phải >= 6 ký tự", "error");
    return;
  }

  if (password !== confirmPassword) {
    Swal.fire("Lỗi", "Mật khẩu không khớp", "error");
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];
  
  let exist = users.find(function (user) {
    return user.email === email;
  });

  if (exist) {
    Swal.fire("Lỗi", "Email đã tồn tại", "error");
    return;
  }
  let user = {
    id: Date.now(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: "user",
  };
  if (password === "admin345" && email === "admin01@gmail.com") {
    user.role = "admin";
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  Swal.fire({
    title: "Thành công",
    text: "Tạo tài khoản thành công!",
    icon: "success",
    confirmButtonText: "OK",
  }).then(function () {
    window.location.href = "../html/login.html";
  });
});
