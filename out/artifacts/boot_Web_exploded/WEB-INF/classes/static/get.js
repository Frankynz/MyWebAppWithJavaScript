GET: $(document).ready(
    function () {
        // GET REQUEST
        ajaxGet();
        $("#usersTable-tab").click(function (event) {
            event.preventDefault();
            ajaxGet();
        });

        // DO GET
        function ajaxGet() {
            $.ajax({
                type: "GET",
                url: "/allusers",
                success: function (result) {
                    $('#getResultDiv').empty();
                    $.each(result,
                        function (i, user) {

                        var user =
                                "<tr><td>" + user.id + "</td>" +
                                "<td>" + user.firstname + "</td>" +
                                "<td>" + user.lastname + "</td>" +
                                "<td>" + user.age + "</td>" +
                                "<td>" + user.email + "</td>" +
                                "<td>" + user.roles + "</td>"+
                                "<td>" + "edit" + "</td>"+
                                "<td>" + "delete" + "</td>"+
                                "</tr>";

                            $('#getResultDiv').append(
                                user)
                        }
                    );
                },
                error: function () {
                    alert("error");
                }
            });
        }
    })