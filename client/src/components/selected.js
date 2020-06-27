import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { FaRocketchat, FaRegFileVideo } from 'react-icons/fa';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';
import { RiFileMusicLine } from 'react-icons/ri';
function Selected() {
	const [ loading, setLoading ] = useState(true);
	return (
		<div className="selected-parent container-fluid">
			<header className="container-fluid row">
				<h5>Name</h5>
			</header>
			<main style={{ height: '200vh' }}>
				{loading && <ReactLoading className="loading mt-5" type="bubbles" color="black" />}
			</main>
			<footer className="container row">
				<div className="input-group mb-3 container">
					<div class="input-group-prepend">
						<span class="input-group-text btn-outline-dark" id="basic-addon1">
							<FaRocketchat size={'1.2rem'} color={'purple'} />
						</span>
					</div>
					<textarea
						type="text"
						style={{ height: '3rem' }}
						className="form-control"
						placeholder="Message"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
					/>
					<div className="input-group-append">
						<button className="btn btn-outline-info">
							<RiFileMusicLine size={'1.3rem'} />
						</button>
						<button className="btn btn-outline-info">
							<FaRegFileVideo size={'1.3rem'} />
						</button>
						<button className="btn btn-outline-info">
							<BsFileEarmarkArrowUp size={'1.3rem'} />
						</button>
						<button className="btn btn-success" type="button">
							send
						</button>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Selected;
