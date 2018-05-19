'use strict';

var urljoin = require('url-join');
var universitiesServer = (process.env.UNIVERSITIES_URL || 'https://aws1718-04.herokuapp.com/api/v1');
var universitiesKey = '123456';

module.exports = function(url) {
    return urljoin(universitiesServer, url, '?apikey='+universitiesKey);
};





