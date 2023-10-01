
let routes = [
    {
        path: '/',
        method: 'GET',
        scope: 'public',
        handler: (request, res) => {
            res.json({
                message: '/api/v1'
            })
        }
    },
    {
        path: '/status',
        method: 'GET',
        scope: 'public',
        handler: (request, res) => {
            res.json({
                status: 'OK',
                dependencies: request.dependencies.ls.map((dep) => {
                    return {
                        name: dep,
                        status: request.dependencies[dep] ? 'OK' : 'ERROR'
                    }
                })

            })
        }
    }
];

// register all the .js files in the routes folder
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const subDirectory = "routes";
fs.readdirSync(__dirname + '/' + subDirectory)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const route = require(path.join(__dirname + '/' + subDirectory, file));
        routes.push(Object.values(route)[0]);
    });
routes = routes.flat();


module.exports = routes;
