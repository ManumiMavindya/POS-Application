import { orderDB } from "../DB/OrderDB.js";
import { OrderDTO } from "../DTO/OrderDTO.js";
import { customerDB } from "../DB/CustomerDB.js";
import { itemDB } from "../DB/ItemDB.js";

// ============================== Generate Order ID ================================================
function generateOrderId() {
    if (orderDB.length === 0) return "OR001";
    const lastId = orderDB[orderDB.length - 1].getOrderId();
    const numericPart = parseInt(lastId.substring(2));
    return "OR" + (numericPart + 1).toString().padStart(3, "0");
}

// ============================== Load Order Table ================================================
function loadOrderTable() {
    const tbody = $("#orderTable");
    tbody.empty();

    orderDB.forEach((order, index) => {
        const customer = customerDB.find(c => c.getId() === order.getCustomerId());
        const item = itemDB.find(i => i.getId() === order.getItemId());

        tbody.append(`
            <tr data-index="${index}">
                <td>${order.getOrderId()}</td>
                <td>${customer ? customer.getName() : order.getCustomerId()}</td>
                <td>${item ? item.getItemName() : order.getItemId()}</td>
                <td>${order.getDate()}</td>
                <td>$${order.getAmount()}</td>
            </tr>
        `);
    });
}

// ============================== Show Live Order Preview ================================================
function showPreviewOrder() {
    const customerId = $("select[aria-label='Select Customer']").val();
    const itemId = $("select[aria-label='Select Item']").val();

    if (customerId === "Select Customer" || itemId === "Select Item") {
        $(".card-body").html(`<p class="text-muted">Please select a customer and an item.</p>`);
        return;
    }

    const customer = customerDB.find(c => c.getId() === customerId);
    const item = itemDB.find(i => i.getId() === itemId);

    const orderId = generateOrderId();
    const date = new Date().toLocaleString();
    const price = item ? item.getPrice() : 0;
    const total = price; // can add quantity × price later

    const cardHtml = `
        <h5 class="card-title mb-3">Order ID: ${orderId}</h5>
        <p><strong>Customer:</strong> ${customer ? customer.getName() : "-"}</p>
        <p><strong>Item:</strong> ${item ? item.getItemName() : "-"}</p>
        <p><strong>Price:</strong> $${price}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Date:</strong> ${date}</p>
    `;

    $(".card-body").html(cardHtml);
}

// ============================== Save Order ================================================
$("#btnSaveOrder").click(function() {
    const customerId = $("select[aria-label='Select Customer']").val();
    const itemId = $("select[aria-label='Select Item']").val();

    if (customerId === "Select Customer" || itemId === "Select Item") {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill all the fields!',
        });
        return;
    }

    const date = new Date().toLocaleString();
    const item = itemDB.find(i => i.getId() === itemId);
    const amount = item ? item.getPrice() : 0;

    const order = new OrderDTO(generateOrderId(), customerId, itemId, date, amount);
    orderDB.push(order);

    loadOrderTable();
    showPreviewOrder();
    updateDashboard();

    Swal.fire({
        title: "Saved!",
        text:"Order Saved Successfully.",
        icon: "success"
    });
});

// ============================== Cancel Order ================================================
$("#btnCancelOrder").click(function() {
    Swal.fire({
        title: 'Are you sure?',
        text: "This Order will be deleted permanently!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });
    if (orderDB.length === 0) {
        Swal.fire({
            title: 'No Orders to Delete',
            icon: 'warning',
        });

        return;
    }
    orderDB.pop();
    loadOrderTable();

    $(".card-body").html(`<p class="text-muted">No current order.</p>`);
});

// ============================== Select Table Row ================================================
$("#orderTable").on("click", "tr", function() {
    const index = $(this).data("index");
    const order = orderDB[index];
    showCurrentOrder(order);
});

// ============================== Show Specific Order ================================================
function showCurrentOrder(order) {
    const customer = customerDB.find(c => c.getId() === order.getCustomerId());
    const item = itemDB.find(i => i.getId() === order.getItemId());

    const cardHtml = `
        <h5 class="card-title mb-3">Order ID: ${order.getOrderId()}</h5>
        <p><strong>Customer:</strong> ${customer ? customer.getName() : order.getCustomerId()}</p>
        <p><strong>Item:</strong> ${item ? item.getItemName() : order.getItemId()}</p>
        <p><strong>Total:</strong> $${order.getAmount()}</p>
        <p><strong>Date:</strong> ${order.getDate()}</p>
    `;
    $(".card-body").html(cardHtml);
}

// ============================== Live Update on Select Change ================================================
$("select[aria-label='Select Customer'], select[aria-label='Select Item']").on("change", function() {
    showPreviewOrder();
});
