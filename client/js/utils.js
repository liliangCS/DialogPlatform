// 获取dom元素
const $ = (selector) => {
  return document.querySelector(selector)
}
const $$ = (selector) => {
  return document.querySelectorAll(selector)
}

/**
 * 创建一个房间
 * @param {string} roomID
 * @param {number} roomCount
 */
const createRoom = (roomID, roomCount = 0) => {
  const roomDivEl = document.createElement("div")
  roomDivEl.className = "room"
  roomDivEl.innerHTML = `
  <div>房间名称: <span class="room-name">${roomID}</span></div>
  <div>房间人数: <span class="room-count">${roomCount}</span></div>
  `
  $(".main").appendChild(roomDivEl)
}

/**
 * 进入房间
 * @param {number} roomID
 */
const enterRoom = (roomID) => {
  localStorage.setItem("roomID", roomID)
  const aEl = document.createElement("a")
  aEl.href = "../html/room.html"
  aEl.click()
}

/**
 * 唯一id生成
 * @returns {string}
 */
const uid = () => {
  let uidStr = ""
  const code = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "_"
  ]
  for (let i = 0; i < 10; i++) {
    uidStr += code[Math.floor(Math.random() * 63)]
  }
  return uidStr
}

/**
 * 消息提示
 * @param {string} msg
 */
const message = (msg) => {
  const divEl = document.createElement("div")
  divEl.className = "message"
  divEl.innerText = msg
  document.body.appendChild(divEl)
  setTimeout(() => {
    document.body.removeChild(divEl)
  }, 1000)
}

/**
 * 更新左上角用户区域信息
 * @param {boolean} isEnter
 */
const updateUserBox = (isEnter) => {
  const btnEl = $(".user>.btn")
  if (isEnter) {
    btnEl.innerHTML = "离开大厅"
  } else {
    btnEl.innerText = "进入大厅"
    $(".count>span").innerText = "???"
    $(".main").innerHTML = ""
  }
}

// 修改按钮监听
const changeBtn4Listener = (ws, callback, userID) => {
  const btnEl = $(".user>.btn")
  btnEl.innerText = "离开大厅"
  // 离开大厅的监听事件
  btnEl.onclick = () => {
    ws.send(`leave-home@${userID}`)
    ws.close()
    updateUserBox(false)
    // 进入大厅的监听事件
    btnEl.onclick = () => {
      callback()
    }
  }
}
