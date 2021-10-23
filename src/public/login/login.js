const loginButton = document.getElementById("login");
loginButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name")
    const idInput = document.getElementById("uid")
    const passwordInput = document.getElementById("password")

    const loginResult = await axios({
        method: "POST",
        url: "/user/login",
        data: {
            name: nameInput.value,
            id: idInput.value,
            password: passwordInput.value
        }
    });

    console.log(loginResult)

    const {login_status, description} = loginResult.data;

    switch(login_status) {
        case "success":{
            location.href = "/hello";
        }break;
        case "fail":{
            alert(description);
        }break;
    }
        


});


