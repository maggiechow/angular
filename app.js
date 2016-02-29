var app = angular.module('flapperNews', ['ui.router'])

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
     url: '/home',
     templateUrl: '/home.html',
     controller: 'MainCtrl'
    })
    .state('posts', {
     url: '/posts/{id}',
     templateUrl: '/posts.html',
     controller: 'PostsCtrl'
    });
    
  $urlRouterProvider.otherwise('home');
}]);
app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);
app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.test = 'Hello world!';

  $scope.posts = posts.posts;

  $scope.addPost = function(){
    if($scope.formContent === '') { return; }
    $scope.posts.push({
      title: $scope.formContent,
      upvotes: 0,
      comments: [
           {author: 'Joe', body: 'Cool post!', upvotes: 0},
    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
          ]
    });
    $scope.formContent = '';
         };
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
         };
}])
    app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'postFactory',
function($scope, $stateParams, postFactory){
  $scope.post = postFactory.posts[$stateParams.id];
  
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      upvotes: 0
    });
    $scope.body = '';
  };

  $scope.incrementUpvotes = function(comment){
    comment.upvotes += 1;
  };
}]);
