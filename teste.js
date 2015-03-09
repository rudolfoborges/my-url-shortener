var config = require('./app/server/config/config-provider').load();

console.log(process.env.NODE_ENV);
console.log(config.env.dir);
console.log(config.mongo.url);
console.log(config.app.service_url);
