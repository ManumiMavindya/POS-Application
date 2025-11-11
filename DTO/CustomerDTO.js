export class CustomerDTO {
    #id
    #name
    #phone
    #email
    #address

    constructor(id, name, phone, email, address) {
        this.#id=id;
        this.#name=name;
        this.#phone=phone;
        this.#email=email;
        this.#address=address;
    }

    getId(){
        return this.#id;
    }
    getName(){
        return this.#name;
    }
    getPhone(){
        return this.#phone;
    }
    getEmail(){
        return this.#email;
    }
    getAddress(){
        return this.#address;
    }

    setId(id){
        this.#id=id;
    }
    setName(name){
        this.#name=name;
    }
    setPhone(phone){
        this.#phone=phone;
    }
    setEmail(email){
        this.#email=email;
    }
    setAddress(address){
        this.#address=address;
    }
}