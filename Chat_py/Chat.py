from flask import Flask,request
from flask_socketio import SocketIO, emit, send, join_room, leave_room,rooms
from datetime import datetime
import requests

#import pyodbc


app = Flask(__name__)

app.config['SECRET_KEY'] = 'el secreto'
socketio = SocketIO(app, cors_allowed_origins="*")

users = set()

@socketio.on('mensajeEnviar')
def mensajeEnviar(mensaje):
    msg = {
            'username':mensaje['usuario'],
            'hora': str(datetime.now().strftime('%H:%M')),
            'message':mensaje['message_send'],
    }
    requests.post("http://127.0.0.1:8000/api/v1/rest-auth/saveMessages/", data=msg)
    emit('mensajeEnviar', msg, broadcast=True)


listClientsConnect = []


@socketio.on('clientIsConnect')
def clientIsConnect(userData):    
    data = {
        'username':userData['username'],
    }
    users.add(userData['username'])
    emit('clientIsConnect',list(users), broadcast=True)




@socketio.on('clientIsDisconnect')
def clientIsDisconnect(userData):
    users.discard(userData['username'])
    emit('clientIsDisconnect',list(users),broadcast=True)

@socketio.on('connect')
def connect():
    emit('broadcast', {'data':"aaa"}, broadcast=True)


@socketio.on('disconnect')
def disconnect():
    print('Disconnected')

    
    emit('broadcast', {'data': 'Disconnected'}, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)