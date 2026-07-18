const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user_name = document.getElementById("user_name").value;
    const user_password = document.getElementById("user_password").value;

    try {

        const response = await fetch("/api/user/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                user_name,
                user_password
            })

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        localStorage.setItem("token", data.token);

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);

        alert("Error al conectar con el servidor.");

    }

});
