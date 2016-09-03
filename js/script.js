/**
 * Created by Niki Skaarup
 */


var students = [
    {
        id: 1,
        name: "John Doe",
        email: "johnd@mail.com",
        phone: "987654321",
        level: 1,
        group: 1
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "janed@mail.com",
        phone: "12346789",
        level: 2,
        group: 2
    },
    {
        id: 3,
        name: "IceCream",
        email: "icecream@mail.com",
        phone: "65784930",
        level: 2,
        group: 1
    }
];

var levels = [
    {
        id: 1,
        name: "Red"
    },
    {
        id: 2,
        name: "Yellow"
    },
    {
        id: 3,
        name: "Green"
    }
];

var groups = [
    {
        id: 1,
        name: "The Best Group"
    },
    {
        id: 2,
        name: "The Lazy Group"
    }
];

// Data above
// Used by all below

var getIndex = function (array, id) {
    if (typeof id !== Number)
        id = parseInt(id);

    for (var i = 0; i < array.length; i++) {
        if (array[i].id === id)
            return i;
    }
    return -1; // return -1 like the indexOf Method for consistency.
};

var generateId = function (array) {
    var nextId = 1;
    for (var i = 0; i < array.length; i++) {
        if (array[i].id >= nextId)
            nextId = array[i].id + 1;
    }
    return nextId;
};

var generateButtonGroup = function (array, i, deleteFunc, editFunc) {
    var btnDelete = document.createElement("button");
    btnDelete.setAttribute("class", "btn btn-danger");
    btnDelete.innerText = "D";
    btnDelete.onclick = (function () {
        var index = i;
        return function () {
            array.splice(index, 1);
            console.log(index + ": Deleted");
            deleteFunc();
        }
    })();
    var btnEdit = document.createElement("button");
    btnEdit.setAttribute("class", "btn btn-warning");
    btnEdit.innerText = "E";
    btnEdit.onclick = (function () {
        var index = i;
        return function () {
            editFunc(index);
            console.log(index + ": Editing");
        }
    })();

    var btnGroup = document.createElement("div");
    btnGroup.setAttribute("class", "btn-group btn-group-sm");
    btnGroup.appendChild(btnDelete);
    btnGroup.appendChild(btnEdit);

    return btnGroup;
};

// Used by all above
// Level below

var studentLevelSelect = $("#studentLevel");
var populateStudentLevels = function () {
    studentLevelSelect.innerHTML = "<option selected>Level</option>";
    for (var i = 0; i < levels.length; i++)
        insertOption(studentLevelSelect, levels[i].id, levels[i].name);
};

var rePopulateStudentLevels = function () {
    studentLevelSelect.innerHTML = "";
    populateStudentLevels();
};

var getLevel = function (id) {
    for (var i = 0; i < levels.length; i++) {
        if (levels[i].id === id)
            return levels[i].name;
    }
};

// Level above
// Group below

var studentGroupSelect = $("#studentGroup");
var populateStudentGroups = function () {
    studentGroupSelect.innerHTML = "<option selected>Group</option>";
    for (var i = 0; i < groups.length; i++)
        insertOption(studentGroupSelect, groups[i].id, groups[i].name);
};

var rePopulateStudentGroups = function () {
    studentGroupSelect.innerHTML = "";
    populateStudentGroups();
};

var getGroup = function (id) {
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].id === id)
            return groups[i].name;
    }
};

// Group above
// Level & Group below

// "<option value='" + id + "'>" + name + "</option>"
var insertOption = function (select, id, name) {
    var opt = document.createElement('option');
    opt.value = id;
    opt.innerText = name;
    select.appendChild(opt);
};

// Level & Group above
// Student Below

var sd = $("#studentsData");
var populateStudentsData = function () {
    for (var i = 0; i < students.length; i++) {
        var student = {};
        student.id = students[i].id;
        student.name = students[i].name;
        student.email = students[i].email;
        student.phone = students[i].phone;
        student.level = students[i].level;
        student.group = students[i].group;
        insertStudent(student, i);
    }
};

