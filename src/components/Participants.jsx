import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

class Participants extends React.Component {
  componentDidMount() {
	setTimeout(function(){ document.getElementById("cha").scrollTop = document.getElementById("cha").scrollHeight; }, 100);
  }


  render() {
	let participants = this.props.participants.sort(compare).reverse();


	function compare(a, b) {
	  if ( a.date < b.date ){
	    return -1;
	  }
	  if ( a.date > b.date ){
	    return 1;
	  }
	  return 0;
	}

	return (
		<List>
			{participants.map(item => (
				<ListItem 
					className={(this.timeDiference(item.date) == 'Desconectado') ? 'opacity' : ''}
					key={item.nick}
				>
					<ListItemAvatar>
						<Avatar>
							<ImageIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={item.nick} secondary={this.timeDiference(item.date)} />
				</ListItem>
			))}
		</List>
	);
  }

  timeDiference(remoteTime){
	let d = new Date();
	let hours 	= d.getHours() * 10000;
	let minutes = d.getMinutes() * 100;
	let seconds = d.getSeconds();

	let actualTime = hours + minutes + seconds;

	if((actualTime - remoteTime)<5){
		return "Conectado";
	}else{
		return "Desconectado";
	}
  }
}

export default Participants;