# idleCat

Simple and lightweight jQuery plugin for user-presence detection.

## Why?
Have you ever needed to perform a single or periodic task on your page based on user's actual presence? Do you think you really need to fetch new notifications from your servers all the time, or isn't such task quite pointless unless there actually is an active user sitting in front of your page?

*How do you detect user's presence?* The answer is: ***idleCat***.

## Installation
As this is a jQuery plugin, you need jQuery (idleCat was tested on jQuery `1.12.2`), but other than that all you really need is to include the minified script located at `build/jquery.idleCat.js` to your HTML.

```html
...
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script src="./js/jquery.idleCat.min.js"></script>
...	
```

## Usage

```js
// Create an instance of idleCat on a jQuery object.
var instance = $('#status').idleCat({
	
	// Number of seconds to wait between two scans of user activity.
	interval: 2, 
	
	// How many seconds to hold the activity from the moment of knowing there was not any activity.
	release: 2,
	
	// The default state of the idleness (use 'active' or 'idle').
	state: 'idle',
	
	// Callback fired after the discovery of user activity on the page.
	activeCallback: function() { 
		$(this).addClass('active');
	},
	
	// Callback fired after the discovery of used idleness on the page.
	// (+ number of seconds defined in the 'release' property)
	idleCallback: function(element) {
		$(this).removeClass('active'); 
	},
	
	// See below for more options...
	
});

// Log current state from idleCat attached to that jQuery object.
window.setInterval(function() {
	console.log(instance.getState());
}, 1000)
```

### Options
***idleCat*** is configured using a config object passed into the plugin's initializer:

```js
$('#status').idleCat({ ... });
```

#### Available options:

##### interval
  - Default: `20`
  - Number of seconds to wait between two scans of user activity.

##### release
  - Default: `360`
  - *Number of seconds* to hold the activity from the moment of knowing there was not any activity.

##### interval
  - Default: `20`
  - *Number of seconds* to wait between two scans of user activity.

##### state
  - Default: `active`
  - *The default state* of the idleness (use `active` or `idle`).

##### fireOnInit
  - Default: `true`
  - Should the callbacks be fired upon plugin initialization, according to the initial/default 'state'?

##### activeCallback
  - Default: `function() {}`
  - *Callback* fired after the discovery of user activity on the page.
  - The element that has *this* instance of ***idleCat*** attached to it will be passed as the only argument of the callback.

##### idleCallback
  - Default: `function() {}`
  - *Callback* fired after the discovery of used idleness on the page (+ number of seconds defined in the 'release' property.)
  - The element that has *this* instance of ***idleCat*** attached to it will be passed as the only argument of the callback.- 
