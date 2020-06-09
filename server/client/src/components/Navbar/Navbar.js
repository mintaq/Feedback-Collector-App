import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeWrapper from '../StripeWrapper';
import './Navbar.css';

import { Menu, Button } from 'antd';

class HeaderClass extends Component {
	state = {
		current: '1',
	};

	handleClick = e => {
		this.setState({
			current: e.key,
		});
	};

	renderContent() {
		switch (this.props.auth) {
			case null:
				return null;
			case false:
				return (
					<Menu.Item style={{ float: 'right' }}>
						<a href="/auth/google">Đăng nhập với Google</a>
					</Menu.Item>
				);
			default:
				return [
					<Menu.Item key="1" style={{ float: 'right', backgroundColor: '#f39c12' }}>
						<Button type="link" ghost>
							<StripeWrapper />
						</Button>
					</Menu.Item>,
					<Menu.Item key="2" style={{ float: 'right' }}>
						Còn lại: {this.props.auth.credits}
					</Menu.Item>,
					<Menu.Item key="3" style={{ float: 'right' }}>
						<a href="/api/logout">Đăng xuất</a>
					</Menu.Item>,
				].reverse();
		}
	}

	render() {
		return (
			<Menu theme="dark" mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
				<Menu.Item key="logo">
					<Link to={'/'}>
						<span style={{ color: 'orange' }}>e</span>
						<span>Collector</span>
					</Link>
				</Menu.Item>
				{this.renderContent()}
			</Menu>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth.auth,
	};
};

export default connect(mapStateToProps)(HeaderClass);
