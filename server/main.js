import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
});

/*Router.route('/', function() {
	this.render('Home');
})*/

/*Router.route('/item', function () {
  var req = this.request;
  var res = this.response;
  res.end('hello from the server\n');
}, {where: 'server'});*/
//where: server tells Router that this route is server-sided