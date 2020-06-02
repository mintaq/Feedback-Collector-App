import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../store/actions';
import SurveyCard from './SurveyCard';

class SurveyList extends Component {
	async componentDidMount() {
		await this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => <SurveyCard key={survey._id} {...survey} />);
	}

	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

const mapStateToProps = state => {
	return { surveys: state.surveys.surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
