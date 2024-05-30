const studentList = document.getElementById('student-list-body');
const addStudentForm = document.getElementById('add-student-form');

// read data from localStorage
const storedStudents = localStorage.getItem('students');
let students = storedStudents? JSON.parse(storedStudents) : [];

// display student list
students.forEach((student) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${student.fullName}</td>
        <td>${student.studentNumber}</td>
        <td>${student.dateOfBirth}</td>
        <td>${student.class}</td>
        <td>
            <button class="edit-button">Sửa</button>
            <button class="delete-button">Xóa</button>
        </td>
    `;
    studentList.appendChild(row); 
});

// add event listener to add student form
addStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('full-name').value;
    const studentNumber = document.getElementById('student-number').value;
    const dateOfBirth = document.getElementById('date-of-birth').value;
    const classValue = document.getElementById('class').value;

    const newStudent = {
        fullName,
        studentNumber,
        dateOfBirth,
        class: classValue,
    };

    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    // clear form fields
    document.getElementById('full-name').value = '';
    document.getElementById('student-number').value = '';
    document.getElementById('date-of-birth').value = '';
    document.getElementById('class').value = '';

    // update student list
    studentList.innerHTML = '';
    students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.fullName}</td>
            <td>${student.studentNumber}</td>
            <td>${student.dateOfBirth}</td>
            <td>${student.class}</td>
            <td>
                <button class="edit-button">Sửa</button>
                <button class="delete-button">Xóa</button>
            </td>
        `;
        studentList.appendChild(row);
    });
});

studentList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-button')) {
        const row = e.target.parentElement.parentElement;
        const fullName = row.children[0].innerText;
        const studentNumber = row.children[1].innerText;
        const dateOfBirth = row.children[2].innerText;
        const classValue = row.children[3].innerText;

        // create a popup div
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
            <h2>Edit Student</h2>
            <label for="full-name">Họ và tên:</label>
            <input type="text" id="ten" value="${fullName}">
            <br>
            <label for="student-number">Mã sinh viên:</label>
            <input type="text" id="msv" value="${studentNumber}">
            <br>
            <label for="date-of-birth">Ngày sinh:</label>
            <input type="date" id="ngaySinh" value="${dateOfBirth}">
            <br>
            <label for="class">Lớp:</label>
            <input type="text" id="lop" value="${classValue}">
            <br>
            <button id="update-button">Update</button>
        `;

        // add the popup to the body
        document.body.appendChild(popup);

        // add an event listener to the update button
        document.getElementById('update-button').addEventListener('click', (e) => {
            const fullName = document.getElementById('ten').value;
            const studentNumber = document.getElementById('msv').value;
            const dateOfBirth = document.getElementById('ngaySinh').value;
            const classValue = document.getElementById('lop').value;

            // update the student data
            const studentIndex = Array.prototype.indexOf.call(studentList.children, row);
            students[studentIndex] = {
                fullName,
                studentNumber,
                dateOfBirth,
                class: classValue,
            };
            localStorage.setItem('students', JSON.stringify(students));
            studentList.innerHTML = '';
            students.forEach((student) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.fullName}</td>
                    <td>${student.studentNumber}</td>
                    <td>${student.dateOfBirth}</td>
                    <td>${student.class}</td>
                    <td>
                        <button class="edit-button">Edit</button>
                        <button class="delete-button">Delete</button>
                    </td>
                `;
                studentList.appendChild(row);
            });
            // close the popup
            popup.remove();
        });
    } else if (e.target.classList.contains('delete-button')) {
        const studentIndex = Array.prototype.indexOf.call(studentList.children, e.target.parentNode.parentNode);
        students.splice(studentIndex, 1);
        localStorage.setItem('students', JSON.stringify(students));
        studentList.innerHTML = '';
        students.forEach((student) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.fullName}</td>
                <td>${student.studentNumber}</td>
                <td>${student.dateOfBirth}</td>
                <td>${student.class}</td>
                <td>
                    <button class="edit-button">Sửa</button>
                    <button class="delete-button">Xóa</button>
                </td>
            `;
            studentList.appendChild(row);
        });
    }
});