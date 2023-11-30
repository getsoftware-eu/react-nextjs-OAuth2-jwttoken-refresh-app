function showMessage(message, type) {
    toastr[type](message, '', {
        closeButton: true,
        newestOnTop: true,
/*        positionClass: $("input[name=\"toastr-position\"]:checked").val(),
        progressBar: $("#toastr-progress-bar").prop("checked"),
        rtl: $("body").attr("dir") === "rtl" || $("html").attr("dir") === "rtl",
        timeOut: $("#toastr-duration").val()*/
    });
}
function showError(error) {
    showMessage(error, "error")
}
function showSuccess(message) {
    showMessage(message, "success")
}

$("#toastr-clear").on("click", function() {
    toastr.clear();
});
