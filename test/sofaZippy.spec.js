'use strict';

describe('sofa.zippy', function () {

    var element, $compile, $rootScope;

    beforeEach(module('sofa.zippy'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should be closed by default', function () {
        element = $compile('<sofa-zippy caption="hello"></sofa-zippy>')($rootScope);
        $rootScope.$digest();
        expect(element.hasClass('sofa-zippy--closed')).toBe(true);
    });

    it('should be opened when initial value is true', function () {
        element = $compile('<sofa-zippy init-opened="true" caption="hello"></sofa-zippy>')($rootScope);
        $rootScope.$digest();
        expect(element.hasClass('sofa-zippy--opened')).toBe(true);
    });

    it('should be closed when initial value is false', function () {
        element = $compile('<sofa-zippy init-opened="false" caption="hello"></sofa-zippy>')($rootScope);
        $rootScope.$digest();
        expect(element.hasClass('sofa-zippy--closed')).toBe(true);
    });

    it('should open when caption is clicked', function () {
        element = $compile('<sofa-zippy init-opened="false" caption="hello"></sofa-zippy>')($rootScope);
        $rootScope.$digest();
        var caption = angular.element(element.find('div')[0]);
        caption.triggerHandler('click');
        expect(element.hasClass('sofa-zippy--opened')).toBe(true);
    });

    it('should close when caption is clicked', function () {
        element = $compile('<sofa-zippy init-opened="true" caption="hello"></sofa-zippy>')($rootScope);
        $rootScope.$digest();
        var caption = angular.element(element.find('div')[0]);
        caption.triggerHandler('click');
        expect(element.hasClass('sofa-zippy--closed')).toBe(true);
    });

    it('should change state when `openend` property changes', function () {
        element = $compile('<sofa-zippy init-opened="false" opened="opened" caption="hello"></sofa-zippy>')($rootScope);
        $rootScope.$digest();
        expect(element.hasClass('sofa-zippy--closed')).toBe(true);
        $rootScope.opened = true;
        $rootScope.$digest();
        expect(element.hasClass('sofa-zippy--opened')).toBe(true);
    });
});
