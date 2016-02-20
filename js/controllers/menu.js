(function() {
  'use strict';

  angular
    .module('tablerosApp')
    .controller('menuCtrl', menuCtrl);

  menuCtrl.$inject = ['$scope', 'Storage', '$rootScope', '$uibModal', '$location'];

	function menuCtrl ($scope, Storage, $rootScope, $uibModal, $location) {
      // Controlador del menu.
      // Tiene asociada la funcion de agregar un nuevo tablero
      // Al hacer click en + se abre un "modal" con 3 funciones:
      // save = guarda los datos ingresados en el form en la base
      // cancel = cierra el modal sin guardar ningun datos
      // agregarInput = agrega inturruptores al tablero
      $scope.add = function () {
        // Abrir el modal
        $uibModal.open({
  				templateUrl: './views/add_tablero.html',
  				controller: function ($scope, $uibModalInstance) {
  					$scope.Tab = {};
  					$scope.Tab.alimentaA = [];
  					$scope.Tab.alimentaA[0] = {};
            // Agregar un interruptor al tablero
  					$scope.agregarInput = function (){
  						var cantItems = $scope.Tab.alimentaA.length;
  						$scope.Tab.alimentaA[cantItems] = {};
  					};
            // Crear el objeto tablero y guardarlo en la base
  					$scope.save = function () {
  						var tablero = {
  							'nombre': $scope.Tab.nombre,
  							'nombreViejo': $scope.Tab.nombreViejo,
  							'ubicacion': $scope.Tab.ubicacion,
  							'alimentadoPor': $scope.Tab.alimentadoPor,
  							'alimentaA': $scope.Tab.alimentaA,
  							'historialDeCambios': []
  						};
  						Storage.save(tablero);
  						$rootScope.$broadcast('reloadList');
  						$uibModalInstance.close(true);
  						$location.path('/home');
  					}
            // Cierra el modal sin crear ningun tablero
  					$scope.cancel = function () {
  						$uibModalInstance.dismiss('reloadList');
  					}
  				}
  			});
  		};
      // Borra la base de datos (localStorage)
  		//$scope.clear = function () {
  		//	Storage.clear();
  		//	alert('Se ha vaciado la base de datos');
  		//};
  	};
})();
