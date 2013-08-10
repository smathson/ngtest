'use strict';

angular.module('issues')
  .controller('MainCtrl', function ($scope, issueService) {
    issueService.query().then(
      function(issues) {
        $scope.issues = issues;
      },
      function(error) {
        $scope.error = error;
      });

    $scope.selectIssue = function(issue) {
      $scope.currentIssue = issue;
    };

    $scope.closeIssue = function() {
      $scope.currentIssue = undefined;
    };
  });
