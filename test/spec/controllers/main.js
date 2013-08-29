'use strict';

describe('Controller: MainCtrl', function() {
  // load the controller's module
  beforeEach(module('ngtestApp'));

  var MainCtrl,
      scope,
      mockIssueService;

  mockIssueService = {
    query: jasmine.createSpy('query')
  };

  // Initialize the controller and a mock scope
  beforeEach(function() {
    module(function($provide) {
      $provide.value('issueService', mockIssueService);
    });

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      MainCtrl = $controller('MainCtrl', {$scope: scope});
    });
  });

  it('should query the issues', function () {
    expect(mockIssueService.query).toHaveBeenCalled();
  });
});
