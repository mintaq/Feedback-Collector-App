import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import {Card} from 'antd'
import formFields from '../../formFields';
import * as actions from '../../../../store/actions';
import styles from './SurveyFormReview.module.css'

const SurveyFormReview = props => {
	const renderReviewFields = _.map(formFields, ({ label, name }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<p>{props.formValues[name]}</p>
			</div>
		);
	});

	return (
		<div className={styles.container}>
			<Card type="inner" title="Khảo sát bạn vừa tạo:">
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
			</Card>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		formValues: state.form.surveyForm.values,
	};
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
