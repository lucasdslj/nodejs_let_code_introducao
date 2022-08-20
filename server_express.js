const express = require('express')
const shortId = require('shortid')
const fs = require('fs')
const app = express()

app.use(express.static('public'))
app.use(express.json())

let produtos = []


fs.readFile('produtos.json', 'utf-8', (err, data)=>{
    if (err){
        console.log("Arquivo não encontrado");
    }else{
        produtos = JSON.parse(data)
    }
})

app.post('/produtos', (request, response)=>{

    const prod = {
        id: shortId(),
        equipamento: request.body.equipamento,
        centro: request.body.centro,
        quantidade: request.body.quantidade
    }

    produtos.push(prod)

    manage_arquivo_produto()

    response.send(JSON.stringify({
        message: "Produto criado com sucesso"
    }))
})

app.get('/produtos', (request, response)=>{
    return response.json(produtos)
})


app.get('/produtos/:id', (request, response)=>{
    const { id } = request.params
    const prod_encontrado = produtos.find(prod => prod.id == id)
    if(prod_encontrado){
        return response.json(prod_encontrado)
    }else{
        return response.json({message: "Produto não encontrado"})
    }

})


app.put('/produtos/:id', (request, response)=>{
    const { id } = request.params
    const index = produtos.findIndex(prod => prod.id == id)

    produtos[index] ={
        id: produtos[index].id,
        equipamento: request.body.equipamento,
        centro: request.body.centro,
        quantidade: request.body.quantidade
    }

    manage_arquivo_produto()
    return response.json({message: "Produto atualizado com sucesso!"}) 

})


app.delete('/produtos/:id', (request, response)=>{
    const { id } = request.params
    const index = produtos.findIndex(prod => prod.id == id)
    
    produtos.splice(index,1)

    manage_arquivo_produto()
    return response.json({message: "Produto deletado com sucesso!"})

})

function manage_arquivo_produto(){
    fs.writeFile('produtos.json', JSON.stringify(produtos), (err)=>{
        if (err){
            console.log(err);
        }else{
            console.log("Arquivo escrito com sucesso");
        }

    })
}

app.listen(5001, ()=>{
    console.log('servidor com express rodando na porta 5001')
})