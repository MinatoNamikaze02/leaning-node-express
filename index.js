
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
let notes = [
{
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
},
{
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
},
{
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
}
]

app.get('/api/notes/', (request, response) => {
    const req = request.body
    console.log(req)
    response.json(notes)
})
app.get('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const deletedNote = notes.filter(note=>note.id===id)
    notes = notes.filter(note=>note.id !== id)
    console.log(deletedNote)
    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n=>n.id)) : 0

    return maxId + 1

} 

app.post('/api/notes', (request, response) => {
    const checkNote = request.body
    console.log(checkNote)
    if(!checkNote.content){
        return response.status(400).json({
            error: 'Content Missing'
        })
    }
    const note = {
        content: checkNote.content,
        important: checkNote.important || false,
        date:  new Date(),
        id: generateId(),
    }
    notes = notes.concat(note)
    response.json(note)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})
