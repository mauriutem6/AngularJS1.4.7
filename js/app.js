angular.module("CustomDirective",["lumx","ngRoute","ngResource","ngMaterial"])
.config(function($routeProvider){
    $routeProvider
    .when("/",{
        controller: "MainController",
        templateUrl: "templates/home.html"
    })
    .when("/post/:id",{
        controller: "PostController",
        templateUrl: "templates/editpost.html"
    })
    .when('/nuevo/post', {
        controller: "NewController",
        templateUrl: "templates/newpost.html"
    })
    .when('/usuarios', {
        controller: "UsuariosController",
        templateUrl: "templates/user.html"
    })
});
