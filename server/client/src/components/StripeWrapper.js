import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

class StripeWrapper extends Component {
	render() {
		return (
			<StripeCheckout
				name="eCollector"
				description="$5 cho 5 bài khảo sát"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn orange">Nạp tiền</button>
			</StripeCheckout>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleToken: token => dispatch(actions.handleToken(token)),
	};
};

export default connect(null, mapDispatchToProps)(StripeWrapper);
