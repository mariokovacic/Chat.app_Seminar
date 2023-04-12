function checkUsernameDefinition() {
    const userNameInput = document.getElementById("username").value;
    if(userNameInput !== "") {
        localStorage.setItem("username", userNameInput);
        window.location.href = "chat.html";
    } else {
        alert("Molimo Vas unesite svoj username prije ulaska u chat aplikaciju.");
    }
}