import React from 'react';

function Passchange() {
	return (
		<div className="parent_new_pwd container-fluid">
			<div className="col-sm-10 col-lg-4">
				<div className="row justify-content-around">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								Password
							</span>
						</div>
						<input
							type="password"
							className="form-control"
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
							aria-label="conf_password"
							aria-describedby="basic-addon1"
						/>
						<small>both passwords should match</small>
					</div>
					<button className="btn btn-outline-light">update password</button>
				</div>
			</div>
		</div>
	);
}

export default Passchange;
