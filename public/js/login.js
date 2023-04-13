//Login
async function logIn(event) {
    event.preventDefault();

    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if(username && password) {
        const respone = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.log(await respone.json());
            alert(respone.statusText);
        }
    }
}



//Signup 
async function signUp(event) {
    event.preventDefault();

    const username = document.querySelector('#create-username').value.trim();
    const password = document.querySelector('#create-password').value.trim();

    if(username && password) {
        const respone = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            alert("New User has been created!")
        } else {
            console.log(await respone.json());
            alert(respone.statusText);
        }
    }
};

document.querySelector('.create-form').addEventListener('submit', signUp);
document.querySelector('.login-form').addEventListener('submit', logIn)