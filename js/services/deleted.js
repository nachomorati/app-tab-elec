(function() {
  'use strict';

  angular
    .module('tablerosApp')
    .service('Deleted', Deleted);

  Deleted.$inject = ['$window'];
  function Deleted ($window) {
		var saved = $window.localStorage.getItem('tablerosDeleted');
		var deleted = ($window.localStorage.getItem('tablerosDeleted')) ? angular.fromJson(saved) : [];
		$window.localStorage.setItem('tablerosDeleted', JSON.stringify(deleted));

		this.list = function () {
			return deleted;
		}

		this.delete = function (tablero) {
			deleted.push(tablero);
			var deletedString = JSON.stringify(deleted);
			$window.localStorage.setItem('tablerosDeleted', deletedString);
		}

		this.clear = function () {
			$window.localStorage.clear('tablerosDeleted');
		}
	}
})();
