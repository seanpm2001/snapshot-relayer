import mysql from 'mysql';
import Pool from 'mysql/lib/Pool';
import Connection from 'mysql/lib/Connection';
import bluebird from 'bluebird';
import parse from 'connection-string';

const mysqlUrl = `${process.env.DATABASE_URL}/${process.env.MYSQL_DATABASE_NAME}`;
// @ts-ignore
const config = parse(mysqlUrl);
config.connectionLimit = 1;
config.multipleStatements = true;
config.database = config.path[0];
config.host = config.hosts[0].name;
config.port = config.hosts[0].port;
config.connectTimeout = 30000;
config.charset = 'utf8mb4';
bluebird.promisifyAll([Pool, Connection]);
const db = mysql.createPool(config);

export default db;
