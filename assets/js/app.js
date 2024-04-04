const template = document.querySelector("#template");
const container = document.querySelector("#container");
const number = document.querySelector("#number");
const form = document.querySelector("form");
const fragment = document.createDocumentFragment();

const call = async () => {
    const numberPokemon = number.value;
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numberPokemon}`);

        if (!response.ok) {
            throw new Error("Ha ocurrido un error");
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Error:", err.message);
    }
};

const pintarPokemon = (data) => {
    container.textContent = "";

    const clone = template.content.firstElementChild.cloneNode(true);
    clone.querySelector(".normal").textContent = data.name;
    clone.querySelector(".idN").textContent = `id number: ${data.id}`;
    clone.querySelector(".heightN").textContent = `height: ${data.height} m`;
    clone.querySelector(".weightN").textContent = `weight: ${data.weight} kg`;
    clone.querySelector("#imgPoke").src = data.sprites.other["official-artwork"]["front_default"];
    clone.querySelector("#imgPoke").alt = data.name;
    clone.querySelector(".shiny").textContent = `${data.name} (Shiny)`;
    clone.querySelector(".idS").textContent = `id number: ${data.id}`;
    clone.querySelector(".heightS").textContent = `height: ${data.height} m`;
    clone.querySelector(".weightS").textContent = `weight: ${data.weight} kg`;
    clone.querySelector("#imgPokeShiny").src = data.sprites.other["official-artwork"]["front_shiny"];
    clone.querySelector("#imgPokeShiny").alt = data.name;

    fragment.appendChild(clone);
    container.appendChild(fragment);
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await call();

    pintarPokemon(data);
});
