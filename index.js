const express = require('express');
const mongoose = require('mongoose');
const Todos = require('./model/todo');
const dotenv = require('dotenv');


const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 5000 || 8080;
const db = process.env.DB_LOCAL;
const dbonline = process.env.DB_ONLINE; 

// port = 5000;

// Connnect to your mongodb server    replace the mongoose database link with dbonline defined

mongoose.connect(dbonline,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log('Database Connected Successfully');
}).catch((err)=>{
    console.log(err)
})


app.get('/', (req,res) => {
    res.send('Welcome Baba Jamal Issaka Denni')
    // console.log('Still listen to me')
})

// sending/Posting a record to the database
app.post('/add', async (req, res) => {
const {title, description, author } = req.body;
const todos = await Todos.create({
    title,
    description,
    author,
})
if(todos){
    res.status(201).json({
        status: true,
        message: "Todo was created successfully",
        data: todos

    })
   

}else{
    res.status(400).json({
        status: false,
        message: "Sorry something went wrong",
    })
}
})


// Getting a data from the database
app.get('/getallTodos', async(req,res) =>{
    const data = await Todos.find()
    res.send(data)
    
    if(data){
        res.status(200).json({
            status: true,
            message: "Sucess",
            data: data
        })
    }else{
        res.status(400).json({
        status: false,
        message: "Sorry something went wrong"
        })
    }
});


// Deleting Todo from the database

app.delete('/remove/:id', async(req,res) =>{
    const data = await Todos.findByIdAndDelete(req.params.id)

    if(data){
        res.status(200).json({
            status: true,
            message: "Todo has been deleted suceessfully"
        })
      }else{
            res.status(400).json({
                status: false,
                message: "Sorry unable to delete Todo"
            })
        }
    })

    // Editting todo information

    app.patch("/patch/:id", async (req, res) => {
        const {id} = req.params;
        const {title, description, author} = req.body;

        const todo = await Todos.updateOne({
            title: title,
            description: description,
            author: author,
        }).where({_id: id });

        if(todo){
            res.status(200).json({
                status: true,
                message: "updated",
                data: todo
            })
        }else{
            res.status(400).json({
                status: false,
                message: "Sorry something went wrong"
            })
        }
    })

    // Editting todo information number(2)

    // app.patch("/patch/:id", async (req, res) => {
    //     const {id} = req.params;
    //     const {changes} = req.body;

    //     const todo = await Todos.updateOne(changes).where({_id: id });

    //     if(todo){
    //         res.status(200).json({
    //             status: true,
    //             message: "updated",
    //             data: todo
    //         })
    //     }else{
    //         res.status(400).json({
    //             status: false,
    //             message: "Sorry something went wrong"
    //         })
    //     }
    // })

    
// Putting a data into the dadabase for changes

app.put("/put/:id", async (req, res) => {
    const {id} = req.params;
    const {title, description, author} = req.body;

    const todo = await Todos.updateOne({
        title: title,
        description: description,
        author: author,
    }).where({_id: id });

    if(todo){
        res.status(200).json({
            status: true,
            message: "updated",
            data: todo
        })
    }else{
        res.status(400).json({
            status: false,
            message: "Sorry something went wrong"
        })
    }
})


app.listen(port, () =>{
    console.log('I am logged in')
})


