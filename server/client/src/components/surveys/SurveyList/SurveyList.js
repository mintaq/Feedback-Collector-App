import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../../store/actions';
import SurveyCard from '../SurveyCard';
import { Card } from 'antd';
import styles from './SurveyList.module.css';

class SurveyList extends Component {
	state = {
		loading: true,
	};

	async componentDidMount() {
		await this.props.fetchSurveys();
		this.setState({ loading: false });
	}

	renderSpinner() {
		return (
			<div className={styles.CardContainer}>
				<Card type="inner" loading={this.state.loading}></Card>
			</div>
		);
	}

	renderSurveys() {
		if (this.props.surveys.length === 0) {
			return (
				<div className={styles.CardContainer}>
					<Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
						<p>
							Hiện bạn chưa tạo một khảo sát nào. Bấm vào nút tạo ở góc dưới bên phải để tạo khảo sát mới!
						</p>
					</Card>
				</div>
			);
		}

		return this.props.surveys.reverse().map(survey => <SurveyCard key={survey._id} {...survey} />);
	}

	render() {
		return (
			<div className={styles.container}>
				{this.state.loading ? this.renderSpinner() : this.renderSurveys()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { surveys: state.surveys.surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
