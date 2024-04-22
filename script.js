
    const Name = document.getElementById('name')
    const Number = document.getElementById('number')
    const Button = document.getElementById('submit')
    const Table = document.getElementById('table')
    const databutton = document.getElementById('getdata')
    const API_URL = "http://localhost:3000/users"
    var uid


    Button.addEventListener('click',() =>{
        const user = {
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
                    'Accept': 'Application/json' // Accepting the response as json
                }
            }) 
            const data = await response.json() // converting the response into json it takes time so await is used. If await is not used it will return a promise with state pending
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
                    'Content-Type' : 'Application/json' // posting the data into json server so the content type is mentioned as json 
                },
                body: JSON.stringify(user) // converting the object user into json using stringify method. the content inside the body will be posted at the server
            })
        }
        catch(err)
        {
            console.log(err)
        }
    }
    

