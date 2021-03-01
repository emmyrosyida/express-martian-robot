$(document).ready(() => {
  $("#count").text($("#textarea").val().length);

  $("#textarea").keyup(function () {
    $("#count").text($(this).val().length);
  });
  var clipboard = new ClipboardJS(".btn");

  clipboard.on("success", function (e) {
    // console.info("Action:", e.action);
    // console.info("Text:", e.text);
    // console.info("Trigger:", e.trigger);

    e.clearSelection();
  });

  $("#submit").click(function () {
    $.ajax({
      url: "/api/input",
      type: "POST",
      data: {
        input: $("#textarea").val(),
      },
      success: function (msg) {
        let arr = [];
        if (msg.length > 0) {
          msg.map((e) => {
            let status = "";
            if (e.res) status = e.res;
            arr.push(`${e.x}  ${e.y}  ${e.compas} ${status}`);
          });
        }

        $("#textarea2").val(arr.join("\n"));
      },
    });
  });
});
