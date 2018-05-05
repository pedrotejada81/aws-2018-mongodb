angular
    .module("ContactListApp")
    .controller("ListCtrl", function($scope,$http) {
        
        console.log("Controller initialized");
        
        $scope.getcon = function (lk){       

  console.log(lk);
           $http.get("/api/v1/contacts/"+lk).then(function(response) {
  $scope.contacts= response.data;
 // $scope.newContact.ID= lk;
  console.log(lk);
        });
   }
        
        $scope.Item_id = function(id){
            $scope._ID = id;
        }
        
        
        function refresh(){
            $http.get("/api/v1/contacts").then(function (response){
                $scope.contacts = response.data;
            });
        }
        

   

   

    
 /*  $scope.search= function(item){
       if($scope.newContact == undefined) {
           console.log($scope.newContact);
           return true;
           
       }
       else {
           if(item.name.indexOf($scope.newContact) != -1 )
           {
               console.log(item);
               return true;
               
              
           }
       }
       
       return false;
   
   };
    */


        /* $scope.getcontacto = function (){
            
            $http
            
                .get("/api/v1/contacts/Willy" + ' '  )
                .then(function (){
                    refresh();  
                });
        
        }*/
        
        $scope.addContact = function (){
            
            $http
                .post("/api/v1/contacts", $scope.newContact)
                .then(function (){
                    refresh();  
                });
        
        }
        
         $scope.delallContact = function (){
            
            $http
                .delete("/api/v1/contacts", $scope.delallContact)
                .then(function (){
                    refresh();  
                });
        
        }
        
        $scope.delContacto = function (){
            
            $http
                .delete("/api/v1/contacts/" + $scope.newContact.name , $scope.deleteContacto)
                .then(function (){
                    refresh();  
                });
        
        }
        
        $scope.updateContacto = function (){
            
            $http
            
                .put("/api/v1/contacts/"+$scope.newContact.name ,$scope.newContact)
                .then(function (){
                    refresh();  
                });
        //"{name:$scope.newContact.name, phone:$scope.newContact.phone}"
        }
        
        refresh();
        
    });
