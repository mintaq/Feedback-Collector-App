import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../store/actions';

const SurveyFormReview = props => {
	const renderReviewFields = _.map(formFields, ({ label, name }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{props.formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Khảo sát bạn vừa tạo:</h5>
			{renderReviewFields}
			<button className="btn-flat yellow darken-3 white-text left" onClick={props.onCancel}>
				<i className="material-icons left">navigate_before</i> Quay lại
			</button>
			<button
				className="btn-flat green white-text right"
				onClick={() => props.submitSurvey(props.formValues, props.history)}
			>
				Gửi Khảo Sát
				<i className="material-icons right">send</i>
			</button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		formValues: state.form.surveyForm.values,
	};
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
