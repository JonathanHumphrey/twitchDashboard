import { defineStore } from 'pinia'
import moment from 'moment'

export const twitchStore = defineStore({
    id: 'twitchStore',
    state: () => ({
        User: {
            username: '',
            userId: 0,
            valid: false,
            token: ''
      },
      Followers: {
        total: 0,
        followerArr: {},
        pagination: '',
        URL: ''
      }
    }),
    actions: {
      async validate(token: string) {
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
            
      },
      async fetchFollows() {
        const followUrl = "https://api.twitch.tv/helix/users/follows?to_id=" + this.User.userId + '&after='
        let dataBlob = {}
 
        const followRes = await fetch(followUrl, {
          headers: new Headers({
            'Authorization': 'Bearer ' + this.User.token,
            'Client-ID': 'pk0roinew9e83z6qn6ctr7xo7yas15'
          })
        })
        .then(
          function (response) {
            return response.json();
          }
        )
          .then(
            data => {
              const follows : object[] = []

              for (const key in data.data) {
                const date = data.data[key].followed_at

                follows.push({
                  from_login: data.data[key].from_login,
                  from_id: data.data[key].from_id,
                  from_name: data.data[key].from_name,
                  to_id: data.data[key].to_id,
                  to_login: data.data[key].to_login,
                  to_name: data.data[key].to_name,
                  followed_at: moment(date).utc().format('MM-DD-YYYY'),
                })
              }
              
              
              
              this.Followers.total = data.total
              this.Followers.URL = followUrl + data.pagination.cursor
              this.Followers.followerArr = follows
              this.Followers.pagination = data.pagination.cursor
              
          }
        )
      }
    },
  
})


