/* eslint-disable no-undef */
$(document).ready(function () {
    $('#dataset_to_activate').on('loaded.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        $('.dataset-select-dropdown>.btn').addClass('btn-sm')
        $('#dataset-select-apply-button').removeClass('hidden').prependTo($('.dataset-select-dropdown > div > div.bs-actionsbox'))
    })
})

$('#lex_miner').on('click', function () {
    window.location = LINK_LEXMINER
})

$('#searcher').on('click', function () {
    window.location = LINK_SEARCHER
})

$('#mwe_miner').on('click', function () {
    window.location = LINK_MWE
})

$('#home').on('click', function () {
    window.location = LINK_ROOT
})

$('#conceptualizer').on('click', function () {
    window.location = LINK_CONCEPTUALISER
})

$('#model_manager').on('click', function () {
    window.location = LINK_MODEL_MANAGER
})

$('#classification_manager').on('click', function () {
    window.location = LINK_CLASSIFICATION_MANAGER
})

$('#task_manager').on('click', function () {
    window.location = LINK_TASK_MANAGER
})

$('#ontology_viewer').on('click', function () {
    window.location = LINK_ONTOLOGY_VIEWER
})

$('#permission_admin').on('click', function () {
    window.location = LINK_PERMISSION_ADMIN
})

$('#grammar_builder').on('click', function () {
    window.location = LINK_GRAMMAR_BUILDER
})

$('#dataset_importer').on('click', function () {
    window.location = LINK_DATASET_IMPORTER
})
$('.model-dropdown-menu li').on('click', function () {
    $('#model-dropdown').text($(this).text())
    $('#model-dropdown').val($(this).text())
})
$('#notRegistered').on('click', function () {
    $(this).hide()
    $('#registrationForm').slideDown(1000)
})

$('#cancelRegistrationBtn').on('click', function () {
    $('#registrationForm').slideUp(1000, function () {
        $('#notRegistered').slideDown(300)
    })
    clearRegistrationForm()
})

$('#registrationForm > .form-group > .form-control').on('focus', function () {
    validateInput($(this).attr('id'))
})

function login() {

    var usernameInput = $('#loginUsername').val()
    var passwordInput = $('#loginPassword').val()

    $.ajax({
        url: LINK_ACCOUNT + '/login',
        data: {
            'username': usernameInput,
            'password': passwordInput
        },
        statusCode: {
            401: function () {
                invalidateInput('login_form', 'has-error', 'Failed to login')
            }
        },
        type: 'POST',
    }).then((data) => {
            data = JSON.parse(data)
            if (data.event === 'login_process_succeeded') {
                go_to(LINK_ROOT)
            }
        }
    )
    return false

}

function registerAccount() {
    var usernameInput = $('#registrationUsername')
    var passwordInput = $('#registrationPassword')
    var passwordAgainInput = $('#registrationPasswordAgain')
    var emailInput = $('#registrationEmail')

    var failed = false

    if (passwordInput.val() != passwordAgainInput.val()) {
        invalidateInput('registrationPasswordAgain', 'has-error', "Passwords don't match.")
        return
    }

    $.post(LINK_ACCOUNT + '/create', {
        username: usernameInput.val(),
        password: passwordInput.val(),
        email: emailInput.val()
    }, function (data) {
        if (data.url == '#') {
            // console.log(data.issues.username[0]);
            if (data.issues && data.issues.username) {
                invalidateInput('registrationUsername', 'has-error', 'Username exists or is too short.')
            }
        } else {
            $('#confirm-email-modal').modal()
            // go_to(data.url);
        }
    }, 'json')
}

function invalidateInput(input_id, status, message) {
    var input = $('#' + input_id)
    var parent = input.parent()
    var helpBlock = parent.find('.help-block')
    if (helpBlock.length) {
        helpBlock.text(message)
    } else {
        var spanElement = document.createElement('span')
        spanElement.className = 'help-block'
        spanElement.appendChild(document.createTextNode(message))
        $(spanElement).appendTo(parent)
    }
    parent.removeClass('has-success has-warning has-error')
    parent.addClass(status)

    return input
}

function validateInput(input_id) {
    var input = $('#' + input_id)
    var parent = input.parent()
    parent.removeClass('has-success has-warning has-error')
    parent.find('.help-block').remove()

    return input
}

function clearRegistrationForm() {
    var ids = ['registrationUsername', 'registrationPassword', 'registrationPasswordAgain', 'registrationEmail']

    for (var i = 0; i < ids.length; i++) {
        validateInput(ids[i]).val('')
    }
}


function model_update_resources(self) {
    var model_data = $(self).data()
    $.post(LINK_ROOT + '/update_model', model_data).done(function (response) {
        let resp = JSON.parse(response);
        if (resp.status === "success") {
            swal({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1000,
                type: 'success',
                title: 'Model updated!'
            }).then(() => {
                location.reload()
            })
        } else {
            swal({
                title: 'An error occured!',
                text: 'An error occured during Model update!',
                type: 'warning'
            })
        }
    });
}


function dataset_update_resources() {
    var dataset_id = $('#dataset_to_activate').val()
    var data = { dataset: dataset_id }
    $.post(LINK_ROOT + '/update_dataset', data).done(function (response) {
        let resp = JSON.parse(response);
        if (resp.status === "success") {
            swal({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1000,
                type: 'success',
                title: 'Datasets updated!'
            }).then(() => {
                location.reload()
            })
        } else {
            swal({
                title: 'An error occured!',
                text: 'An error occured during Dataset update!',
                type: 'warning'
            })
        }
    });
    
}

function propagate_form() {
    return false;
}

function update_resources(data) {
    $.post(LINK_ROOT + '/update', data).done(function (response) {
        let resp = JSON.parse(response);
        if (resp.status === "success") {
            swal({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1000,
                type: 'success',
                title: 'Resources updated!'
            }).then(() => {
                location.reload()
            })
        } else {
            swal({
                title: 'An error occured!',
                text: 'An error occured during resource update!',
                type: 'warning'
            })
        }
    });
}

var SwalType = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    QUESTION: 'question'
}

function swalCustomTypeDisplay(swalType, title, text) {
    swal({
        title: title,
        text: text,
        heightAuto: false,
        type: swalType,
    })
}