var rePopulateStudentsData = function () {
    sd.innerHTML = "";
    populateStudentsData();
};

var insertStudent = function (student, i) {
    var row = sd.insertRow();
    row.insertCell(0).innerText = student.id;
    row.insertCell(1).innerText = student.name;
    row.insertCell(2).innerText = student.email;
    row.insertCell(3).innerText = student.phone;
    row.insertCell(4).innerText = getLevel(student.level);
    row.insertCell(5).innerText = getGroup(student.group);
    row.insertCell(6).appendChild(generateButtonGroup(students, i, deleteStudent, getEditStudent));
};

var deleteStudent = function (i) {
    if (i > -1) {
        students.splice(i, 1);
    }
    rePopulateStudentsData();
};

var deleteAllStudents = function () {
    students = [];
    sd.innerHTML = "";
};

var studentIdFormGroup = $("#studentIdFormGroup");
var studentSubmit = $("#studentSubmit");
var getEditStudent = function (i) {
    if (i > -1) {
        populateStudentForm(students[i]);
    }
    studentIdFormGroup.style.display = "block";
    studentSubmit.setAttribute("class", "btn btn-warning");
};

var editStudent = function (student) {
    // console.log("Student to edit id: " + student.id);
    var index = getIndex(students, student.id);
    // console.log("Student to edit index: " + index);
    if (index > -1) {
        students[index].name = student.name;
        students[index].email = student.email;
        students[index].phone = student.phone;
        students[index].level = student.level;
        students[index].group = student.group;
    }
    studentIdFormGroup.style.display = "none";
    studentSubmit.setAttribute("class", "btn btn-primary");
    rePopulateStudentsData();
};

var studentForm = $("#studentForm");
var studentId = $("#studentId");
var clearStudentForm = function () {
    studentId.innerText = "";
    studentForm.studentId.value = "";
    studentForm.studentName.value = "";
    studentForm.studentEmail.value = "";
    studentForm.studentPhone.value = "";
    rePopulateStudentLevels();
    rePopulateStudentGroups();
};

var validateStudentForm = function () {
    var valid = true;
    if (studentForm.studentName.value.length <= 0)
        valid = false;
    if (studentForm.studentEmail.value.length <= 0)
        valid = false;
    if (studentForm.studentPhone.value.length <= 0)
        valid = false;
    if (studentForm.studentLevel.value.toLowerCase() === "level")
        valid = false;
    if (studentForm.studentGroup.value.toLowerCase() === "group")
        valid = false;
    return valid;
};

var populateStudentForm = function (student) {
    studentId.innerText = "# " + student.id;
    studentForm.studentId.value = student.id;
    studentForm.studentName.value = student.name;
    studentForm.studentEmail.value = student.email;
    studentForm.studentPhone.value = student.phone;
    studentForm.studentLevel.value = student.level;
    studentForm.studentGroup.value = student.group;
};

studentForm.onsubmit = function (e) {
    e.preventDefault();
    if (validateStudentForm()) {
        var editing = false;

        if (studentForm.studentId.value !== "")
            editing = true;

        var student = {};
        if (!editing)
            student.id = generateId(students);
        else
            student.id = studentForm.studentId.value;

        student.name = studentForm.studentName.value;
        student.email = studentForm.studentEmail.value;
        student.phone = studentForm.studentPhone.value;
        student.level = parseInt(studentForm.studentLevel.value);
        student.group = parseInt(studentForm.studentGroup.value);

        if (!editing) {
            insertStudent(student, sd.rows.length);
            students.push(student);
        } else {
            editStudent(student);
        }

        clearStudentForm();
    }
};

// Student above
// Level & Group below

var populateForm = function (form, elem, text) {
    text.innerText = "# " + elem.id;
    form.id.value = elem.id;
    form.name.value = elem.name;
};

var clearForm = function (form, text, callback) {
    text.innerText = "";
    form.id.value = "";
    form.name.value = "";
    callback();
};

var editObj = function (array, elem, formGroup, submit) {
    var index = getIndex(array, elem.id);
    if (index > -1) {
        array[index].name = elem.name;
    }
    formGroup.style.display = "none";
    submit.setAttribute("class", "btn btn-primary");
};

