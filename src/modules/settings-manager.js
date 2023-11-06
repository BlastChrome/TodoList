import { pubsub } from "../pubsub.js";

export default class SettingsManager {
    constructor() {
        this.theme = 'light';
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("themeBtnClicked", this.toggleTheme);
    }

    toggleTheme = () => {
        this.theme == 'light' ? this.theme = 'dark' : this.theme = 'light';
        pubsub.publish("toggleTheme", this.theme);
    }

} 
