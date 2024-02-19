var f_n  = document.getElementById('name');
var ph = document.getElementById('number');
var id = document.getElementById('id');
var m_id = document.getElementById('email');
var btn = document.getElementById('submit');
var list = document.getElementById('output_screen');

list.addEventListener('click',delete_details);
list.addEventListener('click',edit_details);
btn.addEventListener('click',show_details);

function clear_fields(e){
    f_n.value="";
    ph.value="";
    m_id.value="";
    id.value="";
}
function show_details(e){
    e.preventDefault();
    result = {
        'id': id.value,
        'name':f_n.value,
        'number':ph.value,
        'email':m_id.value,
    };
    axios.post("http://localhost:3000/add-user",result)
        .then((res)=>{
            console.log(res);
            var li = document.createElement('li');
            x = res.data._id
            li.id = x
            li.appendChild(document.createTextNode(f_n.value));
            li.appendChild(document.createTextNode(' - '));
            li.appendChild(document.createTextNode(ph.value));
            li.appendChild(document.createTextNode(' - '));
            li.appendChild(document.createTextNode(m_id.value));
            li.appendChild(document.createTextNode(' '));
            var edit = document.createElement('button');
            edit.id='edit';
            edit.textContent='Edit Button'
            edit.style.borderColor = "green";
            li.appendChild(edit);
            var dte = document.createElement('button');
            dte.id='del';
            dte.textContent='Delete Button';
            dte.style.borderColor = "red";
            li.appendChild(dte);
            list.appendChild(li);
            clear_fields();
        })
        .catch((err)=>{
            console.log(err);
        });
    //var object = JSON.stringify(result);
    //localStorage.setItem(m_id.value,object);
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000/get-user")
        .then((res)=>{
            console.log(res);
            let usersdata = res.data;
            console.log(usersdata);
            for(let i=0;i<usersdata.length;i++){
                var li = document.createElement('li');
                li.id = usersdata[i].id;
                li.appendChild(document.createTextNode(usersdata[i].name));
                li.appendChild(document.createTextNode(' - '));
                li.appendChild(document.createTextNode(usersdata[i].phonenumber));
                li.appendChild(document.createTextNode(' - '));
                li.appendChild(document.createTextNode(usersdata[i].email));
                li.appendChild(document.createTextNode(' '));
                var edit = document.createElement('button');
                edit.id='edit';
                edit.textContent='Edit Button'
                edit.style.borderColor = "green";
                li.appendChild(edit);
                var dte = document.createElement('button');
                dte.id='del';
                dte.textContent='Delete Button';
                dte.style.borderColor = "red";
                li.appendChild(dte);
                list.appendChild(li);
        }
        })
        .catch((err)=>{
            console.log(err);
        })
    
})
function delete_details(e){
    if (e.target.id=='del'){
        var x = e.target.parentElement;
        console.log(x.id);
        axios.delete(`http://localhost:3000/delete-user/${x.id}`)
            .then((res)=>{
                console.log('Successfully deleted');
                list.removeChild(x);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
            // localStorage.removeItem(item1);
}

function edit_details(e){
    if (e.target.id=='edit'){
        var x = e.target.parentElement;
        console.log(x.id);
        f_n.value=x.childNodes[0].data;
        ph.value = x.childNodes[2].data;
        m_id.value=x.childNodes[4].data;
        id.value = x.id
        list.removeChild(x);

    }
}
