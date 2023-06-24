
document.querySelector('#create').addEventListener('click', (e) => {
    e.preventDefault();
    
    // recebe dados do usuário
    let firstName = document.getElementById('firstname').value;
    let surName = document.getElementById('surname').value;
    let dateBirth = document.getElementById('date').value; 
    
    // cria um array de objetos
    let users = new Array();

    // verifica se tem uma propriedade no localStorage
    if(localStorage.hasOwnProperty('users')) {
        //consverte a string JSON em um objeto JavaScript
        users = JSON.parse(localStorage.getItem('users'));
    }
    // - Create
        // adiciona um novo objeto
        users.push({firstName,surName,dateBirth});
        // salvar no localStorage
        localStorage.setItem('users', JSON.stringify(users));
        let option = document.getElementById('select_users').appendChild(document.createElement('option'));
        option.textContent = ""+firstName;
        option.value = ""+firstName;
});

 // -  Read
document.querySelector('#read').addEventListener('click',(e) => {
    e.preventDefault();

    let select = document.getElementById('select_users');
    let option = select.options[select.selectedIndex].textContent;
    let user = JSON.parse(localStorage.getItem('users'));
    user = user.find(({firstName}) => firstName === option);
    document.getElementById('user_information').insertAdjacentHTML('beforeend','Nome: '+user.firstName+
    "<br>Sobrenome: "+user.surName+ '<br>Data de Nascimento: '+user.dateBirth+'<hr>');
});

// - Update
document.querySelector('#update').addEventListener('click', (e) => {
    e.preventDefault();

    let select = document.getElementById('select_users');
    let option = select.options[select.selectedIndex].textContent;
    let user = JSON.parse(localStorage.getItem('users'));
    user = user.find(({firstName}) => firstName === option);
});

// - Delete
document.querySelector('#delete').addEventListener('click', (e) => {
    e.preventDefault();

    let select = document.getElementById('select_users');
    let option = select.options[select.selectedIndex].textContent;
    let user = JSON.parse(localStorage.getItem('users'));
    user = user.find(({firstName}) => firstName === option);
    document.getElementById('user_information').removeChild();
});