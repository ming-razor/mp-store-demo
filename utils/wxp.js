import { promisifyAll } from 'miniprogram-api-promise';
const wxp = {};
promisifyAll(wx, wxp);

module.exports = wxp;