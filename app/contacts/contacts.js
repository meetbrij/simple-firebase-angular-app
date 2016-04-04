'use strict';

angular.module('firebaseContactsApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
	var ref = new Firebase('https://breezecontactsapp.firebaseio.com/');
	$scope.contacts = $firebaseArray(ref);

	$scope.showAddForm = function (argument) {
		$scope.addFormShow = true;
	}

	$scope.showEditForm = function (contact) {
		$scope.editFormShow = true;

		$scope.id = contact.$id;
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.mobile = contact.phones[0].mobile;
		$scope.street = contact.address[0].street;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zipcode = contact.address[0].zipcode;
	}

	$scope.hideForm = function (argument) {
		$scope.addFormShow = false;
		$scope.contactShow = false;
	}

	$scope.addFormSubmit = function () {
		console.log('adding contact');

		if($scope.name) { var name = $scope.name; } else { var name = null; }
		if($scope.email) { var email = $scope.email; } else { var email = null; }
		if($scope.company) { var company = $scope.company; } else { var company = null; }
		if($scope.mobile) { var mobile = $scope.mobile; } else { var mobile = null; }
		if($scope.work_phone) { var work_phone = $scope.work_phone; } else { var work_phone = null; }
		if($scope.home_phone) { var home_phone = $scope.home_phone; } else { var home_phone = null; }
		if($scope.street) { var street = $scope.street; } else { var street = null; }
		if($scope.city) { var city = $scope.city; } else { var city = null; }
		if($scope.state) { var state = $scope.state; } else { var state = null; }
		if($scope.zipcode) { var zipcode = $scope.zipcode; } else { var zipcode = null; }

		$scope.contacts.$add({
			name: name,
			email: email,
			company: company,
			phones: [
				{
					mobile: mobile,
					home: home_phone,
					work: work_phone
				}
			],
			address: [
				{
					street: street,
					city: city,
					state: state,
					zipcode, zipcode
				}
			]
		}).then(function (ref) {
			var id = ref.key();
			console.log('added contact with id: ' + id);
			$scope.addFormShow = false;
			$scope.msg = 'Contact Added Successfully!';
			clearFields();
		})
	}

	$scope.editFormSubmit = function () {
		var id = $scope.id;
		var record = $scope.contacts.$getRecord(id);

		record.name = $scope.name;
		record.email = $scope.email; 
		record.company = $scope.company; 
		record.phones[0].work = $scope.work_phone;
		record.phones[0].home = $scope.home_phone;
		record.phones[0].mobile = $scope.mobile;
		record.address[0].street = $scope.street;
		record.address[0].city = $scope.city;
		record.address[0].state = $scope.state;
		record.address[0].zipcode = $scope.zipcode;

		$scope.contacts.$save(record).then(function (ref) {
			console.log(ref.key);
		});

		clearFields();
		$scope.editFormShow = false;
		$scope.msg = "Contact Updated Successfully!"
	}

	$scope.showContact = function (contact) {
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.mobile = contact.phones[0].mobile;
		$scope.street = contact.address[0].street;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zipcode = contact.address[0].zipcode;

		$scope.contactShow = true;
	}

	$scope.removeContact = function (contact) {
		$scope.contacts.$remove(contact);
		$scope.msg = "Contact removed Successfully!";
	}

	function clearFields() {
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.work_phone = '';
		$scope.home_phone = '';
		$scope.mobile = '';
		$scope.street = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zipcode = '';
	}
}]);