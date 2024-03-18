angular.module("CustomDirective")
.factory("PostResource",function($resource){
    return $resource("https://jsonplaceholder.typicode.com/posts/:id",{id: "@id"}, {update: {method: "PUT"}});
})
