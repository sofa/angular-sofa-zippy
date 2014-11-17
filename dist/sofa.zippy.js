/**
 * angular-sofa-zippy - v0.1.0 - 2014-11-17
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO).
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {

angular.module('sofa.zippy.templates', ['sofa-zippy.tpl.html']);

angular.module("sofa-zippy.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sofa-zippy.tpl.html",
    "<div class=\"sofa-zippy\">\n" +
    "    <div class=\"sofa-zippy__caption\">\n" +
    "        <span ng-bind=\"caption\"></span>\n" +
    "        <i class=\"sofa-zippy-icon\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"sofa-zippy__content\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module('sofa.zippy', [
    'sofa-zippy.tpl.html'
]);

angular.module('sofa.zippy').directive('sofaZippy', function () {

    'use strict';

    var defaultIfUndefined = function (scope, property, defaultVal) {
        scope[property] = scope[property] === undefined ? defaultVal : scope[property];
    };

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            caption: '=?',
            opened: '=?'
        },
        templateUrl: 'sofa-zippy.tpl.html',
        link: function (scope, $element, attrs) {
            var element = $element[0],
                $caption = angular.element(element.querySelectorAll('.sofa-zippy__caption')[0]),
                $icon = angular.element(element.querySelectorAll('.sofa-zippy-icon')[0]),
                openedIconClass = 'sofa-zippy-icon--opened',
                closedIconClass = 'sofa-zippy-icon--closed';

            defaultIfUndefined(scope, 'caption', 'default');

            scope.opened = attrs.initOpened === undefined ? false : (attrs.initOpened === 'true');

            var setOpen = function (opened) {
                $element.removeClass(opened ? 'sofa-zippy--closed' : 'sofa-zippy--opened');
                $element.addClass(opened ? 'sofa-zippy--opened' : 'sofa-zippy--closed');
                $icon.removeClass(opened ? closedIconClass : openedIconClass);
                $icon.addClass(opened ? openedIconClass : closedIconClass);
            };

            var toggle = function () {
                scope.opened = !scope.opened;
                setOpen(scope.opened);
            };

            $caption.bind('click', toggle);

            scope.$watch('opened', setOpen);

            setOpen(scope.opened);
        }
    };
});

}(angular));
