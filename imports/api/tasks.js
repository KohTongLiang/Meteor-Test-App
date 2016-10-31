import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

export const Tasks = new Mongo.Collection('tasks');
export const Users = Mongo.Collection.get('users');

if (Meteor.isServer) {
	Meteor.publish('tasks', function tasksPublication() {
		return Tasks.find({
			$or: [
				{ private : {$ne : true} },
				{ owner : this.userId },
			],
		});
	});

	Meteor.publish('users', function tasksPublication() {
		return Users.find();
	});
}

Meteor.methods({
	'tasks.insert'(text) {
		check(text, String);

		//check for user log in
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.insert({
			text,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});
	},

	'tasks.update'(taskId, newText) {
		check(taskId, String);
		check(newText, String);

		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		} else if (this.userId != Tasks.findOne(taskId).owner) {
			throw new Meteor.Error('not permitted to modify other user\'s entry');
		}

		Tasks.update(taskId, { $set: { text : newText } });
	},

	'tasks.remove'(taskId) {
		check(taskId, String);

		//check for user log in
		if (! this.userId || this.userId != Tasks.findOne(taskId).owner) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.remove(taskId);
	},

	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);

		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.update(taskId, { $set: { checked: setChecked } });
	},

	'tasks.setPrivate'(taskId, setToPrivate) {
		check(taskId, String);
		check(setToPrivate, Boolean);

		const task = Tasks.findOne(taskId);

		if(task.owner != this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.update(taskId, { $set: { private: setToPrivate } });
	},

	'users.add'(username) {
		check(username, String);

	/*	if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}*/

		Accounts.createUser({
			username: username,
			password: "password",
		});
	},

	'users.remove'(id) {
		check(id, String);

		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		} else if (id == this.userId) {
			throw new Meteor.Error('You cannot delete your own account.');
		}

		Users.remove(id);
	},

	'users.update'(id, newUsername) {
		check(id, String);
		check(newUsername, String);

		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Users.update(id, { $set: { username : newUsername } });
	}

});