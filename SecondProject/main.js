const nameP = document.querySelector("#name");
const date = document.querySelector("#date");
const button = document.querySelector('#button').addEventListener('click', (e) => {
    e.preventDefault();
    console.log(nameP.value);
    console.log(date.value);
});