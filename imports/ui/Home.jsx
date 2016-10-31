import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Navbar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<h1>This is a website that holds CRUD functions for entry and users.</h1>
		);
	}
}