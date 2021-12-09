const express=require('express')
const app=express()
app.use(express.json())

let phonebooks=
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res)=>{
    res.json(phonebooks)
})

app.get('/api/persons/:id',(req,res)=>{
  const id=Number(req.params.id)
  const phonebook=phonebooks.find(pid=>pid.id===id)
  if(phonebook){
    res.json(node)
  }else{
    res.status(404).json({"error":"id not exist."})
  }
})

app.delete('/api/persons/:id',(req,res)=>{
  const id=Number(req.params.id)
  phonebooks=phonebooks.filter(pb=>pb.id!==id)
  res.status(204).end()
})

app.post('/api/persons',(req,res)=>{
  const body=req.body
  if(!body.name || !body.number){
    return res.status(400).json({
      error:"name or number is missing"
    })
  }

  const existname=phonebooks.find(pname=> pname.name===body.name)
  if(existname){
    return res.status(400).json({
      error: "name mast be unique"
    })
  }

  const phonebook={
    id: Math.floor(Math.random()*100000000),
    name: body.name,
    number: body.number
  }

  phonebooks= phonebooks.concat(phonebook)

  res.json(phonebook)
})

app.get('/info',(req,res)=>{
  const len=phonebooks.length
  const accesstime=new Date()
  res.send(`<p>Phonebook has info for ${len} people</p>\n
  <p>${accesstime}</p>
  `)
})

const PORT=3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})