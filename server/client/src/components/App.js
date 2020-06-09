import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { Layout } from 'antd';
import Navbar from './Navbar/Navbar';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew/SurveyNew';
import './App.css';
const { Header, Content, Footer } = Layout;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<Layout className="Layout">
					<Header>
						<Navbar />
					</Header>
					<Content className="Content">
						<div className="site-layout-content">
							<Route exact path="/" component={Landing}></Route>
							<Route exact path="/surveys" component={Dashboard}></Route>
							<Route path="/surveys/new" component={SurveyNew}></Route>
						</div>
					</Content>
					<Footer className="Footer">
						eCollector ©2020 Created by{' '}
						<a
							href="https://github.com/mintaq/Feedback-Collector-App"
							target="_blank"
							rel="noopener noreferrer"
						>
							Minh Tran
						</a>
					</Footer>
				</Layout>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
