class InlineSelect {
    submitBtnCls = 'inline-submit';
    cancelBtnCls = 'inline-cancel';

    constructor(element, options = {}) {
        this.element = element;
        this.options = options;
        this.isChanged = false;
        this.initialValue = this.element.innerHTML;

        this._initOptions();
        this._activateViewMode();
    }

    _initOptions() {
        const getOpt = (name, default_value) => {
            return this[name] = this.element.dataset?.[name] ?? this.options?.[name] ?? default_value;
        }
        const getOptBool = (name, default_value) => {
            getOpt(name, default_value);
            if(typeof this[ name ] != "boolean"){
                if(this[ name ] == "true") {
                    this[ name ] = true;
                } else if(this[ name ] == "false") {
                    this[ name ] = false;
                } else {
                    this[ name ] = default_value;
                }
            }
            return this[ name ];
        }
        getOpt("value", this.element.dataset.value);
        getOpt("name", this.element.id);
        getOpt("url", null);
        getOpt("source", []);
        if(typeof this.source == "string" && this.source != ""){
            this.source = JSON.parse(this.source);
        }
        getOptBool("debug", false);
        if(this["debug"]) {
            console.log({url: this["url"], name: this["name"], value: this["value"], source: this.source});
        }
    }

    _activateViewMode() {
        this.element.innerHTML = this._createViewerHTML();
        this._getActivateWidgetBtn().addEventListener("click", () => {
            this._activateEditMode();
        });
    }

    _activateEditMode() {
        // if(this["debug"]) console.log(this['value']);
        this.element.innerHTML = this._createWidgetHTML();
        this._getWidgetSubmitBtn().addEventListener("click", async () => {
            await this._widgetSubmitBtnHandler();
        });
        this._getWidgetCancelBtn().addEventListener("click", () => {
            this._widgetCancelBtnHandler();
        });
    }

    async _widgetSubmitBtnHandler() {
        let formData = new FormData();
        let selectEl = this._getWidgetSelectEl();
        formData.set(this.name,  selectEl.value);
        if(this["debug"]) console.log(`url = ${this.url}, formData = ${formData}`);
        let response = await fetch(this.url, {
            method: 'PATCH',
            body: formData
        });
        if (response.ok) {
            let success = await response.text();
            if(this["debug"]) console.log(`success: ${success}`);
            showSuccess('Die Änderung wurde gespeichert');
            // restore viewer with selection from widget
            this.value = selectEl.value;
            this.isChanged = true;
            this._activateViewMode();
        } else {
            let error= await response.text();
            if(this["debug"]) console.log(`error: ${error}`);
            showError(`Es ist ein Fehler aufgetreten: <br>${error}`);
        }
    }

    _widgetCancelBtnHandler() {
        this._activateViewMode();
    }

    _getWidgetSelectEl() {
        return this.element.getElementsByTagName('select')[0];
    }

    _getActivateWidgetBtn() {
        return this.element.getElementsByTagName('a')[0];
    }

    _getWidgetSubmitBtn() {
        return this.element.getElementsByClassName(this.submitBtnCls)[0];
    }

    _getWidgetCancelBtn() {
        return this.element.getElementsByClassName(this.cancelBtnCls)[0];
    }

    /*
         Create HTML of select widget, consisting of select element and two icon buttons, included and aligned in the parent DIV.

         Input:
            this.source - list of option
            this.value - current value
            this.submitBtnCls - submit button css class
            this.cancelBtnCls - cancel button css class
        */
    _createWidgetHTML() {
        const optionsTemplate = this.source.map(item => `<option value="${item.value}" ${item.value == this['value']?'selected':''}>${item.text}</option>`).join('');
        return `
            <div class="d-flex">
                <select name="${this.name}" class="form-select flex-grow-1">
                    ${optionsTemplate}
                </select>
                <a href="#" class="btn btn-primary ${this.submitBtnCls} ms-2"><i class="ion ion-md-checkmark"></i></a>
                <a href="#" class="btn btn-light ${this.cancelBtnCls} ms-1"><i class="ion ion-md-close"></i></a>
            </div>
        `;
    }

    _createViewerHTML() {
        // Overwrite element only if it's value was changed from widget.
        // This supports a case, when an initial value is not in the list of options.
        let text = this.isChanged? this._getFromSourceByValue(): this.initialValue;
        return `<span>${text}</span><span class="ms-2"><a href="#"><i class="align-middle fas fa-fw fa-pen pb-1"></i></a></span>`;
    }

    _getFromSourceByValue(val = this.value) {
        let currentSourceItem = this.source.find((s) => s.value == val);
        if(this.debug) console.log(`currentSourceItem = ${currentSourceItem}`);
        if(currentSourceItem === undefined) {
            return '';
        } else {
            return currentSourceItem.text;
        }
    }
}
