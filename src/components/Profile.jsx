import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function Profile() {
	const { user, isAuthenticated } = useAuth0();
	if (isAuthenticated) {
		axios({
			url: '/api/save',
			method: 'POST',
			data: {
				usrId: user.sub,
				likedIds: ['new shit'],
			},
		})
			.then(() => console.log('data sent to server'))
			.catch(() => console.log('EERRROOOORR'));
	}
	return isAuthenticated ? (
		<div>
			{user.email_verified ? (
				<Alert className='verified' variant='success'>
					Account Verified.
				</Alert>
			) : (
				<Alert className='not-verified' variant='danger'>
					Account not Verified, check your inbox.
				</Alert>
			)}
			<Container className='profile-container'>
				<Row>
					<Col sm={4} className='col1'>
						<img className='profile-img' src={user.picture} alt={user.name} />
					</Col>
					<Col className='col2' sm={7}>
						<h2 className='profile-nickname'>{user.nickname}</h2>
						<p className='profile-name'>Name: {user.name}</p>
						<p className='profile-email'>Email: {user.email}</p>
					</Col>
				</Row>
			</Container>
		</div>
	) : (
		<div>You must login to be able to see your profile</div>
	);
}
export default Profile;
