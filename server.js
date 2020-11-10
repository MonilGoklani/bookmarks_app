const {db,syncAndSeed,bookmarks} = require('./db')
const express = require ('express');
const app = express();
const path = require('path');

app.get('/styles.css',(req,res)=> res.sendFile(path.join(__dirname,'styles.css')));

app.get('/',async(req,res)=>{
    res.redirect('/bookmarks')
})

app.get('/bookmarks',async(req,res,next)=>{
    try{
        const bks = await bookmarks.findAll();
        res.send(`
        <html>
        <head>
            <link rel='stylesheet' href = '/styles.css' />
        </head>
        <body>
            <h1> BOOKMARKS (${bks.length})<h1>
            <ul>
                ${bks.map(elem=>`
                    <li>
                    <a href = '/bookmarks/${elem.id}'>
                    ${elem.category}
                    </a>
                    </li>
                `
                ).join('')}
            </ul>
        </body>
        </html>
        `);
    }catch(error){
        next(error)
    }
})

app.get('/bookmarks/:id',async(req,res,next)=>{
    try{
        const bks = await bookmarks.findAll();
        res.send(`
        <html>
        <head>
            <link rel='stylesheet' href = '/styles.css' />
        </head>
        <body>
            <h1> BOOKMARKS (${bks.length})<h1>
            <ul>
                ${bks.map(elem=>`
                    <li>
                    <a href = '/bookmarks/${elem.id}'>
                    ${elem.name}
                    </a>
                    </li>
                `
                ).join('')}
            </ul>
        </body>
        </html>
        `);
    }catch(error){
        next(error)
    }
})

const init = async() =>{
    try{
        await db.authenticate();
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port,()=> console.log(`listening on port ${port}`));

        // console.log(await bookmarks.findAll())
    }catch(error){
        console.log(error)
    }
}

init()