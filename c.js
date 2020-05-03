/**
 * 
     _|_|_|  
   _|        
   _|        
   _|        
     _|_|_| 

C

Tiny event helper with a familiar fluent API.

 * 
 */

export default class C {
    constructor(root = document) {
        this.root = root;
        this.events = [];
    }

    on(type, selector = document, handler = () => {}, options = {}) {
        if (!type) {
            return this;
        }

        let _event = {};
        _event['type'] = type;
        _event['selector'] = selector;
        _event['options'] = options;
        _event['originalHandler'] = handler;
        _event['handler'] = () => {
            // if no selector or selector is root element,
            // directly call handler
            if (!selector || selector === document || selector === window) {
                handler.call(this, event);
                // if selector is present and event is not bubbled up o the root
            } else if (event.target !== document) {
                // target === selector
                if (event.target.matches(selector)) {
                    handler.call(this, event);

                    // target is child of selector AND we are not in the capture phase
                } else if (event.target.closest && event.target.closest(selector) && !options.capture) {
                    event.actualTarget = event.target.closest(selector);

                    handler.call(this, event);
                }
            }
        };
        _event['handler'].bind(this);

        this.root.addEventListener(type, _event['handler'], options);

        this.events.push(_event);

        return this;
    }

    off(type, selector = null, handler = null, options = null) {
        console.log(this.events);

        // why while?
        // https://stackoverflow.com/a/24813338/2799523
        let index = this.events.length - 1;
        while (index >= 0) {
            let event = this.events[index];

            console.log('comparing type', event['type'], type, !type || event['type'] == type);
            console.log('comparing selector', event['selector'], selector, !selector || event['selector'] == selector);
            console.log(
                'comparing handler',
                event['originalHandler'],
                handler,
                !handler || event['originalHandler'] == handler
            );
            console.log(
                'comparing options',
                event['options'],
                options,
                !options || JSON.stringify(event['options']) == JSON.stringify(options)
            );

            if (
                (!type || event['type'] === type) &&
                (!selector || event['selector'] === selector) &&
                (!handler || event['originalHandler'] === handler) &&
                (!options || JSON.stringify(event['options']) === JSON.stringify(options))
            ) {
                this.root.removeEventListener(event['type'], event['handler'], event['options']);

                this.events.splice(index, 1);
            }

            index--;
        }

        console.log(this.events);

        return this;
    }

    trigger(type, data = {}, element = this.root) {
        if (!type) {
            return this;
        }

        let _event = new CustomEvent(type, {
            bubbles: true,
            detail: data,
        });

        element.dispatchEvent(_event);

        return this;
    }
}
