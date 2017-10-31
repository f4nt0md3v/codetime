/**
 * Created by uk on 10/23/17.
 */
function validateForm() {
    if ($('#checkbox_madness input:checked').length == 0)
    {
        alert("Выберите как минимум один курс.");
        return false;
    }
    return true;
}

var frm = $("#reg_form");
if (frm.length){
frm.submit(function(e) {
    if (validateForm()) {
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
                console.log('Submission was successful.');
                console.log(data);
                alert(data); // show response from the php script.
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            },
        });
    }
    e.preventDefault(); // avoid to execute the actual submit of the form.
});
}

var cntfrm = $("#contact_form");
if (cntfrm.length){
cntfrm.submit(function(e) {
    $.ajax({
        type: cntfrm.attr('method'),
        url: cntfrm.attr('action'),
        data: cntfrm.serialize(),
        success: function (data) {
            console.log('Submission was successful.');
            console.log(data);
            alert(data); // show response from the php script.
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
});
}
