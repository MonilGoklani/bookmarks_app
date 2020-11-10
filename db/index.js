const Sequilize = require('sequelize')
const {STRING} = Sequilize;
const db = new Sequilize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_db')


const bookmarks = db.define('bookmarks',{
    name:{
        type:STRING,
        allowNull:false
    },
    url:{
        type:STRING,
        allowNull:false
    },
    category:{
        type:STRING,
        allowNull:false
    }
})


const syncAndSeed = async() =>{
await db.sync({force: true});
await bookmarks.create({name:'Google',url:'https://www.google.com/',category:'Search Engines'});
await bookmarks.create({name:'Bing',url:'https://www.bing.com/',category:'Search Engines'});
await bookmarks.create({name:'BBC',url:'https://www.bbc.com/news',category:'News'});
await bookmarks.create({name:'NPR',url:'https://www.npr.org/',category:'News'});
await bookmarks.create({name:'ABC',url:'https://abcnews.go.com/',category:'News'});
await bookmarks.create({name:'Amazon',url:'https://www.amazon.com/',category:'Shopping'});
await bookmarks.create({name:'Ebay',url:'https://www.ebay.com/',category:'Shopping'});
}


module.exports= {
    db,
    syncAndSeed,
    bookmarks
}