/**
 *
 */
class oracledb {

    constructor() {
        this.user = "employemdl";
        this.password = "employemdl";
        this.address = "localhost";
        this.groupe = "XE";
    }

    /**
     * Test de connection à la bdd
     */
    testConnection() {
        console.log("Connection à la base de données ...");
        var oracledb = require('oracledb');
        oracledb.outFormat = oracledb.OBJECT;
        oracledb.getConnection(
            {
                user: this.user,
                password: this.password,
                connectString: this.address + "/" + this.groupe
            },

            function (err, connection) {
                if (err) {
                    console.error("Erreur de connexion :" + err);
                    return;
                }
                console.log("Connecté à la base de données");
            });
    }

    async getTable(table) {
        return new Promise(async function (resolve) {

            var oracledb = require('oracledb');
            let conn;

            try {
                conn = await oracledb.getConnection(
                    {
                    user: "employemdl",
                    password: "employemdl",
                    connectString: "localhost/XE"
                     }
                );

                let result = await conn.execute(
                    'select * from '+table,
                );

                resolve(result.rows);
            } catch (e) {
                console.error("erreur" + e);
            } finally {
                // If conn assignment worked, need to close.
                if (conn) {
                    try {
                        await conn.close();

                        console.log('Connection fermée');
                    } catch (err) {
                        console.log('Erreur pendant la fermeture de la connexion', err);
                    }
                }
            }
        })
    }
}

module.exports = new oracledb();