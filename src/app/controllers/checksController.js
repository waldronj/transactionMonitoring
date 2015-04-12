angular.module('ChecksApi.controllers', []).
    controller('checksController', function($scope, checksAPIService) {
        $scope.data = [];
        checksAPIService.getChecks().success(function (response) {
            $scope.data = response;
        });
    });