// Level & Group above
// Level below

var ld = $("#levelsData");
var insertLevel = function (level, i) {
    var row = ld.insertRow();
    row.insertCell(0).innerText = level.id;
    row.insertCell(1).innerText = level.name;
    row.insertCell(2).appendChild(generateButtonGroup(levels, i, deleteLevel, getEditLevel));
};

var deleteLevel = function (i) {
    if (i > -1) {
        levels.splice(i, 1);
    }
    rePopulateLevelsData();
};

var populateLevelsData = function () {
    for (var i = 0; i < levels.length; i++) {
        var level = {
            id: levels[i].id,
            name: levels[i].name
        };
        insertLevel(level, i);
    }
    rePopulateStudentLevels();
};

var rePopulateLevelsData = function () {
    ld.innerHTML = "";
    populateLevelsData();
};

var levelIdFormGroup = $("#levelIdFormGroup");
var levelSubmit = $("#levelSubmit");
var getEditLevel = function (i) {
    if (i > -1) {
        populateForm(levelForm, levels[i], levelId);
    }
    levelIdFormGroup.style.display = "block";
    levelSubmit.setAttribute("class", "btn btn-warning");
};


var levelForm = $("#levelForm");
var levelId = $("#levelId");

levelForm.onsubmit = function (e) {
    e.preventDefault();
    if (levelForm.name.value.length > 0) {
        var editing = false;

        if (levelForm.id.value !== "")
            editing = true;

        var level = {};
        if (!editing)
            level.id = generateId(levels);
        else
            level.id = levelForm.id.value;

        level.name = levelForm.name.value;

        if (!editing) {
            insertLevel(level, ld.rows.length);
            levels.push(level);
        } else {
            editObj(levels, level, levelIdFormGroup, levelSubmit);
        }

        clearForm(levelForm, levelId, rePopulateLevelsData());
    }
};

// Level above
// Group below

var gd = $("#groupsData");
var insertGroup = function (group, i) {
    var row = gd.insertRow();
    row.insertCell(0).innerText = group.id;
    row.insertCell(1).innerText = group.name;
    row.insertCell(2).appendChild(generateButtonGroup(groups, i, deleteGroup, getEditGroup));
};

var deleteGroup = function (i) {
    if (i > -1) {
        groups.splice(i, 1);
    }
    rePopulateGroupsData();
};

var populateGroupsData = function () {
    for (var i = 0; i < groups.length; i++) {
        var group = {
            id: groups[i].id,
            name: groups[i].name
        };
        insertGroup(group, i);
    }
    rePopulateStudentGroups();
};

var rePopulateGroupsData = function () {
    gd.innerHTML = "";
    populateGroupsData();
};

var groupIdFormGroup = $("#groupIdFormGroup");
var groupSubmit = $("#groupSubmit");
var getEditGroup = function (i) {
    if (i > -1)
        populateForm(groupForm, groups[i], groupId);

    groupIdFormGroup.style.display = "block";
    groupSubmit.setAttribute("class", "btn btn-warning");
};


var groupForm = $("#groupForm");
var groupId = $("#groupId");

groupForm.onsubmit = function (e) {
    e.preventDefault();
    if (groupForm.name.value.length > 0) {
        var editing = false;

        if (groupForm.id.value !== "")
            editing = true;

        var group = {};
        if (!editing)
            group.id = generateId(groups);
        else
            group.id = groupForm.id.value;

        group.name = groupForm.name.value;

        if (!editing) {
            insertGroup(group, gd.rows.length);
            groups.push(group);
        } else {
            editObj(groups, group, groupIdFormGroup, groupSubmit);
        }

        clearForm(groupForm, groupId, rePopulateGroupsData());
    }
};

// Group above
// Auto run below

// Select Boxes in Student Form
populateStudentLevels();
populateStudentGroups();
// Students Table
populateStudentsData();
// Levels Table
populateLevelsData();
// Groups Table
populateGroupsData();
