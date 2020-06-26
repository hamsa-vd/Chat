import React from 'react';
import Svg from './svg';
function Home() {
	return (
		<div className="home_parent">
			<div className="container row justify-content-around">
				<button className="btn btn-outline-light btn-lg m-2">Register</button>
				<button className="btn btn-outline-light btn-lg m-2">Login</button>
			</div>
			<Svg />
		</div>
	);
}

export default Home;
