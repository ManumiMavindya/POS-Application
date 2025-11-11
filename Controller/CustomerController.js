import {customerDB} from "../DB/CustomerDB.js";
import {CustomerDTO} from "../DTO/CustomerDTO.js";

// ============================== Generate Customer ID ================================================

const generateId = () => {
    if (customerDB.length === 0){
        return "C001";
    }
    let lastId = customerDB[customerDB.length-1].getId();
    let number = parseInt(lastId.substring(1));
    number++;
    return "C" + number.toString().padStart(3, "0");
};

// ============================== Load Customer Table Data  ================================================

const loadTable = () => {

    $('#cusTable').empty();

    customerDB.forEach(cus => {
        let row = `
            <tr>
                <td>${cus.getId()}</td>
                <td>${cus.getName()}</td>
                <td>${cus.getPhone()}</td>
                <td>${cus.getEmail()}</td>
                <td>${cus.getAddress()}</td>
            </tr>
        `;
        $('#cusTable').append(row);
    });

};

// ============================== Save Customer (button)================================================

let selectedCustomerId = undefined;
let customerId = undefined;

$(document).on("click", "#cusSave", function (){

    let name = $('#inputName').val();
    let contact = $('#inputContact').val();
    let email = $('#inputEmail').val();
    let address = $('#inputAddress').val();

    if (name === '' || contact === '' || email === '' || address === ''){

        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill all the fields!',
        });
        return;
    }

    customerDB.push(new CustomerDTO(generateId(), name, contact, email, address));

    Swal.fire({
        title: "Saved!",
        text:"Customer Saved Successfully.",
        icon: "success"
    });

    loadTable();
    /*========== Clear text fields ============*/
    $('#inputName, #inputContact, #inputEmail, #inputAddress').val('');


});

// ============================== Select Customer from Table ==============================

$(document).on("click", "#cusTable tr", function() {
    let id = $(this).children("td:eq(0)").text(); // Get ID from first column
    let customer = customerDB.find(c => c.getId() === id);

    if (customer) {
        selectedCustomerId = id; // Save selected customer ID
        $('#inputName').val(customer.getName());
        $('#inputContact').val(customer.getPhone());
        $('#inputEmail').val(customer.getEmail());
        $('#inputAddress').val(customer.getAddress());
    }

    // Optional: highlight selected row
    $(this).addClass("table-primary").siblings().removeClass("table-primary");

});

// ============================== Update Customer ========================================================

$(document).on("click", "#cusUpdate", function() {
    if (!selectedCustomerId) {
        Swal.fire('Error', 'Please select a customer to update!', 'error');
        return;
    }

    let name = $('#inputName').val().trim();
    let contact = $('#inputContact').val().trim();
    let email = $('#inputEmail').val().trim();
    let address = $('#inputAddress').val().trim();

    if (!name || !contact || !email || !address){
        Swal.fire('Warning', 'Please fill all fields!', 'warning');
        return;
    }

    let customer = customerDB.find(c => c.getId() === selectedCustomerId);
    customer.setName(name);
    customer.setPhone(contact);
    customer.setEmail(email);
    customer.setAddress(address);

    Swal.fire('Updated!', 'Customer details updated.', 'success');
    loadTable();

    $('#inputName, #inputContact, #inputEmail, #inputAddress').val('');
    selectedCustomerId = undefined;
});

// ============================== Delete Customer ========================================================

$(document).on("click", "#cusDelete", function() {
    let id = $(this).data('id');

    Swal.fire({
        title: 'Are you sure?',
        text: "This customer will be deleted permanently!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'

    }).then((result) => {
        if (result.isConfirmed) {
            customerDB.splice(customerDB.findIndex(c => c.getId() === id), 1);
            loadTable();
            Swal.fire('Deleted!', 'Customer has been deleted.', 'success');
        }
        $('#inputName, #inputContact, #inputEmail, #inputAddress').val('');

    });
});

// ============================== Search Customer ==============================

$(document).on("click", "#cusSearch", function() {
    let searchText = $('#cusSearchInput').val().trim().toLowerCase();

    if (searchText === "") {
        loadTable(); // reload full table if search box is empty
        return;
    }

    $('#cusTable').empty(); // clear current table

    let filteredCustomers = customerDB.filter(c =>
        c.getId().toLowerCase().includes(searchText) ||
        c.getName().toLowerCase().includes(searchText) ||
        c.getPhone().toLowerCase().includes(searchText) ||
        c.getEmail().toLowerCase().includes(searchText) ||
        c.getAddress().toLowerCase().includes(searchText)
    );

    if (filteredCustomers.length === 0) {
        $('#cusTable').append('<tr><td colspan="5" class="text-center">No customers found</td></tr>');
        return;
    }

    filteredCustomers.forEach(cus => {
        let row = `
            <tr>
                <td>${cus.getId()}</td>
                <td>${cus.getName()}</td>
                <td>${cus.getPhone()}</td>
                <td>${cus.getEmail()}</td>
                <td>${cus.getAddress()}</td>
            </tr>
        `;
        $('#cusTable').append(row);
    });
});
