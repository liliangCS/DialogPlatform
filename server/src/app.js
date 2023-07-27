const { WebSocketServer } = require("ws")
const { getAllRoomBasicInfo, enterHome, getUserCount4Home, leaveHome, getUser4Home } = require("./dataManage")
const log = require("./log")
const { PORT } = require("./serverConfig")

const app = new WebSocketServer({ port: PORT })

// 消息转发处理器
const messageHandler = (ws_client, data) => {
  const [flag, message] = data.split("@")
  switch (flag) {
    case "enter-home": {
      /**
       * 进入大厅：
       * 1. 将用户加入到用户列表
       * 2. 获得房间列表数据
       * 3. 获得大厅用户数量
       * 4. 通知大厅内的其他用户
       * 5. 记录用户进入大厅的日志信息
       */
      const { userID, avatarIndex } = JSON.parse(message)
      enterHome(userID, avatarIndex, ws_client)
      ws_client.send(`update-room-list@${JSON.stringify(getAllRoomBasicInfo())}`)
      ws_client.send(`update-home-user-count@${JSON.stringify(getUserCount4Home())}`)
      log("进入大厅", `用户ID: ${userID}`)
      break
    }

    case "leave-home": {
      /**
       * 离开大厅：
       * 1. 将用户移除用户列表
       * 2. 通知大厅内的其他用户
       * 3. 记录用户离开大厅的日志信息
       */
      const userID = message
      leaveHome(userID)
      log("离开大厅", `用户ID: ${userID}`)
      break
    }
  }
}

app.on("connection", (ws_client) => {
  ws_client.on("message", (data) => {
    messageHandler(ws_client, data.toString())
  })
})

app.on("listening", () => {
  console.log(`服务启动于: 127.0.0.1:${PORT}`)
})
