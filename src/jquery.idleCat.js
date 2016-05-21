/**
 * jQuery IdleCat: An idling detection plugin.
 * @author Premysl Karbula
 */
;(function($, window, document) {

	var pluginName = 'idleCat';
	var defaults = {

		// Number of seconds to wait between two scans of user activity.
		interval: 20,

		// How many seconds to hold the activity from the moment of knowing
		// there was not any activity.
		release: 360,

		// The default state of the idleness (use 'active' or 'idle').
		state: 'active',

		// Should the callbacks be fired upon plugin initialization,
		// according to the default 'state'?
		fireOnInit: true,

		// Callback fired after the discovery of user activity on the page.
		activeCallback: function() {},

		// Callback fired after the discovery of used idleness on the page.
		// (+ number of seconds defined in the 'release' property)
		idleCallback: function() {},

	};

	var jqDocument = $(document);

	var mouseX = null;
	var mouseY = null;
	var oldMouseX = null;
	var oldMouseY = null;

	// Constructor
	function Plugin(element, options) {

		this.e = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		// Define nonshared properties
		this.state = this.options.state;
		this.release = this.options.release || 0;
		this.releaseTimer = false;

		this.init();

	}

	Plugin.prototype.init = function() {

		if (this.options.fireOnInit) {
			if (this.state == 'active') {
				this.options.activeCallback.call(this.e);
			} else if (this.state == 'idle') {
				this.options.idleCallback.call(this.e);
			}
		}

		this.handleInterval();

	};

	Plugin.prototype.handleInterval = function() {

		// Set current state
		this.handleDetection();

		// Refresh state every interval
		window.setInterval(

			// Handle the 'wrong' this inside window interval callback
			(function(self) {
				return function() {
					self.handleDetection();
				};
			})(this),

			this.options.interval * 1000);

	};

	Plugin.prototype.handleDetection = function() {

		if (this.detectMovement()) {

			if (this.state == 'idle')
				this.options.activeCallback.call(this.e);

			this.state = 'active';

			// Going active, clear any existing release timers
			if (this.releaseTimer)
				window.clearTimeout(this.releaseTimer);

		} else {

			if (this.state == 'active') {

				self = this;

				// Going to idle after a release time (can be 0).
				// We set the release timer.
				this.releaseTimer = window.setTimeout(function() {

					self.options.idleCallback.call(self.e);
					self.state = 'idle';

				}, this.options.release * 1000);

				// And change state so the timer won't
				// be created multiple times
				this.state = 'releasing';

			}

		}

	};

	Plugin.prototype.detectMovement = function() {

		jqDocument.one("mousemove", function (event) {
			mouseX = event.pageX;
			mouseY = event.pageY;
		});

		//console.log(mouseX, mouseY);
		var movement = (mouseX != oldMouseX) || (mouseY != oldMouseY);

		oldMouseX = mouseX;
		oldMouseY = mouseY;

		return movement;

	};

	Plugin.prototype.getState = function() {
		return this.state;
	};

	$.fn[pluginName] = function(options) {

		var instance;

		this.each(function() {

			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
				instance = new Plugin(this, options));
			}

		});

		return instance;

	};

})(jQuery, window, document);
