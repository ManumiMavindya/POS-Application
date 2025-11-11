export class ItemDTO{

    #id
    #itemName
    #price
    #qty
    #description

    constructor(id, itemName, price, qty, description) {
        this.#id=id;
        this.#itemName=itemName;
        this.#price=price;
        this.#qty=qty;
        this.#description=description;
        }

    getId(){
        return this.#id;
    }
    getItemName(){
        return this.#itemName;
    }
    getPrice(){
        return this.#price;
    }
    getQty(){
        return this.#qty;
    }
    getDescription(){
        return this.#description;
    }

    setId(id){
        this.#id=id;
    }
    setItemName(itemName){
        this.#itemName=itemName;
    }
    setPrice(price){
        this.#price=price;
    }
    setQty(qty){
        this.#qty=qty;
    }
    setDescription(description){
        this.#description=description;
    }
}