$(document).ready(function () {
    // Show Form Popup after load
    setTimeout(function () {
        formsPopup();
    }, 700);
});
$(document).ready(function () {
    // scripts for accessibility score improve
    $('#errorMessage label').attr('aria-label','error message');
    //custom validation rule
    $.validator.addMethod("customemail",
        function (value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        "ENTER A VALID EMAIL ADDRESS"
    );
    // Validate email field
    $(".email").validate({
        rules: {
            email: {
                required: true,
                email: true,
                customemail: true,
            },

        },
        errorPlacement: function (error, element) {
            if (element.attr("id") == "email") {
                $("#errorMessage").append(error);
                $("#errorMessage").css({ "opacity": "1" });
                $("#errorMessage-click").css({ "opacity": "0" });
                $("#errorMessage-click").html("");
            }
        },
        messages: {
            email: {
                required: "ENTER A VALID EMAIL ADDRESS",
                email: "ENTER A VALID EMAIL ADDRESS",
            },
        },
    });
    // Function to perform on form click.If valid then confirmation popup will be displayed else error message will be displayed
    $('form button[type="button"]').click(function () {
        if ($('input[type="email"]').hasClass('error')) {
        } else {
            if ($('input[type="email"]').val() !== '') {
                $(".form-wrapper").fadeOut();
                setTimeout(function () {
                    confirmationPopup();
                }, 400);

            } else {
                $('input[type="email"]').addClass("error")
                $("#errorMessage-click").append("ENTER A VALID EMAIL ADDRESS");
                $("#errorMessage-click").css({ "opacity": "1" });
            }

        }

    });
});
/*forms popup display and close actions*/
function formsPopup() {
    if ($(".form-wrapper").length) {
        $(".form-wrapper").fadeIn();

        $(".form-wrapper #form-close").on("click", function (e) {
            $(".form-wrapper").fadeOut();
        });
        $(".form-wrapper #form-close").on("keydown", function (e) {
            if (e.which == 13 && !e.shiftKey) {
                $(".form-wrapper").fadeOut();
            }
        });
    }
}
function confirmationPopup() {
    if ($(".confirmation-wrapper").length) {
        $(".confirmation-wrapper").fadeIn();

        $(".confirmation-wrapper #confirmation-close").on("click", function (e) {
            $(".confirmation-wrapper").fadeOut();
        });
        $(".confirmation-wrapper #confirmation-close").on("keydown", function (e) {
            if (e.which == 13 && !e.shiftKey) {
                $(".confirmation-wrapper").fadeOut();
            }
        });
        $(".confirmation-wrapper").on("click", function (e) {
            if (!$(e.target).closest(".pop-up-round").length) {
                $("#confirmation-close").click();
            }
        });
    }
}
//browser width calculation
function getWidth() {
    if (self.innerHeight) {
        return self.innerWidth;
    }
    if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientWidth;
    }
    if (document.body) {
        return document.body.clientWidth;
    }
}
