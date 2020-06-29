import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import Selected from './selected';
import Category from './catrgory';
import Modal from 'react-modal';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { AiOutlineEnter, AiOutlineUserAdd } from 'react-icons/ai';
import { TiGroupOutline } from 'react-icons/ti';
import { FaUserFriends } from 'react-icons/fa';
import { MdCreate } from 'react-icons/md';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
let socket;
const ENDPOINT = 'http://localhost:4200';
Modal.setAppElement('#root');
const modalStyles = {
	overlay: {
		backgroundColor: 'grey',
		zIndex: 1000
	},
	content: {
		backgroundColor: 'whitesmoke',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
};
toast.info('choose rooms or friends');
function Chat() {
	const createRoom = () => {
		alert(createdroom);
		const body = { room: createdroom };
		socket.emit('create room', body);
		setCreateModal(false);
	};
	const joinRoom = () => {
		const body = { room: joinedroom };
		socket.emit('join room', body);
		setJoinModal(false);
	};
	const addFriend = () => {
		const body = { friend: addfriend };
		socket.emit('add friend', body);
		setAddModal(false);
	};
	const logOut = () => {
		setRedirect(true);
		localStorage.removeItem('token');
		localStorage.removeItem('username');
	};

	const [ createdroom, setCreatedroom ] = useState('');
	const [ joinedroom, setJoinedroom ] = useState('');
	const [ addfriend, setAddfriend ] = useState('');
	const [ createModal, setCreateModal ] = useState(false);
	const [ joinModal, setJoinModal ] = useState(false);
	const [ addModal, setAddModal ] = useState(false);
	const [ redirect, setRedirect ] = useState(false);

	useEffect(() => {
		if (!!!localStorage.getItem('token')) setRedirect(true);
		else {
			socket = io(ENDPOINT);
			socket.send({ username: localStorage.getItem('username') });
		}

		return () => socket.close();
	}, []);

	return (
		<div className="parent-chat">
			{redirect && <Redirect to="/login" />}
			<Modal isOpen={createModal} style={modalStyles} onRequestClose={() => setCreateModal(false)}>
				<div className="input-group container row mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text btn-outline-dark" id="basic-addon1">
							Room
						</span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Name to create"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
						onChange={(e) => setCreatedroom(e.target.value)}
					/>
					<div className="input-group-append">
						<button className="btn btn-info" type="button" onClick={createRoom}>
							create
						</button>
					</div>
				</div>
				<button className="btn btn-outline-danger" onClick={() => setCreateModal(false)}>
					close
				</button>
			</Modal>
			<Modal isOpen={joinModal} style={modalStyles} onRequestClose={() => setJoinModal(false)}>
				<div className="input-group container row mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text btn-outline-dark" id="basic-addon1">
							Room
						</span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="name to join"
						aria-label="name to join"
						aria-describedby="basic-addon2"
						onChange={(e) => setJoinedroom(e.target.value)}
					/>
					<div className="input-group-append">
						<button className="btn btn-info" type="button" onClick={joinRoom}>
							join
						</button>
					</div>
				</div>
				<button className="btn btn-outline-danger" onClick={() => setJoinModal(false)}>
					close
				</button>
			</Modal>
			<Modal isOpen={addModal} style={modalStyles} onRequestClose={() => setAddModal(false)}>
				<div className="input-group container row mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text btn-outline-dark" id="basic-addon1">
							friend
						</span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="friend to add"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
						onChange={(e) => setAddfriend(e.target.value)}
					/>
					<div className="input-group-append">
						<button className="btn btn-info" type="button" onClick={addFriend}>
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
					<h4>Welcome {!!localStorage.getItem('username') && localStorage.getItem('username')}</h4>
					<ul>
						<li onClick={() => setCreateModal(true)}>
							<MdCreate size={'1.2rem'} className="mr-1" />create room
						</li>
						<li onClick={() => setJoinModal(true)}>
							<AiOutlineEnter size={'1.2rem'} className="mr-1" />join room
						</li>
						<li onClick={() => setAddModal(true)}>
							<AiOutlineUserAdd size={'1.2rem'} className="mr-1" />add friend
						</li>
						<li>
							<button className="btn btn-outline-danger" onClick={logOut}>
								<RiLogoutCircleLine size={'1.2rem'} className="mr-1" />logout
							</button>
						</li>
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
									<h5>
										<TiGroupOutline className="mr-1" size={'1.3rem'} />Rooms
									</h5>
								</NavLink>
								<NavLink
									activeClassName="active"
									className="link col-6"
									to="/chat/friend"
									color={'black'}
								>
									<h5>
										<FaUserFriends className="mr-1" size={'1.3rem'} />Friends
									</h5>
								</NavLink>
							</nav>
						</header>
						<Route path="/chat/:category" render={() => <Category socket={socket} />} />
					</div>
					<div className="col-8">
						<Route path="/chat/:category/:name" exact render={() => <Selected socket={socket} />} />
					</div>
				</div>
			</Router>
		</div>
	);
}

export default Chat;
