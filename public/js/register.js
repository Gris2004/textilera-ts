const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user_name = document.getElementById("user_name").value;
    const user_password = document.getElementById("user_password").value;

    try {

        const response = await fetch("/api/user/create", {

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

        alert(data.message);

        if (response.ok) {

            window.location.href = "index.html";

        }

    } catch (error) {

        console.error(error);

        alert("Error al conectar con el servidor.");

    }

});
