(function() {
  'use strict'
  angular
    .module('tablerosApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['Storage', '$rootScope']

  function MainCtrl (Storage, $rootScope) {
    var vm = this;

    var reverse = false; // inicializa la variable para ordenar al derecho o al reves.

    vm.storage = Storage.list(); // carga la lista de tableros desde la factory Storage.
		vm.order = Order; // function para ordenar la tabla.
    function Order (orderBy) {
			var predicado = orderBy;
			if (!reverse) {
				vm.parametro = predicado;
				reverse = true;
			} else {
				vm.parametro = '-'+predicado;
				reverse = false;
			}
		};

		/*$rootScope.$on('reloadList', function (event, data) {
			$scope.storage = Storage.list();
		});*/

		/*$scope.vistaAgregar = false;
		$scope.toggleVistaAgregar = function (){
			if (!$scope.vistaAgregar) {
				$scope.vistaAgregar = true;
			} else {
				$scope.vistaAgregar = false;
			}
		};

		$scope.cancelVistaAgregar = function (){
			$scope.name = '';
			$scope.location = '';
			$scope.feeded = '';
			$scope.vistaAgregar = false;
		};*/
	}
})()
