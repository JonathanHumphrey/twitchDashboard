import { defineStore } from 'pinia'

export const twitchStore = defineStore({
    id: 'twitchStore',
    state: () => ({
        User: {
            username: '',
            userId: 0,
            valid: false,
            token: 0
        }
    }),
    actions: {
        async validate(token) {
            const res =  await fetch('https://id.twitch.tv/oauth2/validate', {
                headers: new Headers({
                  'Authorization': 'OAuth ' + token
                })
              })
                .then(
                  function (response) {
                    return response.json();
                  }
              )
              .then(
                data => {
                  //console.log(data)
                      this.User.username = data.login
                      this.User.userId = data.user_id
                      this.User.token = token
                      this.User.valid = true
                    console.log(this.User)
                  
                }
              );
              
        }
    }
})