import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import logo from './logo.svg';
import './App.css';

import firebaseConf from './Firebase';

import Participants from './components/Participants';
import Chat from './components/Chat';

class App extends Component{
	// inicializamos nuestro estado inicial
	constructor(props) {
		super(props);

		this.state 	= {
			user: 						'',
			idUser: 					0,
			login: 						false,
			participants: 		[1,2,3],
			messages: 				[],
			messageWillSend: 	'',
			dontExist: 				true,
			timer:            ''
		};

		this.input = React.createRef();
	}

	componentDidMount() {
		firebaseConf.database().ref('chatStory').orderByKey().limitToLast(6).on('child_added', snapshot => {
			this.getMessages();
		});
	}

	render(){
		return (
			<div className="App">
				<header className="App-header">
					<div className="contentParticipantsMessages">
						<div className={(!this.state.login) ? 'true' : 'false'}>

							<div className="login">
								<div className="box">
									<p>¡Bienvendo a nuestro chat!</p>
									<input 
										type="text" 
										placeholder="Inserta tu nick aquí"
										ref={this.input} 
										onKeyDown={() => this.checkNick()} 
									/>
									
									<div className={(!this.state.dontExist) ? 'true' : 'false'}>
										<div className="alert">Ese nick ya está en uso</div>
									</div>

					        <br/>
					        <br/>

									<Button 
										variant="contained" 
										color="secondary"
										onClick={() => this.login()}
										disabled={!this.state.dontExist}
									>
										Entrar
									</Button>
								</div>
							</div>
						</div>

						<div className={(this.state.login) ? 'true' : 'false'}>
							<Grid container>
								{/* Participants */}
								<Grid item xs={4}>
									<Participants participants={this.state.participants}/>
								</Grid>

								{/* Messages */}
								<Grid 
									className="messages" 
									item xs={8}
								>
									<Chat messages={this.state.messages} user={this.state.user}/>
									<div className="contentSendMessage">
										<input 
											type='text' 
											className='form-control' 
											id='name' 
											placeholder='Escribe un mensaje aquí' 
											ref={name => this.inputName = name} 
											onKeyDown={(e) => this.keyDownInput(e)}
										/>
										<Button 
											variant="contained" 
											color="secondary"
											onClick={() => this.sendMessage()}
										>
											Enviar
										</Button>
									</div>
								</Grid>
							</Grid>
						</div>
					</div>

				</header>
			</div>
		);
	}

	sendMessage(){
		//this.his();

		let d = new Date();
		let hours 	= d.getHours() * 10000;
		let minutes = d.getMinutes() * 100;
		let seconds = d.getSeconds();

		firebaseConf.database().ref('chatStory').push({
			message: 	this.inputName.value,
			user: 	this.state.user,
			date: 	hours + minutes + seconds
		}).then((data)=>{
			this.inputName.value = '';
			setTimeout(function(){ document.getElementById("cha").scrollTop = document.getElementById("cha").scrollHeight; }, 100);
		}).catch((error)=>{
			console.log('error ' , error)
		})
	}

	checkNick(){
		let d = new Date();
		let hours 	= d.getHours() * 10000;
		let minutes = d.getMinutes() * 100;
		let seconds = d.getSeconds();

		let actualTime = hours + minutes + seconds;

		firebaseConf.database().ref('usersOnline').once('value').then(snapshot  => {
			let itsOk = true;
			let nick 	= this.input.current.value;

			snapshot.forEach((child) => {
				if(nick == child.ref_.path["pieces_"][1]){
					if((actualTime - child.val().date) < 10){
						itsOk = false;
					}
				}
			});

			this.setState({dontExist: itsOk});
		});
	}

	login(){
		let nick 	= this.input.current.value;
		this.setState({user: nick});
		this.setState({login: true});

		this.startImLive();
	}

	startImLive(){
		let stml = setInterval((data)=>{this.imlive()}, 3000);
		this.setState({timer: stml});
	}

	imlive(){
		let d = new Date();
		let hours 	= d.getHours() * 10000;
		let minutes = d.getMinutes() * 100;
		let seconds = d.getSeconds();

		this.getParticipants();

		//.child('mike').update({'dateOfBirth': moment(value.dateOfBirth).toDate().getTime()});

		firebaseConf.database().ref('usersOnline/' + this.state.user).set({
			date: 	hours + minutes + seconds
		}).then((data)=>{
			console.log('imLive');
		}).catch((error)=>{
			console.log('error ' , error)
		})
	}

	keyDownInput(e){
		if(e.key === 'Enter'){
			this.sendMessage();
		}
	}

	getMessages(){
		firebaseConf.database().ref('chatStory').once('value').then(snapshot  => {
			let messagesFromFirebase = [];

			snapshot.forEach((child) => {
				messagesFromFirebase.push({
					user: child.val().user,
					message: child.val().message,
					id: child.val().key,
				});
			});

			this.setState({messages: messagesFromFirebase});
			setTimeout(function(){ document.getElementById("cha").scrollTop = document.getElementById("cha").scrollHeight; }, 100);
		});
	}

	getParticipants(){
		firebaseConf.database().ref('usersOnline').once('value').then(snapshot  => {
			let participantsFromFirebase = [];

			snapshot.forEach((child) => {
				participantsFromFirebase.push({
					nick: child.ref_.path["pieces_"][1],
					date: child.val().date,
					id: child.val().key,
				});
			});



			this.setState({participants: participantsFromFirebase});
			setTimeout(function(){ document.getElementById("cha").scrollTop = document.getElementById("cha").scrollHeight; }, 100);
		});
	}
}

export default App;
