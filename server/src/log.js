const fs = require("node:fs/promises")
const path = require("node:path")

const LOGFILE_PATH = path.resolve(__dirname, "./server-log.txt")

const log = async (type, message) => {
  const curTime = new Date().toLocaleString()
  await fs.appendFile(LOGFILE_PATH, `${curTime}:\n${type}  ${message}\n`)
}

module.exports = log
