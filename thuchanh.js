let students = [
  ["SV001", "Nguyễn Văn A", "abc@gmail.com", "0355914029", "Hà Nội", "Male"],
];
let action = "create";
function renderdata() {
  let tbody = document.getElementById("content");
  tbody.innerHTML = "";
  for (let index = 0; index < students.length; index++) {
    tbody.innerHTML += `<tr>
                            <td>${index + 1}</td>
                            <td>${students[index][0]}</td>
                            <td>${students[index][1]}</td>
                            <td>${students[index][2]}</td>
                            <td>${students[index][3]}</td>
                            <td>${students[index][4]}</td>
                            <td>${students[index][5]}</td>
                            <td>
                                <button onclick="editStudent('${
                                  students[index][0]
                                }')">Edit</button>
                                <button onclick="deleteStudent('${
                                  students[index][0]
                                }')">Delete</button>
                            </td>
                        </tr>`;
  }
}
function validataForm() {
  let nameId = document.getElementById("nameId").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let sex = document.querySelector("input[name='sex']:checked").value;
  let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (nameId == "") {
    alert("Vui lòng nhập ID");
    return false;
  }
  let index = getNameByNameID(nameId);
  if (index >= 0) {
    alert("Mã sinh viên đã tồn tại, vui lòng nhập lại");
    return false;
  }
  if (name == "") {
    alert("Vui lòng nhập Tên");
    return false;
  }
  if (!email.match(emailregex)) {
    alert("Vui lòng nhập đúng định dạng Email");
    return false;
  }
  if (!phone.match(phoneRegex)) {
    alert("Vui lòng nhập đúng định dạng sdt Việt Nam");
    return false;
  }
  if (address == "") {
    alert("Vui lòng nhập địa chỉ");
    return false;
  }
  return true;
}
function createOrdit() {
  if (validataForm()) {
    let nameId = document.getElementById("nameId").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let sex = document.querySelector("input[name='sex']:checked").value;
    if (action == "create") {
      students.push([nameId, name, email, phone, address, sex, action]);
    } else {
      let index = getNameByNameID(nameId);
      students[index][1] = name;
      students[index][2] = email;
      students[index][3] = phone;
      students[index][4] = address;
      students[index][5] = sex;
      document.getElementById("nameId").ReadOnly = false;
    }
    document.getElementById("nameId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("nam").checked = true;
    renderdata();
  }
}
function getNameByNameID(nameId) {
  for (let index = 0; index < students.length; index++) {
    if (nameId == students[index][0]) {
      return index;
    }
  }
  return -1;
}

function editStudent(nameId) {
  // 1. Lấy chỉ số sinh viên trong mảng
  let index = getNameByNameID(nameId);
  if (index >= 0) {
    // 2. fill thông tin sinh viên ra form
    document.getElementById("nameId").value = students[index][0];
    document.getElementById("name").value = students[index][1];
    document.getElementById("email").value = students[index][2];
    document.getElementById("phone").value = students[index][3];
    document.getElementById("address").value = students[index][4];
    if (students[index][5] == "Male") {
      document.getElementById("nam").checked = true;
    } else {
      document.getElementById("nu").checked = true;
    }
    // Đổi action = edit
    action = "edit";
    // Để studentId thành readOnly
    document.getElementById("nameId").readOnly = true;
  }
}
function deleteStudent(nameId) {
  let index = getNameByNameID(nameId);
  students.splice(index, 1);
  renderdata();
}
document.onload = renderdata();
let savebtn = document.getElementById("savebtn");
savebtn.addEventListener("click", function (event) {
  event.preventDefault();
  createOrdit();
});
