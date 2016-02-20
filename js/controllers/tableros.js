(function() {
  'use strict';

  angular
    .module('tablerosApp')
    .controller('TablerosCtrl', TablerosCtrl);

  TablerosCtrl.$inject = ['$scope', '$routeParams',	'Storage', '$rootScope', 'Deleted', '$location', '$uibModal'];

  function TablerosCtrl ($scope, $routeParams, Storage, $rootScope, Deleted, $location, $uibModal) {
    var vm = this;
		vm.tablero = Storage.get($routeParams.id);
    vm.modificarTablero = modificarTablero;
    vm.mostrarEdicion = mostrarEdicion;
    vm.edicion = false;
    vm.eliminarTablero = eliminarTablero;
		vm.tableroCopia = angular.copy(vm.tablero);
    vm.verHistorial = verHistorial;
    vm.agregarCampo = agregarCampo;
    vm.removerCampo = removerCampo;

		$rootScope.$on('reloadTab', function (event, data) {
			$scope.tablero = Storage.get($stateParams.id);
		});

		function modificarTablero (){

			$uibModal.open({
				templateUrl: 'views/modify_tablero.html',
				controller: function ($scope, $uibModalInstance) {
          $scope.esteTab = vm.tableroCopia;
					$scope.Hist = {};
					var data4history = {};
					$scope.modify = function () {
						data4history.fecha = $scope.Hist.fecha;
						data4history.autor = $scope.Hist.autor;
						data4history.cambios = $scope.Hist.cambios;
						$scope.esteTab.historialDeCambios.push(data4history);
						Storage.update($routeParams.id, $scope.esteTab);
						$uibModalInstance.close(true);
						$location.path('/home');
						//$('#info').slideDown(300).html('<p>Tablero '+ esteTab.nombre +' Modificado</p>').delay(3000).slideUp(300);
					};
					$scope.cancel = function () {
						$uibModalInstance.dismiss('cancel');
					};
				}
			})

		}


		function mostrarEdicion (){
			if (!vm.edicion) {
				vm.edicion = true;
			} else {
				vm.edicion = false;
			}
		};

		function eliminarTablero () {
			//var tablero = Storage.get($routeParams.id);

			$uibModal.open({
				templateUrl: 'views/remove_tablero.html',
				controller: function ($scope, $uibModalInstance) {
          $scope.tablero = Storage.get($routeParams.id);
					var esteTablero = $scope.tablero;
					$scope.Datos = {};
					$scope.Datos.fecha = new Date();
					esteTablero.datosBaja = {};
					$scope.delete = function (){
						esteTablero.datosBaja.fecha = $scope.Datos.fecha;
						esteTablero.datosBaja.razon = $scope.Datos.razon;
						Deleted.delete(esteTablero);
						Storage.remove($scope.tablero);
						$uibModalInstance.close(true);
						$location.path('/home');
					};
					$scope.cancel = function (){
						$uibModalInstance.dismiss('cancel');
					};
				}
			});
		};

		function agregarCampo(){
			var indexNum = vm.tableroCopia.alimentaA.length;
			vm.tableroCopia.alimentaA[indexNum] = {};
		};

		function removerCampo(input) {
			var indice = vm.tableroCopia.alimentaA.indexOf(input);
			vm.tableroCopia.alimentaA.splice(indice, 1);
		}

		function verHistorial (){
			$uibModal.open({
				templateUrl: 'views/ver_historial.html',
				controller: function ($scope, $uibModalInstance) {
          $scope.tablero = Storage.get($routeParams.id);
					$scope.hayCambios = true;
					$scope.hist = $scope.tablero.historialDeCambios;
					if ($scope.hist.length === 0) {
						$scope.hayCambios = false;
					};
				}
			})

		}

	}
})();
