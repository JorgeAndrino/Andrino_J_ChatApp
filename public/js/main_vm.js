import ChatMessage from './modules/ChatMessage.js';

const socket = io();


function setUserId({sID, message}) {
    //debugger;
    console.log('connected', sID, message);
    vm.socketID = sID;

}

function connectNotification({notifications}){
    vm.notifications.push(notifications);
}

function appendMessage(message) {
    vm.messages.push(message);
}

function userCount(data) {
    console.log(data.userCount);
}

//socket.on('userCount', function (data) {
//    console.log(data.userCount);
//});


const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        notification: "",
        notifications: [],
        messages: []
    },

    methods: {
        dispatchMessage() {
            //send a chat message
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"} );


            this.message = "";
        }
    },

    components: {
        newmessage: ChatMessage
    }


}).$mount("#app");

socket.addEventListener('connected', setUserId);

socket.addEventListener('user joined', connectNotification);

socket.addEventListener('connected users', userCount);

socket.addEventListener('chat message', appendMessage);

socket.addEventListener('disconnect', appendMessage);