import React from 'react';

function Forgot() {
	return (
		<div className="parent_forgot container-fluid">
			<div className="col-sm-10 col-lg-4">
				<div className="row justify-content-around">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								@
							</span>
						</div>
						<input
							type="email"
							name="email"
							className="form-control"
							placeholder="email"
							aria-label="email"
							aria-describedby="basic-addon1"
						/>
					</div>
					<button className="btn btn-outline-light">change password</button>
				</div>
			</div>
		</div>
	);
}

export default Forgot;
