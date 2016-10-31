import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';
import ReactDOM from 'react-dom';
import Users from './Users.jsx';

export default class ManageAdmin extends Component {

	constructor(props) {
		super(props);
	}

	handleSubmit(event) {
		event.preventDefault();

	    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
	    Meteor.call('users.add', username);

	    ReactDOM.findDOMNode(this.refs.username).value = '';
	}

	renderUsers() {
		let listOfUser = this.props.users;
		return listOfUser.map((user) => {
			return (
		        <Users key={user._id} users={user} currentUser={this.props.currentUser} />
		    );
		});
	}

	render() {
		return(
			<div>
			{ this.props.currentUser ? (
				<div>
				<h2 className="text-center">Admin management</h2>
		        <form className="new-task form form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
		          <div className="form-group">
		            <input type="text" id="entryInput" className="form-control" ref="username" placeholder="Username"/>
		          </div>
		        </form>
		        </div>) : ''
		    }

	        <ul>
	        	{this.renderUsers()}
	        </ul>
	        </div>
		);
	}
}