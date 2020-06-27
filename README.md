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

#### `new C( root = document )` 

Create a new C instance. 
Listeners are attached to the `root` element. Default: `document`.

#### `on( type, selector = document, handler = () => {}, options = {} )`

Add event to the instance.

`type`: Native or custom event name like `click`, `customEvent` ...

`selector`: CSS selector, `document` or `window`. Default: `document`.

`handler`: `( event ) => {}`. Event handler. For delegated events find the event target in `event.actualTarget`.

`options`: Options passed to native `addEventListener()`.

#### `once( type, selector = document, handler = () => {}, options = {} )`

Same as `on()` but triggers only once.

#### `off(type, selector = null, handler = null, options = null)`

Remove event(s) from the instance.

`off( type, selector, handler, options )`: Remove events that match all parameters.

`off( type, selector )`: Remove events registered with `selector`.

`off( type )`: Remove events registered with `type`.

`off()`: Remove all events added to this instance.

#### `trigger(type, data = {}, element = root)`

Trigger event of `type`. `data` and event target are optional.
