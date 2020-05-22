```

     _|_|_|
   _|
   _|
   _|
     _|_|_|

```

Tiny event helper with a familiar fluent API.

### Installation

`npm install @superstructure.net/c`

### Usage

```
import C from '@superstructure.net/c';

let c = new C();


c
    .on( 'click', '.ui-element', onClick )
    .on( 'mouseenter', '.ui-element', onMouseEnter, { capture: true } )
    .on( 'module/change', null, onChange );

c.trigger( 'module/change', data );

c.off();

```

### API

#### `on( type, selector = document, handler = () => {}, options = {} )`

Register event.

`type`: `click`, `customEvent` ...

`selector`: Selector, `document` or `window`. Default: `document`.

`handler`: `function( event )`. For delegated events find the event target in `event.actualTarget`.

`options`: Options passed to addEventListener.

#### `once( type, selector = document, handler = () => {}, options = {} )`

Same as `.on()` but triggers only once.

#### `off(type, selector = null, handler = null, options = null)`

Remove events registered with this instance.

`off( type, selector, handler, options )`: Remove events that match all parameters.

`off( type, selector )`: Remove events registered to the elements matching the selector.

`off( type )`: Remove events of given type.

`off()`: Remove all events registered with this instance.

#### `trigger(type, data = {}, element = root)`

Trigger `type` event. `data` object and event target are optional.
