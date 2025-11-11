$(document).ready(function() {

    // Show Customer page
    $('#navCustomer').click(function(e) {
        e.preventDefault();
        $('#CustomerPage').show();
        $('#ItemPage').hide();
    });

    // Show Item page
    $('#navItem').click(function(e) {
        e.preventDefault();
        $('#ItemPage').show();
        $('#CustomerPage').hide();
    });

    // Dashboard page (optional, you can create a section for it)
    $('#navDashboard').click(function(e) {
        e.preventDefault();
        $('#CustomerPage, #ItemPage').hide();
        alert("Dashboard page can be added here"); // temporary
    });

    // Highlight active nav link
    $('.nav-link').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

});
