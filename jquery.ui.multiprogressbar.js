/*jslint white: true vars: true browser: true todo: true */
/*jshint camelcase:true, plusplus:true, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, maxerr:100, white:false, onevar:false */
/*global noty:true jQuery:true $:true sprintf:true Roundizzle:true */


/*
 * jQuery UI Multi-Progress Bar
 *
 * Copyright (c) 2012 Jochen Ulrich <jochenulrich@t-online.de>
 * Licensed under the MIT license (MIT-LICENSE.txt).
 *
 * The multiprogressbar plugin provides a progress bar based on the basic jQuery UI progress bar
 * widget but with the ability to split the progress into parts. Each part got it's own progress
 * value and can be styled differently by providing class(es).
 * 
 * Initialization:
 * Similar to the basic progress bar, the multiprogressbar is created from a div element. The
 * different parts are provided as an array of objects and they are created in the order they appear
 * within the array. The properties of the part objects are:
 * - value {numeric}: The progress value of the part in percent (required).
 * - barClass {string}: Space separated list of class names to be added to the bar of the part.
 * - text {string, boolean}: Text to be displayed on top of the bar of the part. If text is true, 
 * the current progress of the part is shown (rounded down to integer and appended with a percent
 * sign). If text is false, no text will be shown (the default).
 * - textClass {string}: Space separated list of class names to be added to the text of the part.
 * 
 * If the sum of the progress values exceeds 100, the progress will be truncated at 100 and the
 * remaining parts will not be shown.
 * 
 * Events:
 * - create: when the progressbar was created
 * - change: when the parts are changed
 * - complete: when the sum of the progress of the parts equals or exceeds 100
 * 
 * Methods:
 * - total: Returns the sum of the progress of all parts
 * 
 * Example usage:
 * $('#MultiProgressBarDiv').multiprogressbar({parts: [{value: 10, barClass: 'FirstPartClass', text: true}, {value: 20, text: 'Critical', textClass: 'redText'}, {value: 35, barClass: 'ThirdPartClass ExtraClass'}]});
 * 
 * The plugin requires jQuery, jQuery UI (including the progressbar widget) and an "outerHTML" jQuery
 * plugin like the one from Ca-Phun Ung (http://www.yelotofu.com/2008/08/jquery-outerhtml/) that
 * provides the outer HTML using a method called "outerHTML".
 */

(function($) {
	$.widget("ui.multiprogressbar", {
		
		// Options
		options: {
			parts: [{value: 0, barClass: "", text: "", textClass: ""}]
		},
		
		_create: function() {
			var self = this;
			self.element.progressbar({value: 0}); // Creates one part with width 0%
			self.element.addClass("ui-multiprogressbar");
			
			self._partTemplate = self._getPartElements().outerHTML();
			self._createParts(self.options.parts);
		},
		
		_getPartElements: function() {
			return this.element.children("div.ui-progressbar-value");
		},
		
		_createParts: function(parts) {
			var self = this;
			
			self._getPartElements().remove();
			var first = true;
			var lastVisibleElement = null;
			var totalValue = 0;
			jQuery.each(parts, function(i, part) {
				var partElement = $(self._partTemplate).appendTo(self.element);
				
				if (first === false) {
					partElement.removeClass("ui-corner-left");
				}
				if (part.value > 0 && totalValue < 100) {
					first = false;
					// Check if the part would exceed the 100% and cut it at 100%
					part.value = totalValue+part.value > 100 ? 100-totalValue : part.value; 
					partElement.css('width', part.value+"%").show();
					lastVisibleElement = partElement;
					totalValue += part.value;
				}
				else {
					// Hide part if the progress is <= 0 or if we exceeded 100% already 
					part.value = 0;
					partElement.hide();
				}
				
				partElement.addClass(part.barClass);
				
				if (part.text !== undefined && part.text !== null && part.text !== false) {
					var textForPart;
					if (part.text === true) {
						textForPart = Math.floor(part.value)+"%";
					}
					else if (jQuery.trim(part.text) !== "") {
						textForPart = part.text;
					}
					$('<div></div>').addClass("ui-multiprogressbar-valuetext").text(textForPart).addClass(part.textClass).appendTo(partElement);
				}
			});
			if (totalValue >= 100) {
				// Trigger complete
				self._trigger("complete", null, self.element);
				lastVisibleElement.addClass("ui-corner-right");
			}
			self._trigger("change", null, self.element);
		},
		
		destroy: function() {
			var self = this;
			self._getPartElements().remove();
			self.element.progressbar("destroy");
		},
		
		_setOption: function(option, value) {
			var self = this;
			$.Widget.prototype._setOption.apply( self, arguments );
			
			switch(option) {
			case "parts":
				self._createParts(value);
				break;
			}
		},
		
		/**
		 * @return {numeric} the sum of the progress of all parts.
		 * <b>Note:</b> This sum also includes parts which are not shown because the total progress
		 * is larger than 100. This means, that the returned progress might also be larger than 100.
		 */
		total: function() {
			var self = this;
			var totalValue = 0;
			jQuery.each(self.options.parts, function(i, part) {
				totalValue += part.value;
			});
			
			return totalValue;
		}
	});
}(jQuery));