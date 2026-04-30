var app = angular.module('itemApp', []);

app.controller('itemCtrl', function($scope, $http) {

    $scope.newItem = {};
    $scope.hobbies = {};
    $scope.editStat = false;
    $scope.message = "";
    

    // READ
    $scope.readItem = function() {
        $http.get('/api/items').then(res => {
            $scope.items = res.data;
        });
    };

    $scope.readItem();

    // // ADD
    // $scope.addItem = function() {

    //     if ($scope.newItem.age < 18) {
    //         $scope.message = "Not Allowed (Age < 18)";
    //         return;
    //     }

    //     let h = [];
    //     if ($scope.hobbies.reading) h.push("Reading");
    //     if ($scope.hobbies.sports) h.push("Sports");
    //     if ($scope.hobbies.music) h.push("Music");

    //     $scope.newItem.hobbies = h;

    //     $http.post('/api/addItem', $scope.newItem).then(() => {
    //         $scope.readItem();
    //         $scope.newItem = {};
    //         $scope.hobbies = {};
    //         $scope.message = "";
    //     });
    // };

    // ADD
$scope.addItem = function() {

    if ($scope.newItem.age < 18) {
        $scope.message = "Not Allowed (Age < 18)";
        return;
    }

    let h = [];
    if ($scope.hobbies.reading) h.push("Reading");
    if ($scope.hobbies.sports) h.push("Sports");
    if ($scope.hobbies.music) h.push("Music");

    $scope.newItem.hobbies = h;

    // 🔥 MARKS CALCULATION
    let total = Number($scope.newItem.english || 0) +
                Number($scope.newItem.gujarati || 0) +
                Number($scope.newItem.hindi || 0);

    let percentage = total / 3;

    let grade = "";
    if (percentage >= 75) grade = "A";
    else if (percentage >= 50) grade = "B";
    else if (percentage >= 35) grade = "C";
    else grade = "Fail";

    $scope.newItem.total = total;
    $scope.newItem.percentage = percentage.toFixed(2);
    $scope.newItem.grade = grade;

    $http.post('/api/addItem', $scope.newItem).then(() => {
        $scope.readItem();
        $scope.newItem = {};
        $scope.hobbies = {};
        $scope.message = "";
    });
};

    // DELETE
    $scope.deleteItem = function(id) {
        $http.delete('/api/deleteItem/' + id).then(() => {
            $scope.readItem();
        });
    };

    // EDIT
    $scope.edit = function(item) {
        $scope.newItem = angular.copy(item);
        $scope.editStat = true;

        $scope.hobbies = {
            reading: item.hobbies.includes("Reading"),
            sports: item.hobbies.includes("Sports"),
            music: item.hobbies.includes("Music")
        };
    };

// ADD
$scope.addItem = function() {

    if ($scope.newItem.age < 18) {
        $scope.message = "Not Allowed (Age < 18)";
        return;
    }

    let h = [];
    if ($scope.hobbies.reading) h.push("Reading");
    if ($scope.hobbies.sports) h.push("Sports");
    if ($scope.hobbies.music) h.push("Music");

    $scope.newItem.hobbies = h;

    // 🔥 MARKS CALCULATION
    let total = Number($scope.newItem.english || 0) +
                Number($scope.newItem.gujarati || 0) +
                Number($scope.newItem.hindi || 0);

    let percentage = total / 3;

    let grade = "";
    if (percentage >= 75) grade = "A";
    else if (percentage >= 50) grade = "B";
    else if (percentage >= 35) grade = "C";
    else grade = "Fail";

    $scope.newItem.total = total;
    $scope.newItem.percentage = percentage.toFixed(2);
    $scope.newItem.grade = grade;

    $http.post('/api/addItem', $scope.newItem).then(() => {
        $scope.readItem();
        $scope.newItem = {};
        $scope.hobbies = {};
        $scope.message = "";
    });
};

    // // UPDATE
    // $scope.updateItem = function(item) {

    //     let h = [];
    //     if ($scope.hobbies.reading) h.push("Reading");
    //     if ($scope.hobbies.sports) h.push("Sports");
    //     if ($scope.hobbies.music) h.push("Music");

    //     item.hobbies = h;

    //     $http.put('/api/updateItem/' + item._id, item).then(() => {
    //         $scope.readItem();
    //     });

    //     $scope.editStat = false;
    //     $scope.newItem = {};
    //     $scope.hobbies = {};
    // };

});


