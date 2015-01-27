var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

  this.addNewGame = function (gameObject) {
    var url = "https://api.parse.com/1/classes/" + gameObject.homeTeam;

    if ( parseInt(gameObject.homeTeamScore) > parseInt(gameObject.opponentScore) ) {
      gameObject.won = true;
    } else {
      gameObject.won = false;
    }

    return $http({
      url: url,
      method: 'POST',
      data: gameObject
    })
  };


  this.getTeamData = function (team) {

    var dfd = $q.defer();
    var url = 'https://api.parse.com/1/classes/' + team;
    $http({
      method: 'GET',
      url: url,
    })
    .then(function(data){
      var results = data.data.results;
      var wins = 0;
      var losses = 0;

      for (var i = 0; i < results.length; i++) {
        if (results[i].won) {
          wins++;
        } else if (!results[i].won) {
          losses++;
        }
      };

      results.wins = wins;
      results.losses = losses;

      dfd.resolve(results);
    })


    return dfd.promise;


  };

});