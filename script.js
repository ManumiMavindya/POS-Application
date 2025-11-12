 $(document).ready(function() {

    // Dashboard page (optional, you can create a section for it)
    $('#navDashboard').click(function(e) {
        e.preventDefault();
        $('#Dashboard').show();
        $('#CustomerPage, #ItemPage, #OrderPage').hide();

    });

    // Show Customer page
    $('#navCustomer').click(function(e) {
        e.preventDefault();
        $('#CustomerPage').show();
        $('#ItemPage, #Dashboard, #OrderPage').hide();
    });

    // Show Item page
    $('#navItem').click(function(e) {
        e.preventDefault();
        $('#ItemPage').show();
        $('#CustomerPage, #OrderPage, #Dashboard').hide();
    });

    // Show Order page
    $('#navOrder').click(function(e) {
        e.preventDefault();
        $('#OrderPage').show();
        $('#CustomerPage, #Dashboard, #ItemPage').hide();
    });


    // Highlight active nav link
    $('.nav-link').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

});
