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
        title: "Customer saved successfully!!",
        icon: "success"
    });

    loadTable();

});


