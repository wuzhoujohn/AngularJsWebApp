//set up module and controller. 

//there is another module in the created moudle, which is ngRoute. 
var app = angular.module("myModule", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider
            .when("/home", {
                templateUrl: "Templates/home.html",
                controller: "homeController as homeCtrl"
            })
            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController as coursesCtrl"
            })
            .when("/coursesEvaluation", {
                templateUrl: "Templates/coursesEval.html",
                controller: "coursesEvalController as coursesEvalCtrl"
            })
            .when("/students", {
                templateUrl: "Templates/students.html",
                controller: "studentsController as studentsCtrl",
                //the resolve propety contains one or more promises that must resolve
                //successfully before transitioning to the new route
                resolve: {
                    studentsList: function ($http) {
                        return $http.get("StudentService.asmx/GetAllStudents")
                            .then(function (response) {
                                return response.data;
                            })
                    }
                }
            })
            //use ":" to specify the parameter with using any meaningful name
            .when("/students/:id", {
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController as studentDetailsCtrl"
            })
            //add a '?' after the name to make it optional
            .when("/studentsSearch/:name?", {
                templateUrl: "Templates/studentsSearch.html",
                controller: "studentsSearchController as studentsSearchCtrl"
            })
            .when("/employees", {
                templateUrl: "Templates/employees.html",
                controller: "employeesController"
            })
            .when("/Locations", {
                templateUrl: "Templates/locations.html",
                controller: "locationsController as locationsCtrl",
                resolve: {
                    locationsList: function ($http) {
                        return $http.get("LocationsService.asmx/GetAllLocations")
                            .then(function (response) {
                                return response.data;
                            })
                    }
                }
            })
            .when("/Contact", {
                templateUrl: "Templates/contact.html",
                controller: "contactController as contactCtrl"
            })
            //this is the default route, if user typed a invalid url, it will directs user to the home page
            .otherwise({
                redirectTo: "/home"
            })
        $locationProvider.html5Mode(true);
    })
    .controller("homeController", function () {
        this.message = "Home Page";
    })
    .controller("coursesController", function () {
        this.courses = ["Java", "C#", "Spring", "VBA", "SQL", "AngularJS"];
    })
    //inject the stduentslist property into the controller function.
    .controller("studentsController", function (studentsList, $route, $scope, $location) {
        //to cancel a route change
        //use $scope.$on service, when route navigation occurs.
        //a event will be triaggered, which is $routeChangeStart event
        //we declaring a handler function to called when the event is triaggered
        //this function has three parametes, event(the event itself, which is the routeChange event)
        //next(information about next route which user is going)
        //current(information about current route which user is on)
        $scope.$on("$routeChangeStart", function (event, next, current) {
            if (!confirm("Are you sure you want to navigate away from the page to " + next.$$route.originalPath)) {
                event.preventDefault();
            }
        })
        var viewModel = this;
        //declaring a search function for searching student by name
        viewModel.searchStudent = function () {
            //check if there is a name property in the model
            if (viewModel.name) {
                //if user typed some name, then direct user to the following url
                $location.url("/studentsSearch/" + viewModel.name);
            }
            else {
                //otherwise, just go to studentsSearch
                $location.url("/studentsSearch");
            }
        };
        viewModel.pageReload = function () {
            $route.reload();
        };
        viewModel.students = studentsList;
    })
    .controller("studentDetailsController", function ($http, $routeParams) {
        var viewModel = this;
        $http({
            url: "StudentService.asmx/GetStudent",
            //in the when method of module, we have specfied the parameter as id
            //here we can use that name to retrieve the value of that parameter
            params: { id: $routeParams.id },
            method: "get"
        })
            .then(function (response) {
                viewModel.student = response.data;
            })
    })
    .controller("studentsSearchController", function ($http, $routeParams) {
        var viewModel = this;
        //check if user typed some name in the search box
        if ($routeParams.name) {
            $http({
                url: "StudentService.asmx/GetStudentByName",
                //in the when method of module, we have specfied the parameter as id
                //here we can use that name to retrieve the value of that parameter
                params: { name: $routeParams.name },
                method: "get"
            })
                .then(function (response) {
                    viewModel.students = response.data;
                })
        }
        //otherwise, get all students list
        else {
            $http.get("StudentService.asmx/GetAllStudents")
                .then(function (response) {
                    viewModel.students = response.data;
                })
        }
    })
    .controller("coursesEvalController", function () {
        this.technologies = [
            { name: "Java", likes: 0, dislikes: 0 },
            { name: "C#", likes: 0, dislikes: 0 },
            { name: "Spring", likes: 0, dislikes: 0 },
            { name: "VBA", likes: 0, dislikes: 0 },
            { name: "SQL Server", likes: 0, dislikes: 0 },
            { name: "AngularJs", likes: 0, dislikes: 0 }
        ];
        this.incrementLikes = function (technology) {
            technology.likes++;
        };
        this.decrmentLikes = function (technology) {
            technology.dislikes++;
        };
    })
    .controller("employeesController", function ($scope) {
        //set showSalary to true
        $scope.hideSalary = true;
        //retrieve data from database
        var employees = [
            { name: "John", dateOfBirth: new Date("April 04, 1989"), gender: "Male", salary: 55000, hobby: 1 },
            { name: "David", dateOfBirth: new Date("April 09, 1999"), gender: "Male", salary: 65000, hobby: 1 },
            { name: "Mary", dateOfBirth: new Date("November 04, 2000"), gender: "Female", salary: 70000, hobby: 2 },
            { name: "Alice", dateOfBirth: new Date("May 20, 1991"), gender: "Female", salary: 80000, hobby: 2 },
            { name: "Anna", dateOfBirth: new Date("June 09, 1996"), gender: "Female", salary: 90000, hobby: 3 }
        ];
        $scope.employees = employees;
        $scope.sortColumn = "name";
        $scope.reverseSort = false;
        //this function is for setting the sortColumn property in the model
        $scope.sortData = function (column) {
            //if the column selected is equal to the sortcolumn in the scope, then set the reverseSort 
            //to opposite value, or set it to false, which means that user pressed a new column
            $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
            $scope.sortColumn = column;
        };
        //this will return the class of either '.arrow-down' or 'arrow-up'
        $scope.getSortClass = function (column) {
            if ($scope.sortColumn == column) {
                console.log("sortColumn is " + $scope.sortColumn + "and column is " + column);
                //console.log("reuturning sort class")
                //if the sortcolumn equals column, depends on the reverseSort, return either 'arrow-down' or 'arrow-up'
                //if it is true, return arrow-down, otherwise return arrow-up
                console.log("sortClass is " + $scope.reverseSort);
                var result = $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                console.log("result is " + result);
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            }
            //if the sortcolumn is not equal to column user clicked, the arrow will disappaer from the old column
            else {
                return ' ';
            }
        };
    })
    .controller("locationsController", function (locationsList, $http, $location, $anchorScroll) {
        this.locationsList = locationsList;
        this.scrollTo = function (locationName) {
            //hash will append whatever is provided to the url with using a '#' symbol
            $location.hash(locationName);
            //$anchorScroll is going to read the element after '#' and direct the page 
            // to that element with the ID in the url
            $anchorScroll();
        };
    })
    .controller("contactController", function () {
        this.phoneNumber = "123-4567-890";
        this.fax = "456-789-5643";
        this.email = "abcdef@gcd.com";
    });