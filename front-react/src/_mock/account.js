// ----------------------------------------------------------------------
const user = JSON.parse(localStorage.getItem("user"));
console.log("user===>",user);
const account = {
    displayName: `${user ? user.name : ''}`,
    email: `${user ? user.email : ''}`,
    photoURL: `${user ? '/static/mock-images/avatars/avatar_default.jpg' : '/static/mock-images/avatars/avatar_logout1.png'}`,
}

export default account;
