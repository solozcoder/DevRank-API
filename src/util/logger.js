const pino = require("pino");

const logger = pino({
  base: { pid: false },
  transport: {
    target: "pino-pretty",
    options: {
      colorized: true,
    },
  },
  timestamp: () => `,"time": "${new Date().toLocaleString()}"`,
});

module.exports = logger;
