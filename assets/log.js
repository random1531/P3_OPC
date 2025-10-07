const btnlog = document.getElementById("btnlog");

btnlog.addEventListener("click", async function (e) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errormsg = document.getElementById("errorMsg");
  e.preventDefault();
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const log = await response.json();
  console.log(log.status);
  if (response.status === 200) {
    localStorage.setItem("token", log.token);
    localStorage.setItem("status", "connected");
    window.location.href = "../index.html";
  } else {
    errormsg.textContent = "Erreur dans l’identifiant ou le mot de passe";
  }
});
