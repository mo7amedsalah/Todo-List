const fs = require('fs')
const todo_fileName= 'todo.json'
let todos = []

function addTodos(){
    if(fs.existsSync(todo_fileName)){
        let data = fs.readFileSync(todo_fileName, 'utf8')
        todos=JSON.parse(data)
    }
}
addTodos()


function saveTodo(){
    let data= JSON.stringify(todos)
    fs.writeFileSync(todo_fileName,data)
}




exports.parseCmdArgs = function parseCmdArgs(args) {
    const [, , command, ...options] = args;
    const parseOptions = options.reduce((cum, elm) => {
        const [optionName, optionValue] = elm.split('=');
        cum[ optionName ] = optionValue;
        return cum;
    }, {})
    parseOptions.command = command;
    return parseOptions;
}

exports.add = function add(args){
    if(args.hasOwnProperty('title') && args.hasOwnProperty('body')){
        delete args.command
        let id = todos.length
        args.id = id+1;
        args.checked = false
        todos.push(args)
        saveTodo()
        console.log("Todo Added Successfully!.....")
    }else{
        throw ("You must add title and body to add todo!....")
    }
}

exports.edit = function edit(args){
    if(args.hasOwnProperty('id')){
        let isFounded = false
        todos = todos.filter((todo)=>{
            if(todo.id === parseInt(args.id)){
                isFounded = true
                if(args.hasOwnProperty('title')){
                    todo.title = args.title
                }
                if(args.hasOwnProperty('body')){
                    todo.body = args.body
                }
                if(args.hasOwnProperty('checked')){
                    todo.checked = args.checked === 'true'
                }
            }
            return todo
        })
        saveTodo()
        if(isFounded)
            console.log("Todo updated Successfully!.....")
        else
            console.log("Sorry,Todo not founded!....")
    }else{
        throw ("You must add todo id to edit !....")
    }
}

exports.remove = function destroy(args){
    if(args.hasOwnProperty('id')){
        let isFounded = false
        todos = todos.filter((todo)=>{
            if(todo.id !== parseInt(args.id)){
                return todo
            }{
                isFounded = true
            }
        })
        saveTodo()
        if(isFounded)
            console.log(`Todo with id ${args.id} deleted Successfully!....`)
        else
            console.log("Sorry,Todo not founded!....")
    }else{
        throw ("You must add todo id to delete it!....")
    }
}

exports.list =function list(){
    todos.forEach((todo)=>{
        console.log(todo)
    })
}

