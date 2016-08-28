define(['underscore',
        'backbone',
        'marionette',
        'app/js/student'
    ],
    function(_, Bb, Mn, Student) {

        var CaseLoad = {};



        CaseLoad.CaseView = Mn.CollectionView.extend({
            tagName: 'ul',
            className: 'list-unstyled',
            childView: Student.StudentLink,
            initialize: function(options) {
              this.collection = options.collection;
            }
        });

        CaseLoad.CreateStudentView = Mn.View.extend({
            template: '#create-student-view',
            events: {
                'click #create-student-btn': 'createStudent'
            },
            initialize: function(options) {
              this.collection = options.collection;
            },
            createStudent: function(){
              var self = this;
              console.log("Create student named: " + $('#new-student-name').val());

              $.ajax({
                  type: "PUT",
                  url: "http://127.0.0.1:8081/cl/students/" + $('#new-student-name').val().split(' ')[0],
                  contentType: "application/json",
                  data: JSON.stringify({'NAME': $('#new-student-name').val()}),
                  headers: {
                      "Authorization": "Basic " + btoa('a' + ":" + 'a')
                  },
                  success: function(response) {
                      self.collection.add(new Student.Model({"NAME": $('#new-student-name').val()}));
                  }
              });
            }
        });



        return CaseLoad;
    });
