/**
 * SERVEUR AUTORECORD STREAM
 */

//Création du global root folder
global.__root = __dirname;
global.version = "1.0a";

//Autoloader maison
require(__dirname + '/libs/autoloader/app');

global.module_logmanager.addLog("-*-*-*-*- MDL STATISTIQUES SERVER PORTABLE -*-*-*-*-*-");
global.module_logmanager.addLog(" -* Program version : "+ global.version + " *- ");
global.module_logmanager.addLog(" -* NodeJS version : "+ global.process.version + " *- ");
global.module_logmanager.addLog(" -* Folder : "+ global.__root + " *- ");
global.module_logmanager.addLog(" -* OS : "+ global.module_os.type + "/" + global.module_os.platform + " *- ");
global.module_oracledb.testConnection();
global.module_logmanager.addLog("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");