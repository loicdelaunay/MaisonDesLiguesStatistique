/**
 *
 */
class oracledb {

    constructor() {}

    /**
     * Test de connection à la bdd
     */
    testConnection() {
        console.log("Connection à la base de données ...");
        var oracledb = require('oracledb');
        oracledb.outFormat = oracledb.OBJECT;
        oracledb.getConnection({
                user: global.config.user,
                password: global.config.password,
                connectString: global.config.connectString
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
                conn = await oracledb.getConnection({
                    user: global.config.user,
                    password: global.config.password,
                    connectString: global.config.connectString
                });

                let result = await conn.execute(
                    'select * from ' + table,
                );

                resolve(result.rows);
            } catch (e) {
                console.error(e);
            } finally {
                // If conn assignment worked, need to close.
                if (conn) {
                    try {
                        await conn.close();
                    } catch (err) {
                        console.log('Erreur pendant la fermeture de la connexion', err);
                    }
                }
            }
        })
    }

    async addAvisAtelier(idAtelier, avis) {

        var oracledb = require('oracledb');
        oracledb.autoCommit = true;

        let conn;
        idAtelier = parseInt(idAtelier);

        try {
            conn = await oracledb.getConnection({
                user: global.config.user,
                password: global.config.password,
                connectString: global.config.connectString
            });

            var sql = "";

            switch (parseInt(avis)) {
                case 0:
                    sql = "update atelier set NBAVIS = NBAVIS+1, AVISTRESSATISFAIT = AVISTRESSATISFAIT + 1 where id=:idatelier";
                    break;
                case 1:
                    sql = "update atelier set NBAVIS = NBAVIS+1, AVISSATISFAIT = AVISSATISFAIT + 1 where id=:idatelier";
                    break;
                case 2:
                    sql = "update atelier set NBAVIS = NBAVIS+1, AVISMOYSATISFAIT = AVISMOYSATISFAIT + 1 where id=:idatelier";
                    break;
                case 3:
                    sql = "update atelier set NBAVIS = NBAVIS+1, AVISPASDUTOUTSATISFAIT = AVISPASDUTOUTSATISFAIT + 1 where id=:idatelier";
                    break;
            }
            console.log("Execution de la requete ...");

            await conn.execute(
                sql, {
                    idatelier: idAtelier + 1
                },
                function (err, result) {
                    if (err) {
                        console.error("error" + err);
                        conn.close();
                        return;
                    }
                    console.log("ok" + result.rowsAffected);
                    conn.close();
                });
            console.log("Fin de la requete");
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new oracledb();
