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

    describe('when successful', function() {
      it('should set recent for issues created within 2 days', function() {
        var recentIssue = {created_at: new Date()},
            issues;

        httpBackend.expectGET('https://api.github.com/repos/angular/angular.js/issues')
          .respond(200, [recentIssue]);

        issueService.query().then(function(data) {
          issues = data;
        });
        httpBackend.flush();

        expect(issues[0].recent).toBeDefined();
        expect(issues[0].recent).toBe(true);
      });

      it('should set not recent for issues older than 2 days', function() {
        var day = 1000*60*60*24,
            today = new Date(),
            oldTime = today.getTime() - (3*day),
            oldDate = new Date(oldTime),
            oldIssue = {created_at: oldDate},
            issues;

        httpBackend.expectGET('https://api.github.com/repos/angular/angular.js/issues')
          .respond(200, [oldIssue]);

        issueService.query().then(function(data) {
          issues = data;
        });
        httpBackend.flush();

        expect(issues[0].recent).toBeDefined();
        expect(issues[0].recent).toBe(false);
      });
    });

    describe('when not successful', function() {
      it('should return the custom error message', function() {
        var error = {message: "kaboom"},
            result;

        httpBackend.expectGET('https://api.github.com/repos/angular/angular.js/issues')
          .respond(500, error);

        issueService.query().then(angular.noop, function(error) {
          result = error;
        });
        httpBackend.flush();

        expect(result).toEqual('Sorry, something blew up! Github says: kaboom');
      });
    });
  });
});
