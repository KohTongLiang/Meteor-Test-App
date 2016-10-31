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

	toggleChecked() {
		// Set the checked property to the opposite of its current value
	Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);

	/*Tasks.update(this.props.task._id, {
	  $set: { checked: !this.props.task.checked },
		});*/
	}

	deleteThisTask() {
		Meteor.call('tasks.remove', this.props.task._id, function (error, result) {
			if (error) {
				alert(error);
			} else {

			}
		});
	    //Tasks.remove(this.props.task._id);
	}

	togglePrivate() {
		Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
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
	  	//change classname of each task when they are checked off
	  	const taskClassName = classnames({
	  		checked: this.props.task.checked,
	  		private: this.props.task.private,
	  	});

		//const taskClassName = this.props.task.checked ? 'checked' : '';

		return (
			<li className={taskClassName}>

				<div className="form-group">

					{ this.props.showPrivateButton ? (
					<button className="toggle-private btn btn-default-" onClick={this.togglePrivate.bind(this)}>
					{ this.props.task.private ? 'Private' : 'Public' }
					</button>
					) : ''}

					{ this.props.currentUser ? (
						<button className="btn btn-default" onClick={this.test.bind(this)}>Edit</button>
					) : ''}

					{this.state.showComponent ? <Edit key={this.props.task._id} object={this.props.task} editEntry={this.editEntry.bind(this)} /> : null}

					<span className="text-center"><strong>{this.props.task.username}</strong>: {this.props.task.text}</span>

					{ this.props.currentUser ? (
						<button className="pull-right" onClick={this.deleteThisTask.bind(this)}>
						&times;
						</button>
					) : ''}
					
				</div>
			
			</li>
			);
		}
	}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};