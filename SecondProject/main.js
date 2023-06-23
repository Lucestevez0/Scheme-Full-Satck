
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
        document.getElementById('select_users').add(document.createElement('option').text = firstName);      
});
 // - Read
document.querySelector('#read').addEventListener('click',(e) => {
    e.preventDefault();

    let firstName = document.getElementById('firstname').value;
    let surName = document.getElementById('surname').value;
    let dateBirth = document.getElementById('date').value;

    document.getElementById('userinformation').insertAdjacentHTML('beforeend','Nome: '+firstName+
    '<br>Sobrenome: '+surName+ '<br>Data de Nascimento: '+dateBirth+'<hr>');
});