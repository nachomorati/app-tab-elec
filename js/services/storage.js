(function() {
  'use strict';

  angular
    .module('tablerosApp')
    .service('Storage', Storage);

  Storage.$inject = ['$window'];

  function Storage ($window) {
		/*if (!$window.localStorage) {
			alert('Su navegador no soporta localStorage o esta desactivado');
		} else {
			tableros = $window.localStorage.getItem('tablerosStore');
		}*/
		var saved = $window.localStorage.getItem('tablerosStore');
		var tableros = ($window.localStorage.getItem('tablerosStore')) ? angular.fromJson(saved) : [];
    var tablerosString = '';
		$window.localStorage.setItem('tablerosStore', JSON.stringify(tableros));

		this.save = function (tablero) {
			if (tableros == null) {
				tableros = [];
			} else {
				tableros = angular.fromJson(tableros);
			}
			tableros.push(tablero);
			tablerosString = JSON.stringify(tableros);
			$window.localStorage.setItem('tablerosStore', tablerosString);
		}

		this.update = function (key, tablero) {
			tableros[key] = tablero;
			tablerosString = JSON.stringify(tableros);
			$window.localStorage.setItem('tablerosStore', tablerosString);
		}

		this.get = function (key) {
			return tableros[key];
		}

		this.remove = function (tablero) {
			var indice = tableros.indexOf(tablero);
			tableros.splice(indice, 1);
			tablerosString = JSON.stringify(tableros);
			$window.localStorage.setItem('tablerosStore', tablerosString);
		}

		this.list = function () {
			return tableros;
		}

		this.clear = function () {
			$window.localStorage.clear('tablerosStore');
		}
	}
})();
