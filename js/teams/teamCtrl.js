var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $route, teamService, teamData){

$scope.teamData = teamData;
$scope.newGame = {};
$scope.showNewGameForm = false;
$scope.toggleNewGameForm = function () {
  $scope.showNewGameForm = !$scope.showNewGameForm;
}

if ($route.current.params.teams === 'utahjazz') {
  $scope.homeTeam = 'Utah Jazz';
  $scope.logoPath = '/images/Jazz-logo.png';
}

$scope.submitGame = function () {
  $scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
  $scope.newGame.homeTeamScore = $scope.homeScore;
  $scope.newGame.opponent = $scope.opponent;
  $scope.newGame.opponentScore = $scope.opponentScore;

  teamService.addNewGame($scope.newGame)
    .then(function() {
      teamService.getTeamData($scope.newGame.homeTeam)
        .then(function(data) {
          $scope.teamData = data;
          $scope.newGame = {};
          $scope.showNewGameForm = false;
      });
    });
}







});