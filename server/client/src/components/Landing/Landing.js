import React from 'react';
import { Button, Anchor } from 'antd';
import { HeartTwoTone   } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Landing.css';

// const { Link } = Anchor;

const Landing = () => {
	return (
		<div className="Landing">
			<h1>eCollector</h1>
			<p>Lắng nghe ý kiến từ khách hàng của bạn!</p>
			<br />
			<Button
				style={{borderColor: "orange"}}
				shape="round"
				icon={<HeartTwoTone twoToneColor="orange"  />}
				size="large"
			>
				<Link to="/surveys" style={{color: 'orange', marginLeft: '10px', fontSize: '18px'}}>TẠO KHẢO SÁT</Link>
			</Button>
		</div>
	);
};

export default Landing;
