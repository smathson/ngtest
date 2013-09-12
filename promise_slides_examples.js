$resource('http://api.blah.com').query(function(data) {
  doSomethingWith(data);
});

$resource('http://api.blah.com').query(function(data) {
  doSomethingWith(data, function(newData) {
    doSomethingElseWith(newData);
  });
});

$resource('http://api.blah.com').query(function(data) {
  doSomethingWith(data, function(newData) {
    doSomethingElseWith(newData);
  }, function(otherError) {
    handleError(otherError);
  });
}, function(error) {
  handleError(error);
});



$resource('http://api.blah.com').query().then(
  function(data) {
    return doSomethingWith(data);
  }).then(function(newData) {
    doSomethingElseWith(newData);
  });

$resource('http://api.blah.com').query().then(
  function(data) {
    return doSomethingWith(data);
  }).then(function(newData) {
    doSomethingElseWith(newData);
  }, function(error) {
    handleError(error);
  });



function doSomethingWith(data) {
  var deferred = $q.defer();

  if (data.length > 0) {
    deferred.resolve(data);
  } else {
    deferred.reject('empty data!');
  }

  return deferred.promise;
}
