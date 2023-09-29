class DOMManager {
    constructor() {
        this._body = document.body;
        this._background = this.createElement("div", {
            id: "background",
            classNames: ["background--light", "background"],
        });
        this._container = this.createElement("div", {
            id: "container",
            classNames: ["container", "container"],
        });

        this._h1 = this.createElement("h1", {
            text: "Todo",
            id: "todo-title",
            classNames: ["todo-title", "container__title"],
        });
    }

    render() {
        this._body.appendChild(this._background);
        this._background.appendChild(this._container);
        this._container.appendChild(this._h1);
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
