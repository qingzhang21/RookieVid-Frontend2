<template>
        <div class="title-container" >
          <img class="photo" :src="avatar">
          <div class="text-container" style="flex:1;">
            <div class="text-title" > 昵称：{{ username }}</div>
            <div class="user-sign" v-if="signature">个性签名：{{signature}}</div>
            <div class="user-sign" v-else>个性签名：这个人很懒，什么都没写吖</div>
            <div class="user-sign">用户ID：{{userid}}</div>
          </div>
          <button class="follow-button" @click="addFollow(look_user)" v-if="status===1 && is_followed===0">+关注</button>
          <button class="remove-button" @click="removeFollow(look_user)" v-else-if="status===1 && is_followed===1">已关注</button>
        </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'

// Vue.component('my-component', NavComponent);
export default {
  data () {
    return {
      look_user: 0,
      username: '',
      avatar: '',
      userid: '',
      email: '',
      signature: '',
      status: '',
      is_followed: '',
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.look_user = this.$route.params.user_id
      let Headers={'Authorization': this.$store.state.token}
      axios.get('/account/display_profile',{ headers: Headers, params:{user_id: this.look_user} })
      .then((res) => {
        console.log(res);
        if(res.data.errno == 0){  //获取成功
          this.userid = res.data.context.uid,
          this.username = res.data.context.username,
          this.email = res.data.context.email
          this.signature = res.data.context.signature  //这是个性签名
          this.avatar = res.data.context.avatar_url   //这是头像
          this.status = res.data.status
          this.is_followed = res.data.is_followed
        }else {
            alert(res.data.msg)
            // if(res.data.errno == )
        }
      }).catch(
        console.error()
      )
    },
    addFollow(user_id){
        
      let Headers={'Authorization': this.$store.state.token}
      let formData = new FormData()
      formData.append('following_id', user_id)
      axios.post('/account/create_follow',formData, { headers: Headers})
      .then(res => {
        console.log(res)
        if(res.data.errno ===  0){
          // this.$message.success('关注成功')
          location.reload()
        }else {
          this.$message.error(res.data.msg)
        }
      })
      .catch(
        console.error()
      )
    },
    removeFollow(user_id){
      let Headers={'Authorization': this.$store.state.token}
      let formData = new FormData()
      
      formData.append('following_id', user_id)
      axios.post('/account/remove_follow',formData, { headers: Headers})
      .then(res => {
        console.log(res)
        if(res.data.errno === 0){
          // this.$message.success("取关成功")
          location.reload()
        } else {
          this.$message.error(res.data.msg)
        }
      })
      .catch(
        console.error()
      )
    },
  },
  
}
</script>

<style scoped>


.photo {
    /*border-style: double;*/
    width: 80px;
    height: 80px;
    border-radius: 50% ;
    vertical-align: middle;
}
.text-title {
    display:inline;
    font-size: 30px;
    background-repeat: repeat;
    margin-left: 40px;
    margin-bottom: 100px;
}
.user-sign {
  font-size: 16px;
  margin-right: 10px;
  width: 600px;
  margin-left: 40px;
  color: rgb(61, 59, 59);
}

.title-container {
    display:flex; 
    justify-content: flex-start;
    align-items: center;
    border:#09553d 1px;
    height: 260px;
    padding-left: 5% ;
    background-image: url("@/../image/titleBack1.png");
    background-size:cover;
}


.follow-button {
  margin-right: 5%;
  background-color: #22b8cf;

  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: bold;
  cursor: pointer;
}
.remove-button {
  margin-right: 5%;
  background-color: #e5e9ef;

  color: #606266;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: bold;
  cursor: pointer;
}


</style>
