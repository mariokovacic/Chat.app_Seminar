const drone = new Scaledrone('vrXmEELfVXnzUwEH');
const senderContainerForLabels = document.getElementById("senderContainer");
const senderContainerForUsernames = document.getElementById("senderUsernames");

const senderMessages = [];

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function submit() {

    const userMessageInput = document.getElementById("message");
    const userName = localStorage.getItem("username");

    let randomColor = ""
    let hasUserReceivedHisColor = false;

    if(!hasUserReceivedHisColor) {
        randomColor = getRandomColor();
    }

    let avatarInfo = {
        avatarIconLetter: userName,
        avatarBackgroundColor: randomColor
    }

    let user = {
        message: userMessageInput.value,
        username: userName,
        avatarInfo: avatarInfo
    }

    if(user.message !== "") {
        drone.publish({
            room: 'chat',
            message: user
        });
        userMessageInput.value = "";
        hasUserReceivedHisColor = true;
    } else {
        alert("Molim vas unesite neku poruku.")
    }
    

    userMessageInput.value = "";
    hasUserReceivedHisColor = true;
}

function generateLabelsForMessages(senderMessage) { 
    senderContainerForLabels.innerHTML += "<div class='sender-wrapper'>" 
    + "<span class='avatar-icon' style='background-color:" + senderMessage.avatarInfo.avatarBackgroundColor + "'>" 
    + senderMessage.avatarInfo.avatarIconLetter + "</span>"
    + "<label for='messages'>" + "<p class='username-messages'>" 
    + senderMessage.message + "</p>"
    + "</label>" + "</div>";
}

drone.on('open', error => {
    if(error) {
        console.log(error);
    }
    submit();
});

drone.on('error', error => {
    console.error(error);
});

const room = drone.subscribe('chat');

room.on('message', message => {
    senderMessages.push(message.data);
    if(message.data.message !== "") {
        generateLabelsForMessages(message.data);
    }
});