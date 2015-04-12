angular.module('ChecksApi.services', []).
factory('checksAPIService', function($http) {
    var checksAPI= {};
    checksAPI.getChecks = function() {
        return $http({
            method: 'GET', 
            url: '/list'
        });
    }
    return checksAPI;
});

