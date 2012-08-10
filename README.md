jQuery UI Multi-Progress Bar
============================

The multiprogressbar plugin provides a progress bar based on the basic jQuery UI progress bar
widget but with the ability to split the progress into parts. Each part got it's own progress
value and can be styled differently by providing class(es).

Initialization
--------------
Similar to the basic progress bar, the multiprogressbar is created from a div element. The parts 
of the progress are provided as an array of objects and they are created in the order they appear
within the array. The properties of the part objects are given in the section [Options](#Options)
below.

#### Note: ####
If the sum of the progress values exceeds 100, the progress will be truncated at 100 and the
remaining parts will not be shown.

Options
-------
* disabled {Boolean}: Disables (`true`) or enables (`false`) the multiprogressbar. Default: `false`
* parts {Array}: Array of objects defining the properties of the different parts. The objects
	can have the following properties:
	* value {Numeric}: The progress value of the part in percent (required).
	* barClass {String}: Space separated list of class names to be added to the bar of the part.
	* text {String, Boolean}: Text to be displayed on top of the bar of the part. If text is a
		string, the given text is displayed on top of the bar. If text is true, the current progress
		of the part is shown (rounded down to integer and appended with a percent sign). If text is
		false, no text will be shown (the default).
	* textClass {String}: Space separated list of class names to be added to the text of the part.
	By default, an "empty" progressbar is created, i.e. a progressbar with one part with progress "0".

Events
------
* create {multiprogressbarcreate}: Triggered when the progressbar was created
* change {multiprogressbarchange}: Triggered when the parts are changed
* complete {multiprogressbarcomplete}: Triggered  when the sum of the progress of the parts equals
	or exceeds 100

Methods
-------
* destroy: Removes the multiprogressbar functionality completely. This will return the element back
	to its pre-init state.
	Synopsis: `.multiprogressbar("destroy")`
* disable: Disables the multiprogressbar.
	Synopsis: `.multiprogressbar("disable")`
* enable: Enalbes the multiprogressbar.
	Synopsis: `.multiprogressbar("enable")`
* option: Get or set any multiprogressbar option. If no value is specified, will act as a getter.
	Synopsis: `.multiprogressbar("option", optionName, [value])`
* option: Set multiple multiprogressbar options at once by providing an options object.
	Synopsis: `.multiprogressbar("option", options)`
* widget: Returns the .ui-multiprogressbar element.
	Synopsis: `.multiprogressbar("widget")`
* total: Returns the sum of the progress of all parts
	Synopsis: `.multiprogressbar("total")`

Example usage
-------------
```javascript
$('#MultiProgressBarDiv').multiprogressbar({parts: [{value: 10, barClass: 'FirstPartClass', text: true}, {value: 20, text: 'Critical', textClass: 'redText'}, {value: 35, barClass: 'ThirdPartClass ExtraClass'}]});
```

Requirements
------------
The plugin requires jQuery, jQuery UI 1.8 (including the progressbar widget) and an "outerHTML"
jQuery plugin like the one from Ca-Phun Ung (http://www.yelotofu.com/2008/08/jquery-outerhtml/) that
provides the outer HTML using a method called "outerHTML".

Compatiblity
------------
The plugin has been successfully tested with jQuery 1.7.2 and jQuery UI 1.8.20 and it should be
compatible with future versions as long as the implementation of the jQuery UI progressbar does
not change significantly.

The plugin has also been tested to be compatible with jQuery Mobile 1.1.0 (using the jQuery UI
progressbar widget) and it should be compatible with future versions as long as jQuery Mobile does
not introduce a progressbar widget that significantly differs from the one provided by jQuery UI.

Licensing
---------
Copyright (c) 2012 Jochen Ulrich <jochenulrich@t-online.de>
Licensed under the [MIT license](http://opensource.org/licenses/MIT).

