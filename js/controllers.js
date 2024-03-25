angular.module("CustomDirective")
.controller("MainController",function($scope,$resource, PostResource, $http, $location){
    Marcas = $resource("http://192.168.1.89:8089/api/Marcas");
    $scope.marcas = Marcas.query(); //return array
    this.currentNavItem = 'home'; // menu var
    $scope.removePost = function(post){
        if (confirm("Desea eliminar:\n"+post.descripcion+"?")) {
            var url = 'http://192.168.1.89:8089/api/Marcas/'+  post.id;
            $http.delete(url)
            .then(function(response) { // success
                console.log("delete ok: " + post.id);
                $scope.marcas = Marcas.query(); //return array
            })
            .catch(function(error) {
                console.error('Error en delete:', error);
            });
        }
    }
})
.controller("PostController",function($scope, $resource, $routeParams, $location, $http){
    $scope.title = "Editar Post";
    
    $scope.post = {};
    $http.get('http://192.168.1.89:8089/api/Marcas/'+  $routeParams.id)
    .success(function(data){
        console.log("----");
        $scope.post = data;
    })
    .error(function(err){
        console.log(err);
    });
    
    $scope.savePost = function(){
        var data = {
            id: $scope.post.id,
            descripcion: $scope.post.descripcion,
            habilitado: $scope.post.habilitado
        };
        var url = 'http://192.168.1.89:8089/api/Marcas/'+  $routeParams.id;
        $http.put(url, data)
            .then(function(response) { //success
                console.log("update: " + JSON.stringify(data));
                $location.path("/");
            })
            .catch(function(error) {
                console.error('Error al actualizar datos:', error);
            });
    }
    $scope.Volver = function(){
        $location.path("/");
    }
    
    $scope.confirmAction = function() {
        // Aquí puedes implementar la lógica de confirmación
        console.log('Acción confirmada');
    };
})
.controller("NewController",function($scope,$location,$http){
    $scope.post = this;
    $scope.title = "Crear Marca";
    $scope.savePost = function(){
        var data = {
            descripcion: $scope.post.descripcion,
            habilitado: $scope.post.habilitado
        };
        console.log(data);
        var url = 'http://192.168.1.89:8089/api/Marcas';
        $http.post(url, data)
            .then(function(response) {
                // Maneja la respuesta exitosa
                console.log("create: " + JSON.stringify(data));
                $location.path("/");
            })
            .catch(function(error) {
                console.error('Error al actualizar datos:', error);
            });
    }
    $scope.Volver = function(){
        $location.path("/");
    }
})
.controller("UsuariosController",function($scope, $http, $resource){
    //.controller("MainController",function($scope,$resource, PostResource, $http, $location){
    User = $resource("https://jsonplaceholder.typicode.com/users/:id",{id: "@id"});
    $scope.users = User.query(); //return array
})
