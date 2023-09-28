class DOMManager {
    constructor() {
        this.body = document.body;
        this.mainContainer = this.createElement("div", {
            id: "main-container",
            classNames: ["main-container", "container"],
        });
        this.innerContainer = this.createElement("div", {
            id: "inner-container",
            classNames: ["inner-container", "container"],
        });
        this.background = this.createElement("div", {
            id: "background",
            classNames: ["background"],
        });
        this.h1 = this.createElement("h1", {
            text: "Todo",
            id: "todo-title",
            classNames: ["todo-title"],
        });
        this.render();
    }

    render() {
        this.body.appendChild(this.mainContainer);
        this.mainContainer.appendChild(this.background);
        this.mainContainer.appendChild(this.innerContainer);
        this.innerContainer.appendChild(this.h1);
    }

    createElement(tagName, options = {}) {
        const element = document.createElement(tagName);

        if (options.text) {
            element.innerText = options.text;
        }

        if (options.classNames && options.classNames.length > 0) {
            options.classNames.forEach(cssClass => element.classList.add(cssClass));
        }

        if (options.id) {
            element.id = options.id;
        }

        return element;
    }

    addButton(parent, text, clickHandler) {
        const button = this.createElement("button", { text });
        button.addEventListener('click', clickHandler);
        parent.appendChild(button);
    }
}

export default DOMManager;
