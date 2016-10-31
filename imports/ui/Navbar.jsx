import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Navbar extends Component {

	constructor(props) {
		super(props);
	}

	renderComponent(comp) {
		this.props.renderComponent(comp);
	}

	render() {
		return(
			<nav className="navbar navbar-default">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#" onClick={this.renderComponent.bind(this, 'home')}>entry management system</a>
			    </div>

			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav">

			      { this.props.currentUser ? (
			      	<li className="dropdown">
			          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Admin Feature <span className="caret"></span></a>
			          <ul className="dropdown-menu" role="menu">
			            <li><a href="#" onClick={this.renderComponent.bind(this, 'admin')}>Manage Administrators</a></li>
			            <li className="divider"></li>
			            <li><a href="#" onClick={this.renderComponent.bind(this, 'entry')}>Manage Entry</a></li>
			          </ul>
			        </li>
			      ) : ''}
			      </ul>
			      <ul className="nav navbar-nav navbar-right">
			      	<AccountsUIWrapper />
			        {/*<li><a href="#">Login</a></li>
			        <li><a href="#">Register</a></li>*/}
			      </ul>
			    </div>
			  </div>
			</nav>
		);
	}
}