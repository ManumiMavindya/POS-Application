$("#logoutBtn").on("click", function () {
    Swal.fire({
        icon: 'question',
        title: 'Are you sure?',
        text: 'Do you really want to log out?',
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            $("#Dashboard, #CustomerPage, #ItemPage, #OrderPage").hide();
            $("#LoginPage").show();
            Swal.fire('Logged out!', 'You have been logged out successfully.', 'success');
        }
    });
});
