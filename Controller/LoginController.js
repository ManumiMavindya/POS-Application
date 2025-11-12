
$('#Dashboard, #CustomerPage, #ItemPage, #OrderPage').hide();

    // ================= LOGIN ===================

    $("#login-form").on("submit", function (e) {
        e.preventDefault(); // cant reload form

        let username = $("#username").val().trim();
        let password = $("#password").val().trim();

        if (username === "" || password === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Missing fields!',
                text: 'Please enter both username and password.'
            });
            return;
        }

        // Default credentials check
        if (username === "admin" && password === "password") {
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome to the POS System!'
            }).then(() => {

                //hide ligin page and show dashboard
                $("#LoginPage").hide();
                $("#Dashboard").show();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Credentials!',
                text: 'Username or Password is incorrect.'
            });
        }
    });
