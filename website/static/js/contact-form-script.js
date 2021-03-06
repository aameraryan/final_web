$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    $('#submit').text('Please Wait ...');
    $('#ajax_loader_aa').css("visibility", "visible");
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();


    $.ajax({
        type: "POST",
        url: "/enquiry_form/",
        data: {
            csrfmiddlewaretoken : csrfmiddlewaretoken,
            name : name,
            email : email,
            subject : msg_subject,
            message : message
        },
         success : function(text){
                formSuccess();
        }
    });
}

function formSuccess(){
    $('#submit').text('SEND MESSAGE');
    $('#ajax_loader_aa').css("visibility", "hidden");
    $("#contactForm")[0].reset();
    submitMSG(true, "Thank You For Enquiry." +
        "We Will Update You Soon !")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h5 text-center tada animated text-success";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}