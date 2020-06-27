import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect, useLocation } from 'react-router-dom';
import Selected from './selected';
import Category from './catrgory';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
Modal.setAppElement('#root');
const modalStyles = {
	overlay: {
		backgroundColor: 'grey'
	},
	content: {
		backgroundColor: 'whitesmoke',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
};
function Chat() {
	const createRoom = () => {
		setCreateModal(false);
	};
	const joinRoom = () => {
		setJoinModal(false);
	};
	const addFriend = () => {
		setAddModal(false);
	};
	const location = useLocation();
	const [ createModal, setCreateModal ] = useState(false);
	const [ joinModal, setJoinModal ] = useState(false);
	const [ addModal, setAddModal ] = useState(false);
	const [ redirect, setRedirect ] = useState(false);

	useEffect(() => {
		if (!!!localStorage.getItem('token')) setRedirect(true);
		if (location.pathname === '/chat') toast.info('choose room or friends');
	}, []);
	return (
		<div className="parent-chat">
			{redirect && <Redirect to="/login" />}
			<Modal isOpen={createModal} style={modalStyles} onRequestClose={() => setCreateModal(false)}>
				<div class="input-group container row mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text btn-outline-dark" id="basic-addon1">
							Room
						</span>
					</div>
					<input
						type="text"
						class="form-control"
						placeholder="Name to create"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
					/>
					<div class="input-group-append">
						<button class="btn btn-info" type="button" onClick={createRoom}>
							create
						</button>
					</div>
				</div>
				<button className="btn btn-outline-danger" onClick={() => setCreateModal(false)}>
					close
				</button>
			</Modal>
			<Modal isOpen={joinModal} style={modalStyles} onRequestClose={() => setJoinModal(false)}>
				<div class="input-group container row mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text btn-outline-dark" id="basic-addon1">
							Room
						</span>
					</div>
					<input
						type="text"
						class="form-control"
						placeholder="name to join"
						aria-label="name to join"
						aria-describedby="basic-addon2"
					/>
					<div class="input-group-append">
						<button class="btn btn-info" type="button" onClick={joinRoom}>
							join
						</button>
					</div>
				</div>
				<button className="btn btn-outline-danger" onClick={() => setJoinModal(false)}>
					close
				</button>
			</Modal>
			<Modal isOpen={addModal} style={modalStyles} onRequestClose={() => setAddModal(false)}>
				<div class="input-group container row mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text btn-outline-dark" id="basic-addon1">
							friend
						</span>
					</div>
					<input
						type="text"
						class="form-control"
						placeholder="friend to add"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
					/>
					<div class="input-group-append">
						<button class="btn btn-info" type="button" onClick={addFriend}>
							add
						</button>
					</div>
				</div>
				<button className="btn btn-outline-danger" onClick={() => setAddModal(false)}>
					close
				</button>
			</Modal>
			<header className="top">
				<nav>
					<h4>Welcome Username</h4>
					<ul>
						<li onClick={() => setCreateModal(true)}>create room</li>
						<li onClick={() => setJoinModal(true)}>join room</li>
						<li onClick={() => setAddModal(true)}>add friend</li>
					</ul>
				</nav>
			</header>
			<Router>
				<div className="container-fluid row choose">
					<div className="col-4">
						<header className="container-fluid">
							<nav className="row">
								<NavLink
									activeClassName="active"
									className="link col-6"
									to="/chat/room"
									color={'black'}
								>
									{' '}
									<h5>Rooms</h5>
								</NavLink>
								<NavLink
									activeClassName="active"
									className="link col-6"
									to="/chat/friend"
									color={'black'}
								>
									<h5>Friends</h5>
								</NavLink>
							</nav>
						</header>
						<Route path="/chat/:category" component={Category} />
					</div>
					<div className="col-8">
						<Route path="/chat/:category/:name" exact component={Selected} />
					</div>
				</div>
			</Router>
		</div>
	);
}

export default Chat;
