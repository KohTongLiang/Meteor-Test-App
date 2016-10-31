import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Tasks, Users } from '../api/tasks.js';
import ReactDOM from 'react-dom';

export default class Edit extends Component {

	constructor(props) {
		super(props);
	}

	handleSubmit(event) {
		event.preventDefault();
		//call meteor method
		Meteor.call('tasks.update', this.props.object._id, ReactDOM.findDOMNode(this.refs.textInput).value);

		this.props.editEntry(false);
	}

	render() {
		return(
				<form className="new-task form form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
		            <label className="form-label" htmlFor="entryInput">Update</label>
					<input type="text" id="entryInput" className="form-control" ref="textInput" defaultValue={this.props.object.text} />
				</form>
			);
	}
}