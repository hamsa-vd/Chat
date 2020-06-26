import React from 'react';

function Login() {
	return (
		<div>
			<div className="parent_login">
				<div className="container-fluid">
					<div className="col-sm-10 col-lg-4">
						<form className="row justify-content-around">
							<div className="input-group mb-3">
								<small>all fields are required</small>
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										username
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									aria-label="Username"
									aria-describedby="basic-addon1"
									formControlName="username"
								/>
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										password
									</span>
								</div>
								<input
									type="password"
									className="form-control"
									aria-label="password"
									aria-describedby="basic-addon1"
									formControlName="password"
								/>
							</div>
							<button className="btn btn-outline-light px-4">login</button>
							<button className="btn btn-outline-light px-4">forgot password</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
