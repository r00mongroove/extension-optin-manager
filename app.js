(function() {
	$ = jQuery;
	var Login = Backbone.Model.extend({
		defaults : {
			login : "",
			pass : ""
		},
		url : "http://kabu-u.net/auth/login",
		validate : function(attrs) {
			if (_.isEmpty(attrs.login)) {
				this.error["message"] = "IDを入力してください";
				this.error["target"] = "error_login";
				return this.error;
			}
			if (_.isEmpty(attrs.pass)) {
				this.error["message"] = "IDを入力してください";
				this.error["target"] = "error_password";
				return this.error;
			}
		},
		render_error : function() {
			$("#error").html("IDとパスワードの組み合わせが異なります");
		},
		initialize : function() {
			this.on('invalid', function(model, error) {
				console.log(error);
				//$('#error').html(error);
			})
		}
	});

	var LoginView = Backbone.View.extend({
		el : $("#loginForm"),
		events : {
			'click #sign_in' : "sign_in",
		},
		sign_in : function() {
			var login = $("#inputLogin").val();
			var pass = $("#inputPassword").val();
			this.model.set("login", login);
			this.model.set("pass", pass);
			this.login();
		},
		login : function() {
			self = this;
			$.ajax({
				type : "POST",
				url : this.model.url,
				data : this.model.toJSON(),
				success : function(msg) {
					self.model.render_error();
				}
			});
		}
	});

	var login = new Login();
	var login_view = new LoginView({
		model : login
	});
})();
