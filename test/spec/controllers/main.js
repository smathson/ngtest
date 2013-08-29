'use strict';

describe('Controller: MainCtrl', function() {
  // load the controller's module
  beforeEach(module('ngtestApp'));

  var MainCtrl,
      scope,
      rootScope,
      q,
      deferred,
      mockIssueService;

  mockIssueService = {
    query: jasmine.createSpy('query').andCallFake(function() {
      deferred = q.defer();
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
      rootScope = $rootScope;
      q = $q;
      MainCtrl = $controller('MainCtrl', {$scope: scope});
    });
  });

  it('should query the issues', function() {
    expect(mockIssueService.query).toHaveBeenCalled();
  });

  it('should set issues when query is successful', function() {
    deferred.resolve(['issue 1', 'issue 2']);
    rootScope.$digest();
    expect(scope.issues).toBeDefined();
  });
});
