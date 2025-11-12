import {customerDB} from "../DB/CustomerDB";
import {itemDB} from "../DB/ItemDB";
import {orderDB} from "../DB/OrderDB";

function updateDashboard() {

    // Update counts
    $("#totalCustomers").text(customerDB.length);
    $("#totalItems").text(itemDB.length);
    $("#totalOrders").text(orderDB.length);

    // Calculate total revenue
    let totalRevenue = 0;
    orderDB.forEach(order => {
        totalRevenue += parseFloat(order.getAmount ? order.getAmount() : order.total || 0);
    });
    $("#totalRevenue").text(`$${totalRevenue.toFixed(2)}`);
}
