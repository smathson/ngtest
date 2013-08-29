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
    var issues = ['issue 1', 'issue 2'];
    deferred.resolve(issues);
    rootScope.$digest();

    expect(scope.issues).toBeDefined();
    expect(scope.issues).toEqual(issues);
  });

  it('should set error when query is not successful', function() {
    var error = 'error message';
    deferred.reject(error);
    rootScope.$digest();

    expect(scope.issues).toBeUndefined();
    expect(scope.error).toEqual(error);
  });

  describe('selectIssue', function() {
    it('should set the current issue', function() {
      var issue = 'issue';
      scope.selectIssue(issue);

      expect(scope.currentIssue).toEqual(issue);
    });
  });

  describe('closeIssue', function() {
    it('should deselect the current issue', function() {
      scope.closeIssue();

      expect(scope.currentIssue).toBeUndefined();
    });
  });
});
