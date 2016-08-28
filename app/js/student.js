define(['backbone', 'marionette'], function(Backbone, Mn) {

    var Student = {};

    //Set up Authorization
    $.ajaxSetup({
        headers: {
            "Authorization": "Basic " + btoa('a' + ":" + 'a')
        }
    });

    Student.Model = Backbone.Model.extend({
        url: function() {
            return "http://127.0.0.1:8081/cl/students/" + this.get("_id");
        },
        idAttribute: "_id",
        dataType: 'json',
        defaults: {
            "_id": "default",
            "NAME": "default",
            "DOB": "default",
            "GR": "default",
            "ELEM": "default",
            "INITIAL IEP": "default",
            "ANNUAL DUE": "default",
            "TRI DUE": "default",
            "DIS": "default",
            "MINUTES": "default",
            "% in": "default",
            "% out": "default",
            "PULL OUT": "default",
            "PUSH IN": "default",
            "CONTENT AREA NEED": "default",
            "# GOALS": "default",
            "BSP?": "default",
            "INITIAL_IEP": "default",
            "ANNUAL_DUE": "default",
            "TRI_DUE": "default",
            "PULL_OUT": "default",
            "PUSH_IN": "default",
            "CONTENT_AREA_NEED": "default",
            "BSP": "default",
        },
        initialize: function() {

        }
    });

    Student.AllStudents = Backbone.Collection.extend({
        model: Student.Model,
        parse: function(response) {
            return response._embedded["rh:doc"];
        }
    });

    Student.ViewManager = Mn.View.extend({
        el: "#student-view-manager",
        regions: {
            theReeg: "#the-reeg"
        },
    });

    var thee = new Student.ViewManager();

    Student.StudentLink = Mn.View.extend({
        tagName: 'li',
        template: '#student-link-view',
        events: {
            'click .student': 'showInfo'
        },
        initialize: function() {

        },
        showInfo: function(evt) {
            thee.getRegion('theReeg').show(new Student.StudentInfo({
                model: this.model
            }));
        }
    });

    Student.StudentInfo = Mn.View.extend({
        template: '#student-info-view',
        events: {
            'click #save-info-btn': 'save',
            'click #edit-info-btn': 'edit',
            'blur .info-line': 'updateModel'
        },
        initialize: function(options) {
            this.model = options.model;
            this._sanitizeAttrs();
        },

        updateModel: function(evt) {
            //console.log();

            var attrChanged = evt.target.parentElement.getAttribute('attr');
            var valueChangedTo = evt.target.value.trim();
            this.model.set(attrChanged, valueChangedTo);
        },

        save: function() {
            this.model.save({}, {
                success: function() {
                    $("#successful-save").show().delay(2000).fadeOut();
                },
                error: function() {
                    $("#error-save").show().delay(2000).fadeOut();
                }
            });
            this.stopListening();
        },

        _sanitizeAttrs: function() {
            var self = this;
            var _cleanAttr = function(attr) {
                return attr.split(' ').join('_')
                    .split('#').join('')
                    .split('%').join('')
                    .split('?').join('');
            };

            var tempObj = {};
            var attrs = _.keys(this.model.attributes);

            _.each(attrs, function(attr) {
                if (self.model.get(attr) === "" || self.model.get(attr) === null) {
                    tempObj[_cleanAttr(attr)] = "No Information Provided";
                } else if (typeof attr !== 'number') {
                    tempObj[_cleanAttr(attr)] = self.model.get(attr);
                } else {
                    tempObj[_cleanAttr(attr)] = self.model.get(attr);
                }

            });

            this.model.set(tempObj);
        },
        onRender: function() {
            $(function() {
                $('span').on('click', function() {
                    var input = $('<input />', {
                        'type': 'text',
                        'name': 'aname',
                        'value': $(this).html()
                    });
                    $(this).parent().append(input);
                    $(this).remove();
                    input.focus();
                    $('input').on('blur', function() {
                        $(this).parent().append($('<span />').html($(this).val()));
                        $(this).remove();
                    });
                });
            });

        }

    });

    return Student;


});
