angular.module('HarnessApp', ['ChecksApi.services', 'ChecksApi.controllers']);

angular.module('ChecksApi.services', []).
    factory('checksAPIService', function($http) {
        var checksAPI= {};
        checksAPI.getChecks = function() {
            return $http({
                method: 'GET', 
                url: '/list'
            });
        }

        checksAPI.runTest = function(testName) {
            return $http({
                method: 'GET',
                url: '/harness/' + testName
            });
        }
        return checksAPI;
    });

angular.module('ChecksApi.controllers', []).
    controller('checksController', function($scope, checksAPIService) {
        $scope.data = [];
        checksAPIService.getChecks().success(function (response) {
            $scope.data = response;
        });
        
        $scope.runTest = function (testName) {
            checksAPIService.getChecks().success(function (response) {
                checksAPIService.runTest(response[testName].checkname).success( function (testResults) {
                    var pretty = vkbeautify.xml(testResults, 4);
                    $scope.results = pretty;
                    console.log(pretty);
                });
            });
        }
    });
