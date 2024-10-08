const users = [];

export const addUser = (user) => {
    users.push(user);
}

export const removeUser = (socketID) => {
    const index = users.findIndex((user) => user.socketID === socketID);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

export const getUser = () => {
    return users;
}