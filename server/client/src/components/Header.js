import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeWrapper from './StripeWrapper';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return null;
			case false:
				return (
					<li>
						<a href="/auth/google">Đăng nhập với Google</a>
					</li>
				);
			default:
				return [
					<li key="1">
						<StripeWrapper />
					</li>,
					<li key="2" style={{ margin: '0 10px' }}>
						Còn lại: {this.props.auth.credits}
					</li>,
					<li key="3">
						<a href="/api/logout">Đăng xuất</a>
					</li>,
				];
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="brand-logo"
						style={{ padding: '0 10px' }}
					>
						eCollector
					</Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth.auth,
	};
};

export default connect(mapStateToProps)(Header);
