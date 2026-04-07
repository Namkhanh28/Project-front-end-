let entries = JSON.parse(localStorage.getItem("entries")) || [];
if (entries.length === 0) {
  entries = [
    { id: 1, name: "  Daily Journal " },
    { id: 2, name: " Work & Career " },
    { id: 3, name: " Personal Thoughts" },
    { id: 4, name: " Emotions & Feelings" },
  ];

  localStorage.setItem("entries", JSON.stringify(entries));
}

function openPopUp() {
  document.getElementById("popUp").style.display = "block";
}
function closePopUp() {
  document.getElementById("popUp").style.display = "none";
}
const renderData = () => {
  let table = document.getElementById("entries-article");
  table.innerHTML = "";
  entries.forEach((entry, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
   
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>
                 <button onclick="updateData(${index})" class="btn edit">Sửa</button>
                  <button onclicK="deleteEntries(${index})" class="btn delete">
                    Xóa
                  </button>
                </td>
              
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
let editIndex = null;
let newContent = document.getElementById("newContent");
let saveBtn = document.getElementById("update");

const updateData = (index) => {
  Swal.fire({
    title: "Bạn có chắc?",
    text: "Không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sửa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      editIndex = index;
      let entry = entries[index];
      openPopUp();
      newContent.value = entry.name;
      saveBtn.onclick = function () {
        let updatedValue = newContent.value.trim();
        if (updatedValue === "") {
          Swal.fire("Lỗi", "Không được để trống", "error");
          return;
        }
        entries[editIndex].name = updatedValue;
        localStorage.setItem("entries", JSON.stringify(entries));
        renderData();
        closePopUp();
        Swal.fire("Thành công", "Cập nhật thành công", "success");
      };
    }
  });
  
};
