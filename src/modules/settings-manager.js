import { pubsub } from "../pubsub.js";

export default class SettingsManager {
    constructor() {
        this.themes = ['light', 'dark'];
        this.primary_theme = this.themes[0];
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("themeBtnClicked", this.toggleTheme);
    }

    toggleTheme = () => {
        if (this.primary_theme == 'light')
            this.primary_theme = this.themes.find(theme => { return theme == 'dark' })
        else
            this.primary_theme = 'light';
        pubsub.publish("toggleTheme", this.primary_theme);
    }

} 
