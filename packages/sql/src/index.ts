import {readFileSync} from 'fs';
import minify = require('pg-minify');
import SQLQuery, {setPgMinify, setReadFileSync} from './SQLQuery';
import SQLBase from './SQL';

export interface SQL extends SQLBase {
  file(filename: string): SQLQuery;
}

setPgMinify(minify);
setReadFileSync(readFileSync);

export {SQLQuery};

// Create the SQL interface we export.
const modifiedSQL: SQL = Object.assign(
  (strings: TemplateStringsArray, ...values: Array<any>): SQLQuery =>
    SQLQuery.query(strings, ...values),
  {
    // tslint:disable:no-unbound-method
    // tslint:disable-next-line:deprecation
    join: SQLQuery.join,
    __dangerous__rawValue: SQLQuery.raw,
    file: (filename: string) => SQLQuery.file(filename),
    value: SQLQuery.value,
    ident: SQLQuery.ident,
    registerFormatter: SQLQuery.registerFormatter,
    // tslint:enable:no-unbound-method
  },
);

export default modifiedSQL;

module.exports = modifiedSQL;
module.exports.default = modifiedSQL;
module.exports.SQLQuery = SQLQuery;
