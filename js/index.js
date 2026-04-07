let articles = JSON.parse(localStorage.getItem("articles")) || [
  {
    id: 1,
    title: "Deadline đầu tiên của kỳ học",
    entries: "Nhật ký học tập",
    content:
      "Hôm nay mình vừa nộp xong bài tập lớn. Mệt nhưng thấy rất nhẹ nhõm!",
    mood: "Căng thẳng",
    status: "Riêng tư",
    image: "image1.jpg",
    date: "2025-02-23",
    userId: 1
  },
  {
    id: 2,
    title: "Cà phê chiều chủ nhật",
    entries: "Nhật ký trải nghiệm - học qua đời sống",
    content:
      "Ngồi một mình trong quán quen, nghe nhạc lofi và viết vài dòng nhật ký...",
    mood: "Thư giãn",
    status: "Công khai",
    image: "image2.jpg",
    date: "2025-03-15",
    userId: 1
  },
];

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
articles = articles.filter((article) => article.userId == currentUser.id);

let entries = JSON.parse(localStorage.getItem("entries")) || [
  { id: 1, name: "  Daily Journal " },
  { id: 2, name: " Work & Career " },
  { id: 3, name: " Personal Thoughts" },
  { id: 4, name: " Emotions & Feelings" },
];
function renderCategory(selectedValue = "") {
  let categorySelect = document.getElementById("category");
  categorySelect.innerHTML = `<option value="">-- Chọn chủ đề --</option>`;
  entries.forEach((cat) => {
    categorySelect.innerHTML += `
      <option value="${cat.name}" ${
        cat.name === selectedValue ? "selected" : ""
      }>
        ${cat.name}
      </option>
    `;
  });
}
renderCategory();

function openModel() {
  document.getElementById("page-layer").style.display = "block";
  document.querySelector(".shadow").style.display = "block";
}
function closeModel() {
  document.getElementById("page-layer").style.display = "none";
  document.querySelector(".shadow").style.display = "none";
}

function renderArticles() {
  const grid = document.querySelector(".article-grid");
  grid.innerHTML = "";
  articles.forEach((article) => {
    let card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      <img src="${article.image || "../assets/images/9ca412fa840de131974162b09d68033e23a850b5.jpg"}" alt="">
      <span class="date">${article.date}</span>
      <h3>${article.title}</h3>
      <p>${article.content}</p>
      <div id="repair">
        <span class="category">${article.category}</span>
        <button>Edit your post</button>
      </div>
    `;
    grid.appendChild(card);
  });
}
renderArticles();

document.querySelector(".submit-btn").addEventListener("click", () => {
  let title = document.getElementById("input-title").value.trim();
  let category = document.getElementById("category").value;
  let content = document.querySelector(".writing-blog textarea").value.trim();
  let image = document.getElementById("image").value;
  let status =
    document.querySelector("input[name='status']:checked")?.value || "public";

  if (!title || !category || !content || !image || !status) {
    Swal.fire("Lỗi", "Vui lòng nhập đầy đủ thông tin", "error");
    return;
  }

  let newArticle = {
    id: Date.now(),
    title,
    category,
    content,
    status,
    image,
    date: new Date().toISOString().split("T")[0],
    userId: JSON.parse(localStorage.getItem("currentUser")).id
  };

  articles.push(newArticle);
  localStorage.setItem("articles", JSON.stringify(articles));
  renderArticles();
  closeModel();
  document.getElementById("input-title").value = "";
  document.getElementById("input-category").value = "";
  document.querySelector(".writing-blog textarea").value = "";
  document.getElementById("status").value = "";
  document.getElementById("image").value = "";
});

function login() {
  document.getElementsByClassName(".login");
  window.location.href = "../html/login.html";
}

function signOut() {
  document.getElementsByClassName(".signout");
  Swal.fire({
    title: "Bạn có chắc?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Đăng xuất",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../html/login.html";
      Swal.fire("Đẵng xuất thành công ", "success");
    }
  });
}
signOut();