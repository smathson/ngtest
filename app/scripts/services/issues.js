'use strict';

angular.module('issues')
  .factory('issueService', function($http, $q) {
    var determineRecent = function(issue) {
      var today = new Date(),
          created = new Date(issue.created_at),
          day = 1000*60*60*24,
          daysOld = ((today.getTime() - created.getTime())/day);

      issue.recent = (daysOld < 2);
    };

    var issueService = {
      query: function() {
        var deferred = $q.defer();
        $http.get('https://api.github.com/repos/angular/angular.js/issues')
          .success(function(issues) {
            angular.forEach(issues, function(issue) {
              determineRecent(issue);
            });
            deferred.resolve(issues);
          })
          .error(function(error) {
            var message = 'Sorry, something blew up! Github says: ' + error.message;
            deferred.reject(message);
          });

        return deferred.promise;
      }
    };

    return issueService;
  });
