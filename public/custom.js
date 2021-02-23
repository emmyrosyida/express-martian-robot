$(document).ready(() => {
  $("#submit").click(function () {
    console.log($("#textarea").val());

    $.ajax({
      url: "/api/input",
      type: "POST",
      data: {
        input: $("#textarea").val(),
      },
      success: function (msg) {
        console.log(msg);
      },
    });
  });
});
