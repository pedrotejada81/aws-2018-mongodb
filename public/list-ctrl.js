angular
    .module("GroupListApp")
    
    .controller("ListCtrl", function($scope,$http) {
        
        console.log("Controller initialized");
        
        $scope.Item_id = function(id){
            $scope.id = id;
           // $scope.groups.id=id;
          // $scope.id= $scope.groups.id;
            console.log(id);
            console.log($scope.id);
           
            
             }
             
             
        $scope.active=function(){
            if( $scope.groups.name== null  || $scope.groups.responsable==null || $scope.groups.email==null) {
            $scope.start1=true;
            console.log( $scope.start1)
        }
        else{
                        $scope.start1=false;
                        console.log( $scope.start1)

        }
        }  
        
        //Llamar los Researchers
        $scope.getresearchers = function (){
            $http.get("/api/v1/researchers")
            .then(function (response){
                if(response.status==200)
                $scope.researchers =  response.data; 
                
                console.log($scope.researchers);
                $scope.contador = $scope.researchers.length;
                
                $scope.profesores =[];
                
                for (var i = 0; i < $scope.contador; i++) {
                    $scope.profesores[i] = $scope.researchers[i].name;
                    $scope.profesores[i] += ' | Phone '+ $scope.researchers[i].phone;
                    $scope.profesores[i] += ' | E-mail '+ $scope.researchers[i].mail;
                }
                        
                })
                
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Researchers list no found")
                
                });
        }
        
        
        //Llamar las Universities
        $scope.getUniversities = function (){
            $http.get("/api/v1/universities")
            .then(function (response){
                if(response.status==200)
                $scope.universities =  response.data; 
                
                console.log($scope.universities);
                $scope.contador = $scope.universities.length;
                
                $scope.universidad =[];
                
                for (var i = 0; i < $scope.contador; i++) {
                    $scope.universidad[i] = $scope.universities[i].name;
                   
                }
                        
                })
                
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Universities list no found")
                
                });
                
                $scope.university="";
        }
        
        
        
        
        //array para los profesores
        
        //$scope.profesores = $scope.researchers[1].name;
        
        $scope.profesores2 = ["Name: Manuel Resinas  Phone:589 63 52 41  Email:manuel.resinas@gmail.com",
                             "Name: Maria Escalona  Phone:365 85 74 12  Email:maria.escalona@gmail.com",
                             "Name: Jose Miguel  Phone:69 52 41 58  Email:jose.miguel@gmail.com",
                             "Name: Manuel Risoto  Phne:666 66 36 58  Email:manuel.risoto@gmail.com",
                             "Name: Ana Ramirez  Phone:698 99 66 45  Email:ana.ramirez@gmail.com",
                             "Name: David Feliz  Phone:589 69 58 41  Email:david@gmail.com"]
                             
            
        $scope.seleccionado="";
        
        //agregar profesores al textarea
        $scope.componentes=[];

        $scope.addProfesor = function(){
            $scope.componentes += $scope.new.select+"\n";
            $scope.new.select="";
        }
        
        
        //agregar lineas de investigacion al textarea addLines
        $scope.lines=[];

        $scope.addLines = function(){
            $scope.lines += $scope.new.lines+"\n";
            $scope.new.lines="";
        }
        
        
        $scope.generarID = function(){
            //$scope.limpiar();
            //$scope.groups=[];
            $http.get("/api/v1/groups").then(function (response){
                $scope.contador= response.data;
                var c=0;
                for (var i = 0; i < $scope.contador.length; i++) {
                    c++;
                }
                
                c++;
                $scope.id= c.toString();
                
                
                
                
            });
        } 
        
        
        function refresh(){
            $http.get("/api/v1/groups").then(function (response){
                $scope.groups = response.data; 
                
               // if ($scope.groups.length==null) {
                //    $scope.groups = "No any groups" ;
               // }
                
            });
                
        }
        
         $scope.refreshOne = function (){
            $http.get("/api/v1/groups/"+ $scope.id)
            .then(function (response){
                $scope.groups = response.data[0];
                $scope.componentes=$scope.groups.componentes;
                $scope.lines=$scope.groups.lineresearch;
                
                if(require.status==200)
                        {alert("Group with Id "+$scope.id+" found") }
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Group with Id "+$scope.id+" no found")
                        
                });
        }
        
       $scope.addGroup = function (){
            console.log($scope.newGroup)
           $scope.newGroup={name:$scope.groups.name, id:$scope.id, responsable:$scope.groups.responsable, email:$scope.groups.email, componentes:$scope.componentes, lineresearch:$scope.lines, university:$scope.university};
           console.log($scope.groups)
            $http
                .post("/api/v1/groups", $scope.newGroup)
                .then(function (require){
                   // refresh();
                    if(require.status==201)
                        alert("The " +$scope.newGroup.name+" group was successfully created");
                         $scope.limpiar(); 
                         refresh(); 
                })
                .catch (function(rejection){
                    if(rejection.status == 503)
                        alert("Service not available");
                
                });
                refresh(); 
                //$scope.limpiar();
                
                
        }
        
        $scope.limpiar= function(){
            $scope.id=null;
            $scope.groups.id=null;                
            $scope.groups.name=null;                
            $scope.groups.responsable=null;                
            $scope.groups.email=null;                
            $scope.componentes=" ";                
            $scope.lines=" "; 
            
        }
        
        
       $scope.delAllGroup = function (ev){
         
            $http
                .delete("/api/v1/groups", $scope.delAllGroup)
                .then(function (){
                    if(require.status==201)
                        alert("All the  groups were successfully deleted");
                         $scope.limpiar(); 
                         refresh(); 
                })
                .catch (function(rejection){
                    if(rejection.status == 503)
                        alert("Groups couldn't be deleted, Service not available");
                    refresh();  
                }); 
        
        } 
        
        $scope.deleteGroup = function (){
            $http
                .delete("/api/v1/groups/"+ $scope.groups.id)
                .then(function (require){
                    refresh();
                    if(require.status==200)
                        alert("The " +$scope.groups.name+" group was successfully deleted")
                        refresh()
                })
                .catch (function(rejection){
                    if(rejection.status == 404)
                        alert("Group with Id "+$scope.groups.id+" no found")
                    
                });
        
        }
        
        $scope.UpdateGroup = function (){
            $scope.groups.componentes=$scope.componentes;
            $scope.groups.lineresearch=$scope.lines;
            
            $http
                .put("/api/v1/groups/"+ $scope.groups.id, $scope.groups) 
                .then(function (){
                    refresh();
                    $scope.limpiar();
                if(require.status==201)
                        alert("The " +$scope.newGroup.name+" group was successfully updated");
                         $scope.limpiar(); 
                         refresh(); 
                })
                .catch (function(rejection){
                    if(rejection.status == 503)
                        alert("Service not available");
                    
                });
        
        }
        
        
        $scope.getresearchers();
        $scope.getUniversities();
        refresh();
        
        
        
    });
    
  