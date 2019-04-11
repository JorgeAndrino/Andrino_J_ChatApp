import ChatMessage from './modules/ChatMessage.js';

const socket = io();


function setUserId({sID, message}) {
    //debugger;
    console.log('connected', sID, message);
    vm.socketID = sID;

}


function appendMessage(message) {
    vm.messages.push(message);
}

function userCount(data) {
    console.log(data)
    vm.users=data.users;
}


const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        notification: "",
        notifications: [],
        messages: [],
        users: ""
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

socket.addEventListener('userCount', userCount);

socket.addEventListener('chat message', appendMessage);

socket.addEventListener('disconnect', appendMessage);