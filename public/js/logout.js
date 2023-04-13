async function logOut() {
    const respone = await fetch('api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(respone.statusText)
    }
};

document.querySelector('#logout').addEventListener('click', logout);