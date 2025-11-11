import {itemDB} from "../DB/ItemDB.js";
import {ItemDTO} from "../DTO/ItemDTO.js";

// ============================== Generate Item ID ================================================

const generateItemId = () => {
    if (itemDB.length === 0){
        return "I001";
    }
    let lastId = itemDB[itemDB.length-1].getId();
    let number = parseInt(lastId.substring(1));
    number++;
    return "I" + number.toString().padStart(3, "0");
};

// ============================== Load Item Table Data  ================================================

const loadItemTable = () => {

    $('#itemTable').empty();

    itemDB.forEach(cus => {
        let row = `
            <tr>
                <td>${cus.getId()}</td>
                <td>${cus.getItemName()}</td>
                <td>${cus.getPrice()}</td>
                <td>${cus.getQty()}</td>
                <td>${cus.getDescription()}</td>
            </tr>
        `;
        $('#itemTable').append(row);
    });

};

// ============================== Save Item (button)================================================

let selectedItemId = undefined;

$(document).on("click", "#itemSave", function (){

    let itemName = $('#inputItemName').val();
    let price = $('#inputPrice').val();
    let qty = $('#inputQuantity').val();
    let description = $('#inputDes').val();

    if (itemName === '' || price === '' || qty === '' || description === ''){

        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill all the fields!',
        });
        return;
    }

    itemDB.push(new ItemDTO(generateItemId(), itemName, price, qty, description));

    Swal.fire({
        title: "Saved!",
        text:"Item Saved Successfully.",
        icon: "success"
    });

    loadItemTable();
    /*========== Clear text fields ============*/
    $('#inputItemName, #inputPrice, #inputQuantity, #inputDes').val('');


});

// ============================== Select Customer from Table ==============================

$(document).on("click", "#itemTable tr", function() {
    let id = $(this).children("td:eq(0)").text(); // Get ID from first column
    let item = itemDB.find(c => c.getId() === id);

    if (item) {
        selectedItemId = id; // Save selected customer ID
        $('#inputItemName').val(item.getItemName());
        $('#inputPrice').val(item.getPrice());
        $('#inputQuantity').val(item.getQty());
        $('#inputDes').val(item.getDescription());
    }

    // Optional: highlight selected row
    $(this).addClass("table-primary").siblings().removeClass("table-primary");

});

// ============================== Update Customer ========================================================

$(document).on("click", "#itemUpdate", function() {
    if (!selectedItemId) {
        Swal.fire('Error', 'Please select a item to update!', 'error');
        return;
    }

    let itemName = $('#inputItemName').val().trim();
    let price = $('#inputPrice').val().trim();
    let qty = $('#inputPrice').val().trim();
    let description = $('#inputDes').val().trim();

    if (!itemName || !price || !qty || !description){
        Swal.fire('Warning', 'Please fill all fields!', 'warning');
        return;
    }

    let item = itemDB.find(c => c.getId() === selectedItemId);
    item.setItemName(itemName);
    item.setPrice(price);
    item.setQty(qty);
    item.setDescription(description);

    Swal.fire('Updated!', 'item details updated.', 'success');
    loadItemTable();

    $('#inputItemName, #inputPrice, #inputQuantity, #inputDes').val('');
    selectedItemId = undefined;
});

// ============================== Delete Customer ========================================================

$(document).on("click", "#itemDelete", function() {
    let id = $(this).data('id');

    Swal.fire({
        title: 'Are you sure?',
        text: "This Item will be deleted permanently!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'

    }).then((result) => {
        if (result.isConfirmed) {
            itemDB.splice(itemDB.findIndex(c => c.getId() === id), 1);
            loadItemTable();
            Swal.fire('Deleted!', 'Item has been deleted.', 'success');
        }
        $('#inputItemName, #inputPrice, #inputQuantity, #inputDes').val('');

    });
});

// ============================== Search Customer ==============================

$(document).on("click", "#itemSearch", function() {
    let searchText = $('#itemSearchInput').val().trim().toLowerCase();

    if (searchText === "") {
        loadItemTable(); // reload full table if search box is empty
        return;
    }

    $('#itemTable').empty(); // clear current table

    let filteredItems = itemDB.filter(c =>
        c.getId().toLowerCase().includes(searchText) ||
        c.getItemName().toLowerCase().includes(searchText) ||
        c.getPrice().toLowerCase().includes(searchText) ||
        c.getQty().toLowerCase().includes(searchText) ||
        c.getDescription().toLowerCase().includes(searchText)
    );

    if (filteredItems.length === 0) {
        $('#itemTable').append('<tr><td colspan="5" class="text-center">No Items found</td></tr>');
        return;
    }

    filteredItems.forEach(cus => {
        let row = `
            <tr>
                <td>${cus.getId()}</td>
                <td>${cus.getItemName()}</td>
                <td>${cus.getPrice()}</td>
                <td>${cus.getQty()}</td>
                <td>${cus.getDescription()}</td>
            </tr>
        `;
        $('#itemTable').append(row);
    });
});
