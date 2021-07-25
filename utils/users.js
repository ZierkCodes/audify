export {
    users,
    getUsers
}

let users = {}

function getUsers(arr) {
    onlineUsers = []
    arr.forEach((onlineUser) => {
        onlineUsers.push(Object.values(onlineUsers)[0])
    })
    return onlineUsers
}