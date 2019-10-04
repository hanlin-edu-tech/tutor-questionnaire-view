<script>
        let auth2
        let googleUser
        function appStart() {
            console.log('app start loading')
            gapi.load('auth2', initSigninV2)
        }

        /**
         * Initializes Signin v2 and sets up listeners.
         */
        var initSigninV2 = function() {
            console.log('init signin')
            auth2 = gapi.auth2.init({
                client_id: '184800465453-m9hnsqo5o4ihqq15feiqfospq4olce50.apps.googleusercontent.com',
                scope: 'profile email'
            });
            // Listen for changes to current user.
            auth2.currentUser.listen(userChanged);

            // Sign in the user if they are currently signed in.
            if (auth2.isSignedIn.get() == true) {
                auth2.signIn();
            }
            };

        var userChanged = function (user) {
                console.log('User now: ', user);
                onSignIn(user)
            };
        function onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token
            console.log("ID Token: " + id_token)
            fetch(`https://www.tbbt.com.tw/questionnaire/tokensignin?idtoken=${id_token}`,{
                method: 'POST',
                credentials: 'include'
            }).then( res => console.log(res.json()))
            .catch( err => console.error('Error: ', err))
        }

        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        }

    </script>
<svelte:head>
    <meta charset="UTF-8">
    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
</svelte:head>    
    <!-- <div class="g-signin2"  data-theme="dark"></div> -->
        <button class="btn btn-primary" on:click="{appStart}">Signin with Google</button>
        <a href="#" on:click="{signOut}">Sign out</a>

    