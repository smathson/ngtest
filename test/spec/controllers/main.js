'use strict';

describe('Controller: MainCtrl', function() {
  // load the controller's module
  beforeEach(module('ngtestApp'));

  var MainCtrl,
      scope,
      q,
      mockIssueService;

  mockIssueService = {
    query: jasmine.createSpy('query').andCallFake(function() {
      var deferred = q.defer();
      return deferred.promise;
    })
  };

  // Initialize the controller and a mock scope
  beforeEach(function() {
    module(function($provide) {
      $provide.value('issueService', mockIssueService);
    });

    inject(function($controller, $rootScope, $q) {
      scope = $rootScope.$new();
      q = $q;
      MainCtrl = $controller('MainCtrl', {$scope: scope});
    });
  });

  it('should query the issues', function() {
    expect(mockIssueService.query).toHaveBeenCalled();
  });
});
