
    const Name = document.getElementById('name')
    const Number = document.getElementById('number')
    const Button = document.getElementById('submit')
    const updateButton = document.getElementById('update')
    const Table = document.getElementById('table')
    const databutton = document.getElementById('getdata')
    const API_URL = "http://localhost:3000/users"
    var uid


    Button.addEventListener('click',() =>{
        const id = Math.floor(Math.random()*50)
        const user = {
            id: `${id}`,
            name:`${Name.value}`,
            number:`${Number.value}`
        }
        handlePost(user)
    })
    const handlePost = async(user) => {
        try
        {
            const response = await fetch(API_URL,{
                method:'POST',
                headers: {
                    'Content-Type' : 'Application/json' 
                },
                body: JSON.stringify(user) 
            })
        }
        catch(err)
        {
            console.log(err)
        }
    }


    databutton.addEventListener('click', async () =>{
        const data = await handleGet()
        data.forEach(e => {
            const newRow = `<tr>
            <td> <img src="icons/icon2.png">  ${e.name}</td>
            <td>${e.number}</td>
            <button class ="edit" onclick="handleEdit(${e.id},'${e.name}','${e.number}')">Edit</button><button class="Delete" onclick="handleDelete(${e.id})">Delete</button>
            </tr>`
            Table.innerHTML += newRow
        })
    })
    const handleGet = async () => {
        try
        {
            const response = await fetch(API_URL, {
                method:'GET',
                headers: {
                    'Accept': 'Application/json' 
                }
            }) 
            const data = await response.json()
            return(data)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const handleDelete = async(id)=>{
        try{
            const response = await fetch(`${API_URL}/${id}`,{
                method:'DELETE' 
             })
        }
        catch(err){
            console.log(err)
        }
    }
    const handleEdit = (id,name,number) => {
        uid = id
        Name.value = name
        Number.value = number
        Button.style.display = 'none'
        updateButton.style.display = 'block'
    }
    
    updateButton.addEventListener('click', (e) => {
        const editedUser = {
            id: `${uid}`,
            name : `${Name.value}`,
            number : `${Number.value}`
        }
        console.log(editedUser)
        handleJsonEdit(editedUser)
        Name.value = ''
        Number.value = ''
    })
    
    const handleJsonEdit = async (user) => {
        try
        {
            const response = await fetch(`${API_URL}/${uid}`,{ 
                method: 'PUT',
                headers: {
                    'Content-Type' : 'Application/json'
                },
                body : JSON.stringify(user)
            })
        }
        catch(err)
        {
            console.log(err)
        }
    }
    

