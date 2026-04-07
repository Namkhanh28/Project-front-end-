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
  },
];

function getRecentArticle(days = 30) {
  let today = new Date();
  return articles.filter((article) => {
    let articleDay = new Date(article.date);
    let diffTime = today - articleDay;
    let diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  });
}

function getRecentArticles(days = 30) {
  let today = new Date();

  return articles.filter((article) => {
    let articleDay = new Date(article.date);
    let diffDays = (today - articleDay) / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  });
}

function renderRecentBlogs() {
  let container = document.querySelector(".blog-container");
  container.innerHTML = "";
  let recent = getRecentArticles(30);
  recent.forEach((article) => {
    let html = `
      <div class="blog-card">
        <img src="${article.image}" />
        <div class="blog-content">
          <div class="blog-date">${article.date}</div>
          <div class="blog-title">${article.title}</div>
          <div class="blog-text">${article.content}</div>
          <div class="blog-category">${article.entries}</div>
        </div>
      </div>
    `;

    container.innerHTML += html;
  });
}
function renderAllBlogs(data = articles) {
  let container = document.querySelector(".list");
  container.innerHTML = "";

  data.forEach((article) => {
    let html = `
      <div class="card">
        <img src="${article.image}" />
        <div class="date">Date: ${article.date}</div>
        <div class="title">${article.title}</div>
        <div class="desc">${article.content}</div>
        <div class="category">${article.entries}</div>
      </div>
    `;

    container.innerHTML += html;
  });
}
function filterByCategory(category) {
  let filtered = articles.filter(
    (article) => article.entries.trim() === category.trim(),
  );

  renderAllBlogs(filtered);
}
function nextPage() {
  document.getElementById("plus");
  window.location.href = "../index.html";
}
document.getElementById("category1").onclick = () =>
  filterByCategory("Daily Journal");

document.getElementById("category2").onclick = () =>
  filterByCategory("Work & Career");

document.getElementById("category3").onclick = () =>
  filterByCategory("Personal Thoughts");

document.getElementById("category4").onclick = () =>
  filterByCategory("Emotions & Feelings");

renderRecentBlogs();
renderAllBlogs();
