import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Forgot from './components/forgot';
import Activate from './components/activate';
import Chat from './components/chat';
import Passchange from './components/passchnage';
function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/activate" component={Activate} />
					<Route path="/chat" component={Chat} />
					<Route path="/forgot" component={Forgot} />
					<Route path="/passchange" component={Passchange} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
