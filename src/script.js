$(document).ready(function () {
  var user = {};

  function register(e) {
    user.idnumber = document.getElementById("idnumber").value;
    user.firstname = document.getElementById("firstname").value;
    user.lastname = document.getElementById("lastname").value;
    user.gender = document.getElementById("gender").value;
    user.bday = document.getElementById("bday").value;
    user.program = document.getElementById("program").value;
    user.yearlevel = document.getElementById("yearlevel").value;

    $.ajax({
      type: "POST",
      data: { action: "register", userdata: user },
      url: "src/php/user.php",
      success: function (response) {
        idresponse = jQuery.parseJSON(response);
        var table = $("#usertable tbody");
        if (idresponse == 0) {
          alert("Error saving the user!");
        } else {
          user.id = idresponse;
          appendUser(user, table);
        }
        $("#userForm").find("input, select").val("");
      },
    });

    e.preventDefault();
  }

  function getUsers() {
    $.ajax({
      type: "GET",
      data: { action: "getusers" },
      url: "src/php/user.php",
      success: function (response) {
        users = jQuery.parseJSON(response);
        var table = $("#usertable tbody");
        for (var i = 0; i < users.length; i++) {
          appendUser(users[i], table);
        }
      },
    });
  }

  function appendUser(user, table) {
    row =
      "<tr>" +
      "<th scope=\"row\">"+ user.id +"</th>"+
      "<td>" + user.idnumber + "</td>" +
      "<td>" + user.firstname + "</td>" +
      "<td>" + user.lastname + "</td>" +
      "<td>" + user.gender + "</td>" +
      "<td>" + user.bday + "</td>" +
      "<td>" + user.program + "</td>" +
      "<td>" + user.yearlevel + "</td>" +
      "<td>" + `<button type="button" class="btn btn-primary" id="update">Update</button>` + "</td>" +
      "<td>" + `<button type="button" class="btn btn-primary" id="delete-${user.id}">Delete</button>` + "</td>" +
      "</tr>";

    table.append(row);

    $("#delete-" + user.id).click(function () {
      deleteUser(user.id);
    });

  }


  function deleteUser(userId) {
    $.ajax({
      type: "POST",
      data: { action: "deleteuser", userId: userId },
      url: "src/php/user.php",
      success: function (response) {
        if (response == 0) {
          alert("Error in deleting");
          return;
        }
      }
    });
  }

  $("#update").click(function(){
    $("#updateForm").modal("toggle");
    $(document).on('click','#update_btn',function(){
    updateUser();
  });

  });

   function updateUser(e) {
    
    var id = $("#userId").val();
    var update_idnumber = $("#update-idnumber").val();
    var update_firstname = $("#update-firstname").val();
    var update_lastname = $("#update-lastname").val();
    var update_gender = $("#update-gender").val();
    var update_bday = $("#update-bday").val();
    var update_program = $("#update-program").val();
    var update_yearlevel = $("#update-yearlevel").val();

    $.ajax({
      type: "POST",
      data: {user_id : id, update_idnumber : update_idnumber, update_firstname:update_firstname,
      update_lastname:update_lastname, update_gender:update_gender, update_bday:update_bday,
      update_program:update_program, update_yearlevel:update_yearlevel,
      action:"updateuser",    },
      url: "src/php/user.php",
      success: function (data) {
        if (response == '') {
          alert("Update successful");
        }
      },
    });
  }
 $("#userForm").submit(register);
  getUsers();

 /* $(document).on('click','#update_btn',function(){
    updateUser();
  };*/

});