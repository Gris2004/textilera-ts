const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "index.html";

}

const tbody = document.querySelector("#fabricTable tbody");

const modal = document.getElementById("fabricModal");

const form = document.getElementById("fabricForm");

const newButton = document.getElementById("newFabric");

const cancelButton = document.getElementById("cancelModal");

const logout = document.getElementById("logout");

const title = document.getElementById("modalTitle");

const idInput = document.getElementById("fabricId");

const nameInput = document.getElementById("fabric_name");

const colorInput = document.getElementById("fabric_color");

const qualityInput = document.getElementById("fabric_quality");

const dateInput = document.getElementById("fabric_entry_date");

logout.onclick = () => {

    localStorage.removeItem("token");

    window.location.href = "index.html";

};

newButton.onclick = () => {

    title.textContent = "Nueva Tela";

    form.reset();

    idInput.value = "";

    modal.style.display = "block";

};

cancelButton.onclick = () => {

    modal.style.display = "none";

};

async function loadFabrics() {

    const response = await fetch("/api/fabric", {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const fabrics = await response.json();

    tbody.innerHTML = "";

    fabrics.forEach(fabric => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${fabric.fabric_name}</td>

            <td>${fabric.fabric_color}</td>

            <td>${fabric.fabric_quality}</td>

            <td>${new Date(fabric.fabric_entry_date).toLocaleDateString()}</td>

            <td>

                <button
                    class="edit"
                    data-id="${fabric._id}">

                    Editar

                </button>

                <button
                    class="delete"
                    data-id="${fabric._id}">

                    Eliminar

                </button>

            </td>

        `;

        tbody.appendChild(row);

    });

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fabric = {

        fabric_name: nameInput.value,

        fabric_color: colorInput.value,

        fabric_quality: qualityInput.value,

        fabric_entry_date: dateInput.value

    };

    const id = idInput.value;

    let url = "/api/fabric";

    let method = "POST";

    if (id !== "") {

        url = `/api/fabric/${id}`;

        method = "PUT";

    }

    await fetch(url, {

        method,

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

        },

        body: JSON.stringify(fabric)

    });

    modal.style.display = "none";

    loadFabrics();

});

tbody.addEventListener("click", async (e) => {

    if (e.target.classList.contains("delete")) {

        const id = e.target.dataset.id;

        if (!confirm("¿Eliminar la tela?")) {

            return;

        }

        await fetch(`/api/fabric/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        loadFabrics();

    }

    if (e.target.classList.contains("edit")) {

        const row = e.target.parentElement.parentElement;

        const id = e.target.dataset.id;

        idInput.value = id;

        title.textContent = "Editar Tela";

        nameInput.value = row.cells[0].textContent;

        colorInput.value = row.cells[1].textContent;

        qualityInput.value = row.cells[2].textContent;

        dateInput.value = "";

        modal.style.display = "block";

    }

});

loadFabrics();
