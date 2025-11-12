function updateDashboard() {
    // Total Orders
    $("#totalOrders").text(orderDB.length);

    // Total Customers
    $("#totalCustomers").text(customerDB.length);

    // Total Items
    $("#totalItems").text(itemDB.length);

    // Total Revenue
    let totalRevenue = orderDB.reduce((sum, order) => sum + parseFloat(order.getAmount()), 0);
    $("#totalRevenue").text(`$${totalRevenue.toFixed(2)}`);
}
