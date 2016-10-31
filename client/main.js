if(Meteor.isClient){
    // client code goes here
    Template.register.events({
    	'submit form' : function(event) {
    		event.preventDefault();
	        var emailVar = event.target.registerEmail.value;
	        var passwordVar = event.target.registerPassword.value;
    		Accounts.createUser({
    			email: emailVar,
    			password: passwordVar
    		});
    	}
    });

    Template.login.events({
	    'submit form': function(event) {
	        event.preventDefault();
	        var emailVar = event.target.loginEmail.value;
	        var passwordVar = event.target.loginPassword.value;
	        Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
	        	if (err) {

	        	} else {
	        		//successful login
	        		return true;
	        	}
	        });
	    }
	});

	Template.main.events({
	    'click .logout': function(event){
	        event.preventDefault();
	        Meteor.logout();
	    }
	});
}

if(Meteor.isServer){
    // server code goes here
}

//iron router does not know where to point to by default so manually define
Router.route('/', function() {
	//this.render('home');
});

Router.configure({
	//layoutTemplate: 'main'
});

Router.route('/register', function() {
	this.render('register');
});

Router.route('/login');


//references
/*Router.route('/', function () {
  this.render('MyTemplate');
});

Router.route('/items', function () {
  this.render('Items');
});

Router.route('/items/:_id', function () {
  var item = Items.findOne({_id: this.params._id});
  this.render('ShowItem', {data: item});
});

Router.route('/files/:filename', function () {
  this.response.end('hi from the server\n');
}, {where: 'server'});

Router.route('/restful', {where: 'server'})
  .get(function () {
    this.response.end('get request\n');
  })
  .post(function () {
    this.response.end('post request\n');
  });*/


  //REST routes
  /*Router.route('/webhooks/stripe', { where: 'server' })
  .get(function () {
    // GET /webhooks/stripe
  })
  .post(function () {
    // POST /webhooks/stripe
  })
  .put(function () {
    // PUT /webhooks/stripe
  })*/