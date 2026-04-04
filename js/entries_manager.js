let entries = JSON.parse(localStorage.getItem("entries")) || [];
if (entries.length === 0) {
  entries = [
    {
      id: 1,
      name: "Nhật ký học tập",
    },
    {
      id: 2,
      name: "Nhật ký mục tiêu và kế hoạch",
    },
    {
      id: 3,
      name: "Nhật ký trải nghiệm - học qua đời sống",
    },
  ];

  localStorage.setItem("entries", JSON.stringify(entries));
}
const renderData = () => {
  let table = document.getElementById("entries-article");
  table.innerHTML = "";
  entries.forEach((entry, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
   <tr>
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>
                 <button onclick="updateData(${index})" class="btn edit">Sửa</button>
                  <button onclicK="deleteEntries(${index})" class="btn delete">
                    Xóa
                  </button>
                </td>
              </tr>
    `;
    table.appendChild(row);
  });
};
renderData();

let editData = document.getElementsByClassName("btn edit");
let deleteData = document.getElementsByClassName("btn delete");
let inputEntries = document.getElementById("input-entries");
let addBtn = document.getElementById("add-btn");

const addEntries = () => {
  let newEntries = inputEntries.value.trim();
  if (newEntries === "") {
    Swal.fire("Lỗi", "Hãy điền đủ thông tin", "error");
    return;
  }
  newEntries = {
    id: Date.now(),
    name: newEntries,
  };
  entries.push(newEntries);
  localStorage.setItem("entries", JSON.stringify(entries));
  renderData(newEntries);
  inputEntries.value = "";
};

const deleteEntries = (index) => {
  Swal.fire({
    title: "Bạn có chắc?",
    text: "Không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      entries.splice(index, 1);
      localStorage.setItem("entries", JSON.stringify(entries));
      renderData();
    }
  });
};

const updateData = () => {
  Swal.fire({
    title: "Bạn có chắc?",
    text: "Không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sửa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      let item = entries.find((e) => e.id === id);
      
    }
  });
};
