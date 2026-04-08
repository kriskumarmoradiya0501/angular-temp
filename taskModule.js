var app = angular.module('taskApp', []);

app.controller('taskCtrl', function($scope, $http) {

    $scope.newTask = {};
    $scope.roles = {};
    $scope.editStat = false;

        // Pagination variables
    $scope.currentPage = 0;
    $scope.pageSize = 3;


    // Read tasks
    $scope.readTask = function() {
        $http.get('/api/taskData').then(function(response) {
            $scope.task = response.data;
        });
    };

    $scope.readTask();

    // Add task
    $scope.addNewTask = function() {

        let selectedRoles = [];

        if ($scope.roles.employee) selectedRoles.push("Employee");
        if ($scope.roles.manager) selectedRoles.push("Manager");
        if ($scope.roles.owner) selectedRoles.push("Owner");

        $scope.newTask.roles = selectedRoles;

        $http.post('/api/addTask', $scope.newTask).then(function() {
            $scope.readTask();
            $scope.newTask = {};
            $scope.roles = {}; // reset checkboxes
        });
    };

    // Delete task
    $scope.deleteTask = function(id) {
        $http.delete('/api/deleteTask/' + id).then(function() {
            $scope.readTask();
        });
    };

    // Edit task
    $scope.edit = function(item) {
        $scope.newTask = angular.copy(item);
        $scope.editStat = true;

        // Set checkbox values
        $scope.roles = {
            employee: item.roles.includes("Employee"),
            manager: item.roles.includes("Manager"),
            owner: item.roles.includes("Owner")
        };
    };

    // Update task
    $scope.updateTask = function(item) {

        let selectedRoles = [];

        if ($scope.roles.employee) selectedRoles.push("Employee");
        if ($scope.roles.manager) selectedRoles.push("Manager");
        if ($scope.roles.owner) selectedRoles.push("Owner");

        item.roles = selectedRoles;

        $http.put('/api/updateTask/' + item.taskID, item).then(function() {
            $scope.readTask();
        });

        $scope.editStat = false;
        $scope.newTask = {};
        $scope.roles = {};
    };

    // Pagination functions
    $scope.nextPage = function() {
        if (($scope.currentPage + 1) * $scope.pageSize < $scope.task.length) {
            $scope.currentPage++;
        }
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

});