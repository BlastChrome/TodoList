import { pubsub } from "../pubsub.js";

export default class TodoForm {
    constructor() {
        this.subscribe()
    }

    subscribe = () => {
        pubsub.subscribe("validateInput", this.validateFormInput)
    }

    validateFormInput = text => {
        if (text.length <= 0) return;
        pubsub.publish("inputValidated", text);
    }

}