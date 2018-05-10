const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const serverWebFolder = global.__root + '/libs/server-web/';
const serverWebFolderViews = global.__root + '/libs/server-web/assets/views/';
var default_download_folder = "";
//Set download default folder with config file
if (global.config.default_folder === "default") {
    default_download_folder = global.__root + '\\data\\record\\'
} else {
    default_download_folder = global.config.default_folder
}

class serverWeb {
    constructor() {

        //Configuration de express.js
        app.use(express.static(global.__root + '/libs/server-web/assets/'));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        /** ROUTAGE DE BASE POST **/

        //Post un avis
        app.post('/addAvis/', function (req, res) {
            global.records.push(new global.class_record(req.body.url, req.body.quality, req.body.folder, req.body.startAt, req.body.endAt));
            global.module_datamanager.saveRecords();
            io.emit('records', global.records);
            res.json("ok");
        });

        /** ROUTAGE DE BASE GET **/

        //Get les ateliers
        app.get('/getAteliers', function (req, res) {
            global.module_oracledb.getTable("ATELIER").then(function(result){
                res.send(result);
            });
        });

        //Page accueil
        app.get('/', function (req, res) {
            res.render(serverWebFolderViews + 'avis.ejs', {
                page: "avis",
            });
        });

        //Page process
        app.get('/statistiques', function (req, res) {
            res.render(serverWebFolderViews + 'statistiques.ejs', {
                page: "statistiques"
            });
        });

        //Page introuvable
        app.use(function (req, res, next) {
            res.setHeader('Content-Type', 'text/plain');
            res.status(404).send('Page introuvable !');
        });

        //Ecoute sur le port
        http.listen(global.config.server_port, function () {
            console.log('listening on *:' + global.config.server_port);
        });

        //Gestion de socket.io
        io.on('connection', function (socket) {
            console.log('Utilisateur connecté');
            socket.on('disconnect', function () {
                console.log('Utilisateur déconnecté');
            });
        });

    }
}

module.exports = new serverWeb();
