import React, { Component } from 'react';
import { Card, Divider, Modal, Alert, Button } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class SurveyCard extends Component {
	state = { visible: false };

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = e => {
		this.props.deleteSurvey(this.props._id);
		this.setState({
			visible: false,
		});
	};

	handleCancel = e => {
		this.setState({
			visible: false,
		});
	};

	handleCardClick = e => {
		console.log('card clicked')
	}

	renderModal() {
		return (
			<Modal
				title={<Alert message="Cảnh báo" banner />}
				closable={false}
				centered
				visible={this.state.visible}
				footer={[
					<Button key="back" onClick={this.handleCancel}>
						Hủy
					</Button>,
					<Button key="submit" type="danger" onClick={this.handleOk}>
						Xóa
					</Button>,
				]}
			>
				<p>Bạn muốn xóa khảo sát này?</p>
			</Modal>
		);
	}

	render() {
		return (
			<Card
				title={this.props.title}
				type="inner"
				onClick={this.handleCardClick}
				extra={
					<a href="#">
						<CloseOutlined style={{ fontSize: '15px', color: 'salmon' }} onClick={this.showModal} />
					</a>
				}
				style={{ width: '100%', margin: '15px 0', padding: '10px' }}
				hoverable
			>
				<p>{this.props.body}</p>
				<Divider orientation="right" plain>
					Ngày gửi: {new Date(this.props.dateSent).toLocaleDateString()}
				</Divider>
				<p>
					Yes: {this.props.yes} | No: {this.props.no}
				</p>
				{this.renderModal()}
			</Card>
		);
	}
}

export default connect(null, actions)(SurveyCard);
