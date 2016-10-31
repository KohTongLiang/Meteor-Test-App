import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks, Users } from '../api/tasks.js';
import Task from './Task.jsx';
import Navbar from './Navbar.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Meteor } from 'meteor/meteor';
import ManageEntry from './ManageEntry.jsx';
import ManageAdmin from './ManageAdmin.jsx';
import Home from './Home.jsx';

// App component - represents the whole app
class App extends React.Component {

  //initial state
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      manage: "home",
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  //generate view base on option
  renderComponent(component) {
    //alert(component);
    this.setState({
      manage: component,
    });
  }

  checkComponent() {
    switch(this.state.manage) {
      case 'entry':
        return (<ManageEntry currentUser={this.props.currentUser} tasks={this.props.tasks} />);
        break;

      case 'admin':
        return (<ManageAdmin currentUser={this.props.currentUser} users={this.props.users}/>);
        break;

      case 'home':
        return (<Home />);
        break;

      default:
        return (<Home />);
    }
  }

  //render gui
  render() {
    return (
        <div className="col-md-6 col-md-offset-3">

          <Navbar renderComponent={this.renderComponent.bind(this)} currentUser={this.props.currentUser} />

          { this.checkComponent() }

        </div>
      );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');
  Meteor.subscribe('users');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(), //sort by date
    users: Users.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);