function checkIfUserExists() {
  const userName = localStorage.getItem("username");
  console.log(userName);
  if (userName === null) {
    alert("Ne možete pristupiti ovoj stranici bez korisničkog imena.");
    window.location.href = "index.html";
  }
}

checkIfUserExists();
