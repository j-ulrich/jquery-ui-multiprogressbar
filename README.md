jQuery UI Multi-Progress Bar 1.1.0
==================================

The multiprogressbar plugin provides a progress bar based on the basic jQuery UI progress bar
widget but with the ability to split the progress into parts. Each part got it's own progress
value and can be styled differently by providing class(es).

#### Table of Contents ####
- [Initialization & Usage](#initialization--usage)
	- [Example](#example)
	- [Demos](#demos)
- [Options](#options)
- [Events](#events)
- [Methods](#methods)
- [Requirements](#requirements)
- [Compatibility](#compatibility)
- [Licensing](#licensing)

Initialization & Usage
----------------------
Similar to the basic progress bar, the multiprogressbar is created from a div element. The parts 
of the progress are provided as an array of objects and they are created in the order they appear
within the array. The properties of the part objects are given in the section [Options](#options)
below.

**Note:**
If the sum of the progress values exceeds 100, the progress will be truncated at 100 and the
remaining parts will not be shown.

#### Example: ####
```javascript
// Initialize the multiprogressbar
$('#MultiProgressBarDiv').multiprogressbar({
	parts: [{value: 10, text: true, barClass: 'FirstPartClass'}, // First part: 10% progress, display progress, use class 'FirstPartClass' for the bar
			{value: 20, text: 'Critical', textClass: 'redText'}, // Second part: 20% progress, display the text 'Critical', use class 'redTest' for the text
			{value: 35, barClass: 'ThirdPartClass ExtraClass'}], // Third part: 35% progress, use classes 'ThirdPartClass' and 'ExtraClass' for the bar
	complete: function() { alert('Full!'); } // Bind to the complete event during initialization
});

// Bind to the complete event after initialization
$('#MultiProgressBarDiv').bind('multiprogressbarcomplete', function() { alert('Complete!'); });

// Get the total progress
var total = $('#MultiProgressBarDiv').multiprogressbar('total');
```

#### Demos: ####
The [demo folder](https://github.com/j-ulrich/jquery-ui-multiprogressbar/tree/master/demo) contains a
demonstration of most of the features of the multiprogressbar plugin.

Live demos can be found at [jsFiddle](http://jsfiddle.net/Ignitor/E6UPN/) and [JS Bin](http://jsbin.com/ihizaj/10/edit)
which can also be used to play around with the plugin.

Options
-------
* __disabled__ _{Boolean}_: Disables (`true`) or enables (`false`) the multiprogressbar. Default: `false`
* __parts__ _{Array}_: Array of objects defining the properties of the different parts. The objects
	can have the following properties:
	* __value__ _{Numeric}_: The progress value of the part in percent.
	* [optional] __barClass__ _{String}_: Space separated list of class names to be added to the bar of the part.
	* [optional] __text__ _{String, Boolean}_: Text to be displayed on top of the bar of the part. If text is a
		string, the given text is displayed on top of the bar. If text is true, the current progress
		of the part is shown (rounded down to integer and appended with a percent sign). If text is
		false, no text will be shown (the default).
	* [optional] __textClass__ _{String}_: Space separated list of class names to be added to the text of the part.
	By default, an "empty" progressbar is created, i.e. a progressbar with one part with progress "0".
	
	**Note:** If you want to change a property (e.g. the progress value) of __one__ part, you still have
	to provide __all__ part objects with all their properties since the multiprogressbar is rebuild
	every time the _parts_ option is changed. So in case you only want to change one part, the best
	practice is to either save the array of part objects or retrieve it using
	`.multiprogressbar('option', 'parts')`, then change only that part and then hand over the changed
	array to `.multiprogressbar('option', 'parts', partsArray)`.

Events
------
* __create__ _{multiprogressbarcreate}_: Triggered after the multiprogressbar has been created.
* __change__ _{multiprogressbarchange}_: Triggered after the parts have been changed. The callback is provided
	the arguments `event` and `ui` where `ui.parts` is the new array of part objects. The part objects
	represent the parts like they are actually displayed, i.e. if the parts are truncated, the value of
	the truncated parts will be smaller than originally provided or will even be zero if the corresponding
	part is not visible at all.
	**Note:** This event is triggered even when there was no real change in the properties of the
	parts (i.e. the event is triggered without checking whether one of the parts actually changed).
* __complete__ _{multiprogressbarcomplete}_: Triggered when the sum of the progress of the parts equals
	or exceeds 100. This event is triggered after the `change` event is triggered.

Methods
-------
* __destroy__: Removes the multiprogressbar functionality completely. This will return the element back
	to its pre-init state.
	- Synopsis: `.multiprogressbar("destroy")`
* __disable__: Disables the multiprogressbar.
	- Synopsis: `.multiprogressbar("disable")`
* __enable__: Enalbes the multiprogressbar.
	- Synopsis: `.multiprogressbar("enable")`
* __option__: Get or set any multiprogressbar option. If no value is specified, will act as a getter.
	- Synopsis: `.multiprogressbar("option", optionName, [value])`
	- Parameters:
		* __optionName__ _{String}_: Name of the option to be set/returned.
		* [optional] __value__ _{?}_: The new value for the option. The type depends on the option to be set.
	- Returns _{?}_: The current value of the option if the function is used as a getter (i.e.
		if _value_ is omitted). The type depends on the option. Returns the jQuery object if the function is
		used as a setter.
* __option__: Set multiple multiprogressbar options at once by providing an options object.
	- Synopsis: `.multiprogressbar("option", options)`
	- Parameters:
		* __options__ _{Object}_: An option object consisting of the options to be set as properties
			and the values as the property values.
* __widget__: Returns the `.ui-multiprogressbar` element.
	- Synopsis: `.multiprogressbar("widget")`
	- Returns _{Object}_: The `.ui-multiprogressbar` element.
* __total__: Returns the sum of the progress of all parts
	- Synopsis: `.multiprogressbar("total")`
	- Returns _{Numeric}_: The total progress (i.e. sum of the progress of the visible parts) in the
		range [0,100].

Requirements
------------
The plugin requires
* [jQuery 1.4.1+](http://jquery.com)
* [jQuery UI 1.8.0+](http://jqueryui.com) (including the progressbar widget)
* an "outerHTML" jQuery plugin like the one from Ca-Phun Ung (http://www.yelotofu.com/2008/08/jquery-outerhtml) that
provides the outer HTML using a method with the name `outerHTML`

Compatibility
-------------
The plugin has been successfully tested with jQuery 1.7.2 and jQuery UI 1.8.20 and it should be
compatible with future versions as long as the implementation of the jQuery UI progressbar does
not change significantly.

The plugin has also been tested to be compatible with jQuery Mobile 1.1.0 (using the jQuery UI
progressbar widget) and it should be compatible with future versions as long as jQuery Mobile does
not introduce a progressbar widget that significantly differs from the one provided by jQuery UI.

Licensing
---------
Copyright &copy; 2012 Jochen Ulrich
http://github.com/j-ulrich/jquery-ui-multiprogressbar

Licensed under the [MIT license](http://opensource.org/licenses/MIT).

