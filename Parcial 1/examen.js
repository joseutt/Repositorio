const url = 'https://jsonplaceholder.typicode.com/todos';
const read = require('readline');

const leer = read.createInterface({
    input: process.stdin,
    output: process.stdout
});

//se obtienen los datos del json
async function dataJson() {
        const response = await fetch(url);
        const todos = await response.json();
        return todos;
}

async function menu() {
    const todos = await dataJson();

    function ID_UserID(todosList) {
        todosList.forEach(todo => {
            const status = todo.completed ? 'Completado' : 'No completado';
            console.log(`ID: ${todo.id}, UserId: ${todo.userId}`);
        });
    }

    function mostrar_Todo(todosList) {
        todosList.forEach(todo => {
            const status = todo.completed ? 'Completado' : 'No completado';
            console.log(`ID: ${todo.id}, Title: ${todo.title}`);
        });
    }

    console.log('************************ Menú ****************************');
    console.log('*                  Lista de pendientes                   *');
    console.log('*1. Solo IDs                                             *');
    console.log('*2. IDs y Titles                                         *');
    console.log('*3. Sin resolver (ID y Title)                            *');
    console.log('*4. Resueltos (ID y Title)                               *');
    console.log('*5. Pendientes (IDs y userID)                            *');
    console.log('*6. Sin resolver (ID y userID)                           *');
    console.log('*7. Resueltos (ID y userID)                              *'); 
    console.log('*8. Salir                                                *');
    console.log('**********************************************************');
    
    leer.question('Elija una opción: ', (resp) => {
        switch (resp) {
            case '1':
                console.log('Lista de todos los pendientes (solo IDs):');
                todos.forEach(todo => console.log(todo.id));
                break;
            case '2':
                console.log('Lista de todos los pendientes (IDs y Titles):');
                mostrar_Todo(todos);
                break;
            case '3':
                console.log('Lista de todos los pendientes sin resolver (ID y Title):');
                const sinResolver = todos.filter(todo => !todo.completed);
                mostrar_Todo(sinResolver);
                break;
            case '4':
                console.log('Lista de todos los pendientes resueltos (ID y Title):');
                const resolvedTodos = todos.filter(todo => todo.completed);
                mostrar_Todo(resolvedTodos);
                break;
            case '5':
                console.log('Lista de todos los pendientes (IDs y userID):');
                todos.forEach(todo => console.log(`ID: ${todo.id}, UserID: ${todo.userId}`));
                break;
            case '6':
                console.log('Lista de todos los pendientes sin resolver (ID y userID):');
                const UserID = todos.filter(todo => !todo.completed);
                ID_UserID(UserID);
                break;
            case '7':
                console.log('Lista de todos los pendientes resueltos (ID y userID):');
                const resueltos_UserID = todos.filter(todo => todo.completed);
                ID_UserID(resueltos_UserID);
                break;
            case '8':
                console.log('Buen dia.');
                leer.close();
                break;
            default:
                console.log('Opción no válida, elige una opción del 1 al 8.');
                break;
        }

        if (resp !== '8') {
            menu();
        }

    });
}

menu();
