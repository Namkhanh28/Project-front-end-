
let articles = JSON.parse(localStorage.getItem("articles")) || [
    {
        "id": 1,
        "title": "Deadline đầu tiên của kỳ học",
        "entries": "Nhật ký học tập",
        "content": "Hôm nay mình vừa nộp xong bài tập lớn. Mệt nhưng thấy rất nhẹ nhõm!",
        "mood": "Căng thẳng",
        "status": "Riêng tư",
        "image": "image1.jpg",
        "date": "2025-02-23"
    },
    {
        "id": 2,
        "title": "Cà phê chiều chủ nhật",
        "entries": "Nhật ký trải nghiệm - học qua đời sống",
        "content": "Ngồi một mình trong quán quen, nghe nhạc lofi và viết vài dòng nhật ký...",
        "mood": "Thư giãn",
        "status": "Công khai",
        "image": "image2.jpg",
        "date": "2025-03-15"
    }
];
let table = document.getElementById("articleTable");
let modal = document.getElementById("modal");

let openBtn = document.getElementById("openModal");
let closeBtn = document.getElementById("closeModal");
let addBtn = document.getElementById("addContent");

let titleInput = document.getElementById("title");
let categoryInput = document.getElementById("category");
let contentInput = document.getElementById("content");
let statusInput = document.getElementById("status");

// ===== RENDER =====
function render() {
  table.innerHTML = "";

  articles.forEach(function (article, index) {
    let statusClass =
      article.status === "Public" ? "status-public" : "status-private";

    table.innerHTML += `
      <tr>
        <td><img class="thumb" src="https://picsum.photos/10${index}" /></td>
        <td>${article.title}</td>
        <td>${article.category}</td>
        <td>${article.content}</td>
        <td><span class="${statusClass}">${article.status}</span></td>
        <td>
          <select onchange="changeStatus(${index}, this.value)">
            <option ${article.status === "Public" ? "selected" : ""}>Public</option>
            <option ${article.status === "Private" ? "selected" : ""}>Private</option>
          </select>
        </td>
        <td>
          <button class="btn delete" onclick="deleteArticle(${index})">Xóa</button>
        </td>
      </tr>
    `;
  });
}

// ===== ADD =====
addBtn.onclick = function () {
  let title = titleInput.value.trim();
  let category = categoryInput.value.trim();
  let content = contentInput.value.trim();
  let status = statusInput.value;

  if (!title || !category || !content) {
    alert("Không được để trống!");
    return;
  }

  let newArticle = {
    id: Date.now(),
    title: title,
    category: category,
    content: content,
    status: status,
  };

  articles.push(newArticle);

  localStorage.setItem("articles", JSON.stringify(articles));

  render();
  closeModal();
  resetForm();
};

// ===== DELETE =====
function deleteArticle(index) {
  if (confirm("Bạn có chắc muốn xóa?")) {
    articles.splice(index, 1);
    localStorage.setItem("articles", JSON.stringify(articles));
    render();
  }
}

// ===== CHANGE STATUS =====
function changeStatus(index, value) {
  articles[index].status = value;
  localStorage.setItem("articles", JSON.stringify(articles));
  render();
}

// ===== MODAL =====
openBtn.onclick = function () {
  modal.style.display = "block";
};

closeBtn.onclick = function () {
  closeModal();
};

function closeModal() {
  modal.style.display = "none";
}

// ===== RESET FORM =====
function resetForm() {
  titleInput.value = "";
  categoryInput.value = "";
  contentInput.value = "";
}

// ===== LOAD =====
render();