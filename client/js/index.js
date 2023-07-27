// 是否是开发环境
const IS_DEV = true
const WEBSOCKET_URL = IS_DEV ? "ws://127.0.0.1:5000" : "ws://luoye.website:5000"
// WebSocket连接
let ws = null
// RTCPeerConnection连接
let pc = null
// 用户名
let userID = null
// 头像索引
let avatarIndex = null
// 消息处理器
const messageHandler = (message) => {
  const [flag, data] = message.split("@")
  switch (flag) {
    case "update-room-list": {
      // 更新房间列表
      const roomList = JSON.parse(data)
      roomList.forEach((item) => {
        createRoom(item.roomID, item.roomCount)
      })
      break
    }
    case "update-home-user-count": {
      // 更新大厅人数
      const userCount = JSON.parse(data)
      $(".count>span").innerText = userCount
      break
    }
  }
}

// 初始化用户（用户ID，头像）
const userInfoInit = () => {
  userID = uid()
  avatarIndex = Math.floor(Math.random() * 10)
  $(".user>img").src = `../assets/images/tu_${avatarIndex}.jpg`
  $(".user span").innerText = userID
}
userInfoInit()

// 连接信令服务器
const ConnServer = () => {
  ws = new WebSocket(WEBSOCKET_URL)
  // websocket open事件监听
  ws.addEventListener("open", () => {
    message("连接服务器成功")
    // 进入大厅
    ws.send(`enter-home@${JSON.stringify({ userID, avatarIndex })}`)
    // 修改按钮监听事件
    changeBtn4Listener(ws, ConnServer, userID)
  })
  // websocket close事件监听
  ws.addEventListener("close", () => {
    message("与服务器的连接断开")
  })
  // websocket message事件监听
  ws.addEventListener("message", (event) => {
    messageHandler(event.data)
  })
}
const WSListener = (websocket) => {}

// 点击进入大厅
$(".user>.btn").onclick = () => {
  ConnServer()
}
