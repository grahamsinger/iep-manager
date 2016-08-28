define(['jquery', 'marionette', 'app/js/caseload', 'app/js/student'], function($, Mn, CaseLoad, Student) {

    $('#testing').text("Jane Hourigan!");

    var App = {};

    App.ContainterView = Mn.View.extend({
        template: false,
        el: "#container-main",
        regions: {
            main: "#region-main",
            add: "#add-student",
            info: "#info-view-region"
        }
    });

    var view = new App.ContainterView();
    view.render();

    var studs = new Student.AllStudents();

    studs.fetch({
        url: "http://127.0.0.1:8081/cl/students",
        success: function(students) {
            view.showChildView('main', new CaseLoad.CaseView({collection: students}).render());
            view.showChildView('add', new CaseLoad.CreateStudentView({collection: students}).render());
        }
    });

    studs.on('add', function(){
      view.showChildView('main', new CaseLoad.CaseView({collection: studs}).render());
      view.showChildView('add', new CaseLoad.CreateStudentView({collection: studs}).render());
    });


    // $.ajax({
    //     type: "GET",
    //     url: "http://127.0.0.1:8081/cl/students",
    //     dataType: 'json',
    //     headers: {
    //         "Authorization": "Basic " + btoa('a' + ":" + 'a')
    //     },
    //     success: function(response) {
    //         console.log(response);
    //         view.showChildView('main', new CaseLoad.CaseView(response).render());
    //         view.showChildView('add', new CaseLoad.CreateStudentView({
    //             'cb': App.loadStudents
    //         }).render());
    //     }
    // });
});
