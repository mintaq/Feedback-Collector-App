import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField/SurveyField';
import validateEmails from '../../../../utils/validateEmails';
import formFields from '../../formFields';
import { Card } from 'antd';
import styles from './SurveyForm.module.css';

class SurveyForm extends Component {
	renderField() {
		return _.map(formFields, ({ label, name }) => {
			return <Field key={name} component={SurveyField} label={label} name={name} type="text" />;
		});
	}

	render() {
		return (
			<div className={styles.container}>
				<form className={styles.Form} onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					<Card >{this.renderField()}</Card>
					<Link to="/surveys" className="btn-flat red darken-1 white-text left" style={{ marginTop: '10px' }}>
						Hủy <i className="material-icons right">clear</i>
					</Link>
					<button className="btn-flat teal white-text right" style={{ marginTop: '10px' }} type="submit">
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
