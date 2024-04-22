
    const Name = document.getElementById('name')
    const Number = document.getElementById('number')
    const Button = document.getElementById('submit')
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

    databutton.addEventListener('click', async () =>{
        const data = await handleGet()
        data.forEach(e => {
            const newRow = `<tr>
            <td>${e.name}</td>
            <td>${e.number}</td>
            <td><button onclick="handleDelete(${e.id})">Delete</button></td>
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
    

