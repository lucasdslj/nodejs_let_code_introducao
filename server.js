const http = require('http')

http.createServer((req, res)=>{

    // res.write('Olá, Mundo!')
    res.end('<h1>Ola, Mundo</h1>')
    return

}).listen(4000, ()=>{
    console.log('Server run on port 4000');
})