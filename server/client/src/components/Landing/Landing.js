import React from 'react';
import { Button, Anchor } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Typical from 'react-typical';
import './Landing.css';

// const { Link } = Anchor;

const Landing = () => {
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
				<Link to="/surveys" style={{ color: '#f39c12', marginLeft: '10px', fontSize: '18px' }}>
					TẠO KHẢO SÁT
				</Link>
			</Button>
		</div>
	);
};

export default Landing;
