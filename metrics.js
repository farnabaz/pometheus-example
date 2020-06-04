const client = require("prom-client");

const visitors = new client.Counter({
    name: "server_visits_count",
    help: "server_visits_count"
})

module.exports = {
    visit: function visit() {
        visitors.inc();
    }
};