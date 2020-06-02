import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields'

class SurveyForm extends Component {
	renderField() {
		return _.map(formFields, ({ label, name }) => {
			return <Field key={name} component={SurveyField} label={label} name={name} type="text" />;
		});
	}

	render() {
		return (
			<div style={{background: 'white', margin: '10px 0'}}>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderField()}
					<Link to="/surveys" className="btn-flat red darken-1 white-text left">
						Hủy <i className="material-icons right">clear</i>
					</Link>
					<button className="btn-flat teal white-text right" type="submit" >
						Tiếp <i className="material-icons right">navigate_next</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '');

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'Không được bỏ trống!';
		}
	});

	return errors;
}

export default reduxForm({
	form: 'surveyForm',
	validate,
	destroyOnUnmount: false,
})(SurveyForm);
