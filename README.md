```

     _|_|_|
   _|
   _|
   _|
     _|_|_|

```

Tiny event helper with a familiar fluent API.

### Features

+ Supports native and custom events
+ Event delegation by default
+ Batch removal of events by type, selector or C instance
+ Available as ES6 module 


### Installation

`npm install @superstructure.net/c`

### Usage

```
import C from '@superstructure.net/c';

let c = new C();

// add events
c
    .on( 'click', '.ui-element', onClick )
    .on( 'mouseenter', '.ui-element', onMouseEnter, { capture: true } )
    .on( 'myModule/ready', null, onModuleReady );

// trigger custom event
c.trigger( 'myModule/ready', data );

// remove all events
c.off();

```

### API

#### `new C( root = document )` 

Create a new C instance. 
Listeners are attached to the `root` element. Default: `document`.

#### `on( type, selector = document, handler = () => {}, options = {} )`

Add event to the instance.

`type`: Native or custom event name like `click`, `myModule/ready` ...

`selector`: CSS selector, `document` or `window`. Default: `document`.

`handler`: `( event ) => {}`. Event handler. For delegated events find the event target in `event.actualTarget`.

`options`: Options passed to native `addEventListener()`. Optional.

#### `once( type, selector = document, handler = () => {}, options = {} )`

Same as `on()` but triggers only once.

#### `off(type, selector = null, handler = null, options = null)`

Remove event(s) from the instance.

`off( type, selector, handler, options )`: Remove events that match all parameters.

`off( type, selector )`: Remove events registered with `type` and `selector`.

`off( type )`: Remove events registered with `type`.

`off()`: Remove all events added to this instance.

#### `trigger(type, data = {}, target = root)`

Trigger event of `type`. `data` and event target are optional.
