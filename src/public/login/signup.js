const loginButton = document.getElementById("signup");
loginButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name")
    const idInput = document.getElementById("uid")
    const passwordInput = document.getElementById("password")

    const signupResult = await axios({
        method: "POST",
        url: "/user/sign-up",
        data: {
            name: nameInput.value,
            id: idInput.value,
            password: passwordInput.value
        }
    });

    console.log(signupResult)

    const {sign_up_status, description} = signupResult.data;
    switch(sign_up_status) {
        case "success":{
            location.href = "/user/login";
        }break;
        case "fail":{
            alert(description);
        }break;
    }
});


