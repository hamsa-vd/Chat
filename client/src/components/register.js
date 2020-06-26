import React from 'react';

function Register() {
	return (
		<div>
			<div className="parent_register">
				<div className="container-fluid">
					<div className="col-sm-10 col-lg-4">
						<form className="row justify-content-center">
							<div className="input-group mb-3">
								<small>all fields are required</small>
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										Username
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									name="username"
									aria-label="Username"
									aria-describedby="basic-addon1"
								/>
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										email
									</span>
								</div>
								<input
									type="email"
									className="form-control"
									name="email"
									aria-label="email"
									aria-describedby="basic-addon1"
								/>
								<small>should be a valid email</small>
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										Password
									</span>
								</div>
								<input
									type="password"
									className="form-control"
									name="password"
									aria-label="password"
									aria-describedby="basic-addon1"
								/>
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										confirm password
									</span>
								</div>
								<input
									type="password"
									className="form-control"
									name="checkPassword"
									aria-label="conf_password"
									aria-describedby="basic-addon1"
								/>
								<small>both passwords should match</small>
							</div>
							<button className="btn btn-outline-light" type="button">
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
