let my_form = document.getElementById('my-form');
let expanse_list = document.getElementById('expenses-list');
my_form.addEventListener('submit',save_expanse);


function showExpanse(obj){
    let user_list = document.getElementById('users');
    let li = document.createElement('li');

    // DELETE BUTTON//
    let del_button = document.createElement('input');
    del_button.type = 'button';
    del_button.value = 'delete';
    del_button.className = 'del-btn';
    del_button.appendChild(document.createTextNode('delete'));

    // //EDIT BUTTON
    // let edit_button = document.createElement('input');
    // edit_button.type = 'button';
    // edit_button.value = 'edit';
    // edit_button.className = 'edit-btn';
    // edit_button.appendChild(document.createTextNode('edit'));

    let user_details = obj.amount + ' - ' + obj.description + ' - ' + obj.category;
    li.appendChild(document.createTextNode(user_details));
    li.appendChild(del_button);
    // li.appendChild(edit_button);

    expanse_list.appendChild(li);
    let id = obj.id;

    // edit_button.onclick = () =>{
    //     document.getElementById('name').value = obj.name;
    //     document.getElementById('email').value = obj.email;
    //     document.getElementById('phn_no').value = obj.phn_no;
    //     axios.delete(`${crud_id}/${obj._id}`).then((response)=>{
    //     console.log(response);
    //     user_list.removeChild(li);})
    // }
    del_button.onclick = () =>{
        console.log('del clicked')
        axios.post(`http://localhost:5000/del-expanse/${id}`)
        .then(
            expanse_list.removeChild(li)
        )
        .catch(err => console.log(err))
    }
    }


async function getAllExpanses(){
    try{
        let response = await axios.get('http://localhost:5000/expanses');
        response.data.forEach(entry => showExpanse(entry));
    }
    catch(err)
    {
        console.log(err);
    }
}

window.addEventListener("DOMContentLoaded" , ()=>{
    getAllExpanses();
})

// getAllBookings();

function save_expanse(e){
    e.preventDefault();
    const expanse ={
    };
    expanse.amount = document.getElementById('expense-amount').value;
    expanse.description = document.getElementById('desc').value;
    expanse.category = document.getElementById('category').value;

    axios.post('http://localhost:5000/add-expanse',expanse)
    .then((response)=>{
        expanse.id = response.data.id;
        showExpanse(expanse);
    })
    .catch((err)=> console.log(err))
    // localStorage.setItem(user.email,JSON.stringify(user));
}