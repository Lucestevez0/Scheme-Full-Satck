var app = new function () {
    
    this.el = document.getElementById('user_information')
    this.users = new Array();

    this.Count = (data) => {
        var el   = document.getElementById('counter');
        el.innerHTML = ''+data
    };

    this.Read = () => {
        var data = '';
        if (this.users.length > 0) {
            for (i = 0; i < this.users.length; i++) {
              data += '<tr>';
              data += '<td id="edit_name">' + JSON.stringify(this.users[i].name) + '</td>';
              data += '<td>' + JSON.stringify(this.users[i].date) + '</td>';
              data += '<td><button onclick="app.Edit(' + i + ')" id= "update">Edit</button><button onclick="app.Delete(' + i + ')" id= "delete">Delete</button></td>';
              data += '</tr>';
            }
          }
          this.Count(this.users.length);
          return this.el.innerHTML = data;
    };

    this.Add = () => {
         // recebe dados do usuário
        let name = document.getElementById('name').value;
        let date = document.getElementById('date').value; 

        // verifica se tem uma propriedade no localStorage
        if(localStorage.hasOwnProperty('users')) {
        //consverte a string JSON em um objeto JavaScript
        this.users = JSON.parse(localStorage.getItem('users'));
        }

        this.users.push({name,date});
        localStorage.setItem('users', JSON.stringify(this.users)); 

        this.Read();
    };

    this.Edit = (item) => {
        let elname = document.getElementById('edit-name').value;
        let eldate = document.getElementById('edit-date').value;

        elname.value = this.users[item].name;
        eldate.value = this.users[item].date
        document.getElementById('edit').style.display = 'block';
        

        document.getElementById('save-edit').onclick = () => {
            // Get value
            let people = [{'name':elname,'date':eldate}]
      
            if (people) {
              // Edit value
              this.users.splice(item, 1,people);
              // Display the new list
              localStorage.removeItem(item - 1)
              localStorage.setItem('users',JSON.stringify(this.users));
              this.Read();
              // Hide fields
              CloseInput();
            }
          }
    }

    this.Delete = (item) => {
        // Delete the current row
    this.users.splice(item, 1);
    // Display the new list
    this.Read();
    };
}

function CloseInput() {
    document.getElementById('edit').style.display = 'none';
}