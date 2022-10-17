const Queue = require("bull");
const path = require("path");

const syncMoviesToWorkerQueue = new Queue(
  "moviesQueue",
  "redis://0.0.0.0:6379"
);

syncMoviesToWorkerQueue.process(path.join(__dirname, "syncMoviesToWorkerProcessor.js"));

module.exports = syncMoviesToWorkerQueue;

