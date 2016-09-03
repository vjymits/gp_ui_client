/**
 * 
 */
(function (){
	"use strict";	
	describe("Directive: footer unit test", function() {
		var $compile, $rootScope, $translate;
		beforeEach(module("myApp"));
		
		beforeEach(inject(function(_$compile_, _$rootScope_){
			$compile = _$compile_;
		    $rootScope = _$rootScope_;
		    $translate = {
		    	use: jasmine.createSpy('$translate.use')
		    }
		}));
		
		it("should load the template", function(){
			var element = $compile("<footer-container></footer-container>")($rootScope);
			expect(element.find('footer-container').length).toEqual(0);
		})
	})
}())