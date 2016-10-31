import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';
import ReactDOM from 'react-dom';
import Task from './Task.jsx';

export default class ManageEntry extends Component {

	constructor(props) {
		super(props);
		this.state = {
	      hideCompleted: false,
	    };
	}

	handleSubmit(event) {
	    event.preventDefault();

	    // Find the text field via the React ref
	    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

	    //Insert to mongo db
	    //call Meteor methods located in task.js the api
	    Meteor.call('tasks.insert', text);

	    // Clear form
	    ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

	renderTasks() {
		let filteredTasks = this.props.tasks;

	    if (this.state.hideCompleted) {
	      filteredTasks = filteredTasks.filter(task => !task.checked);
	    }

	    return filteredTasks.map((task) => {

	      const currentUserId = this.props.currentUser && this.props.currentUser._id;
	      const showPrivateButton = task.owner == currentUserId;

	      return (
	        <Task key={task._id} task={task} showPrivateButton={showPrivateButton} currentUser={this.props.currentUser} />
	        );
	    });
	}

	render() {
		return(
			<div>
			{ this.props.currentUser ? (
				<div>
				<h2 className="text-center">Entry Management</h2>
		        <form className="new-task form form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
		          <div className="form-group">
		            <input type="text" id="entryInput" className="form-control" ref="textInput" placeholder="Type here..."/>
		          </div>
		        </form>
		        </div>) : ''
		    }

	        <ul>
	          {this.renderTasks()}
	        </ul>
	        </div>
		);
	}
}