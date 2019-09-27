<script>
    function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log("Email: " + profile.getEmail());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "tokensignin");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        if (xhr.responseText.trim().toLowerCase() == "true") {
            location.href = "templates";
        } else {
            alert("登入失敗");
        }
        };
        xhr.send("idtoken=" + id_token);
    }

    function devLogin(){
        axios({
            url:'http://localhost:8080/questionnaire/login?id=dev@gmail.com',
            withCredentials: true
            })
            .then(res => {
                console.log(res.data)
                console.log("cookie: ",document.cookie)
                window.location.href="/templateList"
                }).catch(err => {
                    console.log(err)
            })
    }
</script>
<style>
	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="184800465453-m9hnsqo5o4ihqq15feiqfospq4olce50.apps.googleusercontent.com">
	<title>問卷後台</title>
</svelte:head>

<h1>Great success!</h1>

<div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" />
<p></p>
<button class="btn btn-primary" on:click="{devLogin}">Dev Login</button>
