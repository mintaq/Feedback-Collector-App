import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../store/actions';

class SurveyList extends Component {
	async componentDidMount() {
		await this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div key={survey._id} className="card darken-1">
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">Ngày gửi: {new Date(survey.dateSent).toLocaleDateString()}</p>
					</div>
					<div className="card-action">
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

const mapStateToProps = state => {
	return { surveys: state.surveys.surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
