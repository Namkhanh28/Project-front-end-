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
    userId:1,
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
    userId:1
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

let editIndex = null;

let titleInput = document.getElementById("title");
let categoryInput = document.getElementById("category");
let contentInput = document.getElementById("content");
let statusInput = document.getElementById("status");
let imgInput = document.getElementById("upfile");
let addBtn = document.getElementById("addContent");

function openModel() {
  document.getElementById("model").style.display = "flex";
  renderCategory();
}

function closeModel() {
  document.getElementById("model").style.display = "none";
  resetForm();
}

function resetForm() {
  titleInput.value = "";
  categoryInput.value = "";
  contentInput.value = "";
  statusInput.value = "public";
  imgInput.value = "";
  editIndex = null;

  addBtn.innerText = "Add";
  addBtn.onclick = addArticle;
}

function render() {
  let table = document.getElementById("articleTable");
  table.innerHTML = "";
  articles.forEach((article, index) => {
    let statusClass =
      article.status === "public" ? "status-public" : "status-private";

    let row = document.createElement("tr");

    row.innerHTML = `
      <td><img class="thumb" src="${article.image}" /></td>
      <td>${article.title}</td>
      <td>${article.category}</td>
      <td>${article.content}</td>
      <td><span class="${statusClass}">${article.status}</span></td>
      <td>
        <select onchange="changeStatus(${index}, this.value)">
          <option value="public" ${article.status === "public" ? "selected" : ""}>Public</option>
          <option value="private" ${article.status === "private" ? "selected" : ""}>Private</option>
        </select>
      </td>
      <td class="option">
        <button class="btn edit" onclick="editArticle(${index})">Sửa</button>
        <button class="btn delete" onclick="deleteArticle(${index})">Xóa</button>
      </td>
    `;

    table.appendChild(row);
  });
}

render();
function addArticle() {
  let newTitle = titleInput.value.trim();
  let newCategory = categoryInput.value;
  let newContent = contentInput.value.trim();
  let newStatus = statusInput.value;
  let newImage = imgInput.value;
  if (!newTitle || !newCategory || !newContent) {
    Swal.fire("Lỗi", "Hãy nhập đầy đủ thông tin", "error");
    return;
  }
  if (editIndex !== null) {
    articles[editIndex] = {
      ...articles[editIndex],
      title: newTitle,
      category: newCategory,
      content: newContent,
      status: newStatus,
      image: newImage,
    };

    Swal.fire("Thành công", "Cập nhật thành công", "success");
  } else {
    let newArticle = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      content: newContent,
      status: newStatus,
      image: newImage,
      date: new Date().toISOString().split("T")[0],
      userId: JSON.parse(localStorage.getItem("currentUser")).id,
    };
    articles.push(newArticle);
    Swal.fire("Thành công", "Thêm bài viết thành công", "success");
  }
  localStorage.setItem("articles", JSON.stringify(articles));
  render();
  closeModel();
}

function editArticle(index) {
  let article = articles[index];
  editIndex = index;
  openModel();
  titleInput.value = article.title;
  categoryInput.value = article.category;
  contentInput.value = article.content;
  statusInput.value = article.status;
  imgInput.value = article.image;
  renderCategory(article.category);
  addBtn.innerText = "Update";
}

function deleteArticle(index) {
  Swal.fire({
    title: "Bạn có chắc?",
    text: "Không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      articles.splice(index, 1);
      localStorage.setItem("articles", JSON.stringify(articles));
      render();
      Swal.fire("Đã xóa!", "Bài viết đã được xóa", "success");
    }
  });
}

function changeStatus(index, newStatus) {
  articles[index].status = newStatus;
  localStorage.setItem("articles", JSON.stringify(articles));
  render();
}
