export class OrderDTO {

    #orderId
    #customerId
    #itemId
    #date
    #amount

    constructor(orderId, customerId, itemId, date, amount) {
        this.#orderId = orderId;
        this.#customerId = customerId;
        this.#itemId = itemId;
        this.#date = date;
        this.#amount = amount;
    }

    getOrderId() {
        return this.#orderId;
    }

    getCustomerId() {
        return this.#customerId;
    }

    getItemId() {
        return this.#itemId;
    }

    getDate(){
        return this.#date;
    }

    getAmount() {
        return this.#amount;
    }

    setOrderId(orderId) {
        this.#orderId = orderId;
    }

    setCustomerId(customerId) {
        this.#customerId = customerId;
    }

    setItemId(itemId) {
        this.#itemId = itemId;
    }
    setDate(date){
        this.#date = date;
    }

    setAmount(amount) {
        this.#amount = amount;
    }
}
