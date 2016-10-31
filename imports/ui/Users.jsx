import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import Edit from './Edit.jsx';

// Task component - represents a single todo item
export default class Task extends Component {
	constructor(props) {
		super(props);
	    this.state = {
		    showComponent: false,
	    };
	    this.test = this.test.bind(this);
	}

	deleteUser() {
		Meteor.call('users.remove', this.props.users._id, function (error, result) {
			if (error) {
				alert(error);
			} else {

			}
		});
	}

	changeUsername(event) {
		event.preventDefault();
		Meteor.call('users.update', this.props.users._id, ReactDOM.findDOMNode(this.refs.textInput).value);

		this.editEntry(false);
	}

	test() {
		this.setState({
			showComponent: ! this.state.showComponent,
		});
	}

	editEntry(setFalse) {
		this.setState({
			showComponent: setFalse,
		});
	}

	//render html to view
	render() {
		return (
			<li>
				<div className="form-group">

					{ this.props.currentUser ? (
						<button className="btn btn-default" onClick={this.test.bind(this)}>Edit</button>
					) : ''}

					{this.state.showComponent ? 
						<form className="new-task form form-horizontal" onSubmit={this.changeUsername.bind(this)}>
				            <label className="form-label" htmlFor="entryInput">Update Username</label>
							<input type="text" id="entryInput" className="form-control" ref="textInput" defaultValue={this.props.users.username} />
						</form>
					 : null}

					<span className="text-center"><strong>{this.props.users.username}</strong></span>

					{ this.props.currentUser ? (
						<button className="pull-right" onClick={this.deleteUser.bind(this)}>
						&times;
						</button>
					) : ''}
					
				</div>
			
			</li>
			);
		}
	}