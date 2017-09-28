import angular from 'angular'
import 'angular-ui-router'
angular.module('school-app', ["ui.router"])
       .config(($stateProvider, $urlRouterProvider) => {
          $urlRouterProvider.otherwise('/studentInfo')
          $stateProvider
            .state('studentInfo',{
              url : '/studentInfo',
              templateUrl : 'students/students-nav.html',
              resolve : {
                studentservice: function($http){
                           return  $http.get('/studentInfo');
                          }
              },
              controller: function(studentservice){
                         this.students = studentservice.data; 
},
              controllerAs: 'studentCtrl'            
            })
            .state('studentInfo.marks', {
                    url: '/:studentEnroll',
                    templateUrl: 'students/student-marks.html',
                    resolve: {
                     markService: function($http, $stateParams) {
                        return $http.get(`/studentInfo/${$stateParams.studentEnroll}`);
                              }
                        },
                  controller: function(markService){
              this.mark = markService.data;
                   },
      controllerAs: 'marksCtrl'
    })
           .state('studentInfo.info', {
                    url: '/:studentEnrolls',
                    templateUrl: 'students/student-info.html'
          
                    })

            .state('studentInfo.new', {
              url : '/:studentEnroll/marks/new',
              templateUrl : 'students/new-marks.html',
              controller : function($stateParams, $state, $http){
                this.marksEnroll = $stateParams.studentEnroll;
                this.saveMarks = function(marks){
                        $http({method: 'POST', url: `/studentInfo/${$stateParams.studentEnroll}/marks`, data: {marks}}).then(function(){
                        $state.go('studentInfo.marks', {studentEnroll : $stateParams.studentEnroll});
          });
               
                };
              },
              controllerAs : 'newMarksCtrl'
            })

            .state('studentInfo.newStudent', {
              url : '/new/student',
              templateUrl: 'students/new-student.html',
              controller : function($state, $http){
                this.saveStudent = function(student){
                    $http({method: 'POST', url: `/studentInfo/new`, data: {student}}).then(function(){
                        $state.go('studentInfo');
          });
                  
                };
              },
              controllerAs: 'newStudentCtrl'
            })

          .state('studentInfo.info', {
                    url: '/:studentEnrolls/info',
                    templateUrl: 'students/student-info.html'
          
    })
       })

