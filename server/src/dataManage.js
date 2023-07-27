// 房间列表
const roomList = [
  {
    roomID: "RTC01",
    userList: []
  },
  {
    roomID: "RTC02",
    userList: []
  },
  {
    roomID: "RTC03",
    userList: []
  },
  {
    roomID: "RTC04",
    userList: []
  },
  {
    roomID: "RTC05",
    userList: []
  },
  {
    roomID: "RTC06",
    userList: []
  },
  {
    roomID: "RTC07",
    userList: []
  }
]

// 在线用户列表
const onlineUserList = []

// 获取所有房间基本信息（房间ID和房间人数）
const getAllRoomBasicInfo = () => {
  return roomList.map((item) => {
    return { roomID: item.roomID, roomCount: item.userList.length }
  })
}

// 用户进入大厅（保存用户的信息）
const enterHome = (userID, avatarIndex, socket) => {
  onlineUserList.push({ userID, avatarIndex, socket })
}

// 获取滞留大厅的用户数量（在线用户数量 - 房间用户数量）
const getUserCount4Home = () => {
  const userCount2Room = roomList.reduce((pv, cv) => pv + cv.userList.length, 0)
  return onlineUserList.length - userCount2Room
}

// 用户离开大厅（移除用户的信息）
const leaveHome = (userID) => {
  const targetUserIndex = onlineUserList.findIndex((item) => item.userID === userID)
  onlineUserList.splice(targetUserIndex, 1)
}

// 获取滞留大厅的用户
const getUser4Home = () => {
  const userID4RoomList = roomList.reduce((pv, cv) => [...pv, ...cv.userList], []).map((item) => item.userID)
  const user4HomeList = onlineUserList.filter((item) => !userID4RoomList.includes(item.userID))
  return user4HomeList
}

module.exports = {
  roomList,
  getAllRoomBasicInfo,
  enterHome,
  getUserCount4Home,
  leaveHome,
  getUser4Home
}
