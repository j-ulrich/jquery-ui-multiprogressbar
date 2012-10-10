/*jslint white: true vars: true browser: true todo: true */
/*jshint camelcase:true, plusplus:true, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, maxerr:100, white:false, onevar:false */
/*global jQuery:true $:true */

(function ($, undefined) {
	"use strict";

$(document).ready(function() {
	
	test("basic markup expansion", function() {
		var testElement = $('#multiprogressbartest');
		var parts = [{value: 10},
					{value: 30},
					{value: 15}];
		testElement.multiprogressbar({
			parts: parts
		});
		ok(testElement.hasClass("ju-multiprogressbar"), 'Verify the expansion worked at all');
		
		var partElements = testElement.children(".ui-progressbar-value");
		strictEqual(partElements.length, 3, 'Verify the parts have been created');
		var testElementWidth = testElement.width();
		partElements.each(function(index, partElement) {
			var percentualWidth = Math.round($(partElement).width() / testElementWidth * 100);
			strictEqual(percentualWidth, parts[index].value, 'Verify the width of part '+index+' is correct');
		});
	});
	
	module("option tests");
	test("part text markup", function() {
		var testElement = $('#multiprogressbartest');
		var parts = [{value: 17, text: true},
					{value: 5, text: false},
					{value: 8},
					{value: 31, text: 'Foo'}];
		testElement.multiprogressbar({
			parts: parts
		});
		equal(testElement.text(),"17%Foo", 'Verify that there is no text other than the expected text');
		
		var partElements = testElement.children('.ui-progressbar-value');
		partElements.each(function(index, partElement) {
			if (parts[index].text) {
				strictEqual($(partElement).children('.ju-multiprogressbar-valuetext').length, 1, 'Verify part '+index+' has a value text');
				if (parts[index].text === true) {
					strictEqual($(partElement).text(), parts[index].value+"%", 'The text of the part should be its progress value');
				}
				else if (parts[index].text){
					strictEqual($(partElement).text(), parts[index].text, 'The text of the part is a custom text');
				}
			}
			else {
				strictEqual($(partElement).text(), "", 'The part should not contain text');
			}
		});
	});
	
	test("part styling", function() {
		var testElement = $('#multiprogressbartest');
		var parts = [{value: 10, barClass: "bar1 bar2", text: true, textClass:"text1 text2"}];
		testElement.multiprogressbar({
			parts: parts
		});
		
		ok(testElement.children('.ui-progressbar-value').first().hasClass("bar1"), 'Verify the classes were added to the bar');
		ok(testElement.children('.ui-progressbar-value').first().hasClass("bar2"), 'Verify the classes were added to the bar');
		ok(testElement.find('.ju-multiprogressbar-valuetext').first().hasClass("text1"), 'Verify the classes were added to the text');
		ok(testElement.find('.ju-multiprogressbar-valuetext').first().hasClass("text2"), 'Verify the classes were added to the text');
	});
	
	test("changing settings after creation", function() {
		var testElement = $('#multiprogressbartest');
		testElement.multiprogressbar(); // Empty progressbar
		strictEqual(testElement.children('.ui-progressbar-value').length, 1, 'Verify the progressbar contains one part');
		strictEqual(parseInt(testElement.children('.ui-progressbar-value').first().css("width"),10), 0, 'Verify the one part is empty');
		
		var parts = [{value: 10, text: true},
					{value: 7, text: true}];
		testElement.multiprogressbar('option', 'parts', parts);
		strictEqual(testElement.children('.ui-progressbar-value').length, 2, 'Verify that there are two parts now');
		strictEqual(testElement.text(), '10%7%', 'Verify the parts have the correct width (verified via part text)');
	});
	
	module('event tests', {
		teardown: function() {
			$('#qunit-fixture .ju-multiprogressbar').die();
		}
	});
	test("event triggering", function() {
		var expectedEvents = [ ];
		var expectedEventsIndex = 0;
		
		$('#qunit-fixture .ju-multiprogressbar').live('multiprogressbarcreate', function() {
			strictEqual('create', expectedEvents[expectedEventsIndex], "create triggered");
			expectedEventsIndex += 1;
		});
		$('#qunit-fixture .ju-multiprogressbar').live('multiprogressbarchange', function() {
			strictEqual('change', expectedEvents[expectedEventsIndex], "change triggered");
			expectedEventsIndex += 1;
		});
		$('#qunit-fixture .ju-multiprogressbar').live('multiprogressbarcomplete', function() {
			strictEqual('complete', expectedEvents[expectedEventsIndex], "complete triggered");
			expectedEventsIndex += 1;
		});

		var testElement = $('#multiprogressbartest');
		// Trigger create
		expectedEvents.push('create');
		testElement.multiprogressbar({parts: [{value: 10}]});
		
		// Trigger change
		expectedEvents.push('change');
		testElement.multiprogressbar('option', 'parts', [{value: 5}]);
		
		// Trigger change and then complete
		expectedEvents.push('change', 'complete');
		testElement.multiprogressbar('option', 'parts', [{value: 50}, {value: 50}]);
		
		expect(expectedEvents.length);
	});
	
});
	
}(jQuery));