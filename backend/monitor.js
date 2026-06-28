const appInsights = require("applicationinsights");

appInsights
.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
.setAutoCollectRequests(true)
.setAutoCollectPerformance(true)
.setAutoCollectExceptions(true)
.setAutoCollectDependencies(true)
.setAutoCollectConsole(true)
.setAutoCollectHeartbeat(true)
.setSendLiveMetrics(true)
.start();

module.exports = appInsights;