import React from 'react';
import { Button } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import Typical from 'react-typical';
import { connect } from 'react-redux';
import './Landing.css';

// const { Link } = Anchor;

const Landing = props => {
	return (
		<div className="Landing">
			<h1>
				<span style={{ color: 'orange' }}>e</span>
				<span style={{ color: 'white' }}>Collector</span>
			</h1>
			<Typical
				steps={['Hãy lắng nghe ý kiến từ khách hàng của bạn!', 2000, 'Dùng thử miễn phí ngay hôm nay!', 1000]}
				loop={Infinity}
				wrapper="p"
			/>
			<br />
			<Button
				style={{ borderColor: '#f39c12' }}
				shape="round"
				icon={<HeartTwoTone twoToneColor="#f39c12" />}
				size="large"
			>
				<a
					href={props.auth ? '/surveys' : '/auth/google'}
					style={{ color: '#f39c12', marginLeft: '10px', fontSize: '18px' }}
				>
					TẠO KHẢO SÁT
				</a>
			</Button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth.auth,
	};
};

export default connect(mapStateToProps)(Landing);
