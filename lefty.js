(function($) {
	jQuery.fn.leftClick = function(func) {
		this.on('mousedown', function(e) {
			if (e.which === 1) {
				if (func) func();
				else console.log('left click');
			} else console.log('middle/right click');
		});
        return this;
	};
} (jQuery));