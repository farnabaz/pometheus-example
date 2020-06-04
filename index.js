'use strict';

const Hapi = require('@hapi/hapi');
const client = require("prom-client");
const metrics = require('./metrics')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            metrics.visit();
            return 'Hello World!';
        }
    });
    server.route({
        method: 'GET',
        path: '/metrics',
        handler: (request, h) => {
            return h
                .response(client.register.metrics())
                .type(client.register.contentType);
        }
    });

    

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();