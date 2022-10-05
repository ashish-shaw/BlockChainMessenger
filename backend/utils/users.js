const users =[];


function newUserSignIn(socketId,username,publicKey){
    const user ={socketId,username,publicKey}
    users.push(user);

    return user;
}

module.exports={newUserSignIn,users}