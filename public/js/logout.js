const logOut = async function() {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok) {
        console.log("You are now logged out!")
        document.location.replace('/');
    } else {
        alert(response.statusText)
    }
};

document.querySelector('#logout').addEventListener('click', logOut);