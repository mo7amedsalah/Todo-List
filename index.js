const helper = require('./helpers')

function main(cmdArgs) {
    const parseArgs = helper.parseCmdArgs(cmdArgs);
    helper.createIfNotExists('./todo.json')
    switch (parseArgs.command) {
        case 'add':
            helper.add(parseArgs)
            break;
        case 'edit':
            helper.edit(parseArgs)
            break;
        case 'remove':
            helper.remove(parseArgs)
            break;
        case 'list':
            helper.list(parseArgs)
            break;
        
        default:
            break;
    }
}

main(process.argv)