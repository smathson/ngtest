'use strict';

describe('Service: issueService', function() {
  // load the issues module
  beforeEach(module('issues'));

  var issueService,
      httpBackend;

  beforeEach(function() {
    inject(function($injector) {
      issueService = $injector.get('issueService');
      httpBackend = $injector.get('$httpBackend');
    });
  });

  describe('query', function() {
    it('should make request to github', function() {
      httpBackend.expectGET('https://api.github.com/repos/angular/angular.js/issues')
        .respond(200);
      issueService.query();
    });
  });
});
