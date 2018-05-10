//Loading log manager in first
global.module_logmanager = require(global.__root + '/libs/log-manager/app');

/**
 * Loading modules
 */
global.module_logmanager.addLog("-*-*- Chargement des modules -*-*-");

global.config = require(global.__root + '/config/config.json');
global.module_logmanager.addLog("- Config file -> ok");

global.module_filesystem = require('fs');
global.module_logmanager.addLog("- Module FileSystem -> ok");

global.module_path = require('path');
global.module_logmanager.addLog("- Module Path -> ok");

global.module_serverweb = require(global.__root + '/libs/server-web/app');
global.module_logmanager.addLog("- Module Server Web -> ok");

global.module_os = require('os');
global.module_logmanager.addLog("-  Module OS -> ok");

global.module_moment = require('moment');
global.module_logmanager.addLog("-  Module Moment.js -> ok");

global.module_oracledb = require(global.__root + '/libs/oracledb/app');
global.module_logmanager.addLog("-  Module de gestion de la bdd -> ok");

global.module_logmanager.addLog("-*-*- Chargement des modules terminés-*-*-\n\n");