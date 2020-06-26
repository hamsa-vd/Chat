import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FiUser } from 'react-icons/fi';
import { RiLoginCircleLine, RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';
function Register() {
	const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' });
	const onSubmit = async (formdata) => {
		console.log(formdata, formState.dirty, Object.keys(errors).length);
		if (formdata.password === formdata.checkPassword && !Object.keys(errors).length) {
			const body = formdata;
			delete body.checkPassword;
			console.log(body);
			const data = await axios.post('https://hava-chat.herokuapp.com/api/register', body);
			toast.success(data.data.msg);
		} else console.log('haha');
	};
	return (
		<div>
			<div className="parent_register">
				<div className="container-fluid">
					<div className="col-sm-10 col-lg-4">
						<form className="row justify-content-center" onSubmit={handleSubmit(onSubmit)}>
							<div className="input-group mb-3">
								<small>all fields are required</small>
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										<FiUser color="brown" className="mr-1" /> Username
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									name="username"
									aria-label="Username"
									aria-describedby="basic-addon1"
									ref={register({ required: true })}
								/>
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										<AiOutlineMail color="brown" className="mr-1" /> email
									</span>
								</div>
								<input
									type="email"
									className="form-control"
									name="email"
									aria-label="email"
									aria-describedby="basic-addon1"
									ref={register({ required: true })}
								/>
								<small>should be a valid email</small>
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										<RiLockPasswordLine color="brown" className="mr-1" /> Password
									</span>
								</div>
								<input
									type="password"
									className="form-control"
									name="password"
									aria-label="password"
									aria-describedby="basic-addon1"
									ref={register({ required: true })}
								/>
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										<RiLockPasswordLine color="brown" className="mr-1" /> confirm password
									</span>
								</div>
								<input
									type="password"
									className="form-control"
									name="checkPassword"
									aria-label="conf_password"
									aria-describedby="basic-addon1"
									ref={register({ required: true })}
								/>
								<small>both passwords should match</small>
							</div>
							<button className="btn btn-outline-light" type="submit">
								<RiLoginCircleLine size="1.2rem" /> Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
