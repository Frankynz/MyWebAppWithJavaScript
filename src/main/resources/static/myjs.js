$(document).ready(
    function() {
        ajaxGetUsers();
        ajaxGetUserNow();
        ajaxGetUserNowTable();
        $("#usersTableTest").click(function (event) {
            event.preventDefault();
            ajaxGetUsers();
        });
        $("#edit_form").submit(function (event) {
            event.preventDefault();
            ajaxEditUser();
        });
        $("#addUserForm").submit(function (event) {
            event.preventDefault();
            ajaxAddUser();
            ajaxGetUsers();
        });
        $("#delete_modal_button").click(function (event) {
            event.preventDefault();
            ajaxDelete();
        });
        $("#v-pills-user").click(function (event) {
            event.preventDefault();
            ajaxGetUserNowTable();
        });
    }
)
$(document).on('hide.bs.modal', '#modal_edit', function () {
    $('#edit_form').trigger('reset');
})

function setModalEdit(id) {
    $('#editId').attr("value", $(`#i${id}`).text());
    $('#editFirstname').attr("value", $(`#f${id}`).text());
    $('#editLastname').attr("value", $(`#l${id}`).text());
    $('#editAge').attr("value", $(`#a${id}`).text());
    $('#editEmail').attr("value", $(`#e${id}`).text());
}

function setModalDelete(id) {
    $('#deleteid').attr("value", $(`#i${id}`).text());
    $('#deleteFirstname').attr("value", $(`#f${id}`).text());
    $('#deleteLastname').attr("value", $(`#l${id}`).text());
    $('#deleteAge').attr("value", $(`#a${id}`).text());
    $('#deleteEmail').attr("value", $(`#e${id}`).text());
}

function ajaxEditUser() {
    let formData = {
        id: $("#editId").val(),
        firstname: $("#editFirstname").val(),
        lastname: $("#editLastname").val(),
        age: $("#editAge").val(),
        email: $("#editEmail").val(),
        password: $("#editPassword").val(),
        roles: stringToRoles($("#editCheckRoles").val()),
    }

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "/rest/edit",
        data: JSON.stringify(formData),
        dataType: 'json',
        success : function() {
            ajaxGetUsers();
            $('#modal_edit').modal('hide');
        }
    })
}

function ajaxGetUsers() {
    $.ajax({
        type: "GET",
        url: "/rest/getusers",
        success: function (result) {
            $('#ViewUsersTable').empty();
            $.each(result, function (i, user) {
                let userTable =
                    "<tr>" +
                    "<td id='i" + user.id + "'>" + user.id + "</td>" +
                    "<td id='f" + user.id + "'>" + user.firstname + "</td>" +
                    "<td id='l" + user.id + "'>" + user.lastname + "</td>" +
                    "<td id='a" + user.id + "'>" + user.age + "</td>" +
                    "<td id='e" + user.id + "'>" + user.email + "</td>" +
                    "<td id='p" + user.id + "'>" + rolesToString(user.roles) + "</td>" +
                    "<td><button class='btn btn-info' data-toggle='modal' data-target='#modal_edit' id='editButton' onclick='setModalEdit(" + user.id +")'>Edit</button></td>" +
                    "<td><button class='btn btn-danger' data-toggle='modal' data-target='#modal_delete' id='deleteButton' onclick='setModalDelete(" + user.id +")'>Delete</button></td>" +
                    "</tr>";
                $("#ViewUsersTable").append(userTable);
            });

        }
    })
}

function ajaxAddUser() {
    let formData = {
        firstname:          $("#firstNameAdd").val(),
        lastname:           $("#lastNameAdd").val(),
        age:                $("#ageAdd").val(),
        email:              $("#emailAdd").val(),
        password:           $("#passwordAdd").val(),
        roles:stringToRoles($("#checkRolesAdd").val()),
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/rest/adduser",
        data: JSON.stringify(formData),
        dataType: 'json',
        success : function() {
            ajaxGetUsers();
            $('#table_of_users').click();
            $('#addUserForm').trigger('reset');
        }
    })
}

function ajaxDelete() {
    $.ajax({
        type: "DELETE",
        url: "/rest/delete/" + $(`#deleteid`).val(),
        dataType: 'text',
        success : function() {
            ajaxGetUsers();
            $('#modal_delete').modal('hide');
        }
    })
}

function ajaxGetUserNow() {
    $.ajax({
        type: "GET",
        url: "/rest/getusernow",
        success : function(result) {
            $('#user_now_email').text(result.email);
            $('#user_now_roles').text(' witch roles: ' + rolesToString(result.roles));
        }
    })
}

function ajaxGetUserNowTable() {
    $.ajax({
        type: "GET",
        url: "/rest/getusernow",
        success : function(result) {
            let userTable =
                "<tr>" +
                "<td>" + result.id                      +   "</td>" +
                "<td>" + result.firstname               +   "</td>" +
                "<td>" + result.lastname                +   "</td>" +
                "<td>" + result.age                     +   "</td>" +
                "<td>" + result.email                   +   "</td>" +
                "<td>" + rolesToString(result.roles) +   "</td>" +
                "</tr>";
            $('#user_now_page_table').empty().append(userTable);
        }
    })
}

function stringToRoles(textRoles) {
    let roles = [];
    if (textRoles.includes('ADMIN')) {
        roles.push({'id' : 1, 'name' : 'ADMIN'});
    }
    if (textRoles.includes('USER')) {
        roles.push({'id' : 2, 'name' : 'USER'});
    }
    return roles;
}

function rolesToString(roles) {
    let textRoles = [];
    $.each(roles, function (i, role) {
        textRoles[i] = role.name;
    })
    return textRoles.join(', ');
}