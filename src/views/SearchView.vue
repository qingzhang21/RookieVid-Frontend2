<template>
  <div class="search-video-container" >
    <Header_search/>
    <div class="top-row">
      <div style="flex:1"></div>
      <div class="search-bar">
        <el-row type="flex">
          <!-- <el-col :span="12" :offset="6"> -->
            <input :placeholder="input ? input : '请输入内容'" type="text" v-model="input" class="search-input2" @keydown.enter="go">
            <el-button type="primary" icon="el-icon-search" @click="go"></el-button>
          <!-- </el-col> -->
        </el-row>
          <!-- <el-row type="flex"> -->
             
              <!-- <el-button type="primary" icon="el-icon-search" @click="goto()"></el-button> -->
              <!-- <router-link :to="{ path: '/search_result',  query:{'keyword':this.input}}"> -->
              <!-- <el-button type="primary" icon="el-icon-search" @click="go"></el-button> -->
              <!-- </router-link> -->
          <!-- </el-row> -->
      </div>
      <div style="flex:1"></div>
      </div>
      <!-- <el-tabs class="navigation">
         <ul class="nav-list">
           <li class="nav-item" @click="selectedTab = 'video'">视频</li>
           <li class="nav-item" @click="selectedTab = 'user'">用户</li>
        </ul>
      </el-tabs > -->
      <el-tabs v-model="selectedTab" class="search-navigation" type="card">
        <!-- <el-badge :value="search_videos.length" class="item"> -->
          <el-tab-pane label="视频" name="video" >
            <div class="video-result">
              <div v-if="search_videos.length===0" class="blank-container">
                <div class="blank-msg">这里什么都没有吖</div>
              </div>
              <div v-else>
                <SearchVideo :partition="displayedVideos"></SearchVideo>
                <el-pagination
                  v-if="totalSearchPages > 1"
                  background
                  class="search-video-pagination center-pagination"
                  :hide-on-single-page="false"
                  :current-page="currentPage"
                  :page-size="videosPerPage"
                  :total="search_videos.length"
                  @current-change="handlePageChange"
                ></el-pagination>
              </div>
            </div>
          </el-tab-pane>
        <!-- </el-badge> -->
        <el-tab-pane label="用户" name="user" >
          <div class="users-result">
            <div v-if="search_users.length===0" class="blank-container">
              <div class="blank-msg">这里什么都没有吖</div>
            </div>
            <div v-else>
              <div class="user-result-display">
                <div v-for="(user, index) in search_users" :key="index"  class="user-row">
                    <div class="avatar-container">
                      <img :src="user.avatar_url" class="user-avatar" @click="goPersonPage(user.id)">
                    </div>
                    <div class="user-details">
                      <div class="user-name" @click="goPersonPage(user.id)">{{ user.username }}</div> 
                      <div class="user-signature" >{{ user.signature ?user.signature:"Ta什么都没写"}}</div>
                      <v-btn v-if="user.followed===1" depressed @click="defollow(user.id,index)">
                               取消关注
                      </v-btn>
                      <v-btn v-if="user.followed===0"  depressed color="primary" @click="follow(user.id,index)">
                              +关注
                      </v-btn>
                    <!-- <button v-if="user.followed===0" class="follow-button" @click="follow(user.id)">+关注</button> -->
                    <!-- <button v-if="user.followed===1" class="cancel-follow-button" @click="defollow(user.id)">取消关注</button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
     
   
          <!-- <div class="search-container">
            <div v-for="(video,index) in this.search_videos" :key="index" class="recommend-item">
              <img class="recommend-img" :src="video.cover_url" @click="videoPlay(video.video_id)">
              <div class="overlay">
                <span class="play-info">
                  <img class="play-icon" src="../assets/display/play_circle_outline.svg">
                  {{video.view_amount }}</span>
                <span class="like-info">
                  <img class="like-icon" src="../assets/display/thumb-up.svg">
                  {{ video.like_amount }}
                </span>
              </div>
                <div class="recommend-title" @click="videoPlay(video.video_id)">{{ video.title }}</div>
              <div class="author">
                <span class="author-tag">作者</span>
                <span class="author-name">{{ video.user_name }}</span>
                <span class="time">{{ video.created_at.split('T')[0] }}</span>
              </div>
            </div>
          </div> -->
    
  </div>
</template>

<script>
import axios from 'axios'
import Header_search from '@/components/HomePage/Header_del_search.vue'
import SearchVideo from '@/components/HomePage/PartitionVideoShow.vue'
// import {mapActions} from 'Vuex'
export default {
  name: 'SearchView',//当前引入页面
  components: {
    Header_search,
    SearchVideo,
  },
  data(){
    return{
      input:"",
      search_videos:[],
      search_users:[],
      selectedTab: 'video', // 默认选中视频
      currentPage: 1,
      videosPerPage: 20,
    }
  },
  computed:{
    displayedVideos() {
      const startIndex = (this.currentPage - 1) * this.videosPerPage;
      const endIndex = startIndex + this.videosPerPage;
      return this.search_videos.slice(startIndex, endIndex);
    },
    totalSearchPages() {
            return Math.ceil(this.search_videos.length / this.videosPerPage);
        },
  },
  created(){
    
    this.getData(this.$route.query.keyword);
  //   console.log(this.$route.query)
    const lastSelectedTab = localStorage.getItem('selectedTab');
    this.selectedTab = lastSelectedTab || 'video';
  },
  mounted(){
    const keyword=this.$route.query.keyword;
    this.input=keyword;
    console.log(keyword);
  //   console.log(this.$route.query.targetdata);
  },
  watch: {
    selectedTab(newTab) {
    localStorage.setItem('selectedTab', newTab);
  },
    '$route.query.keyword'(newKeyword, oldKeyword) {
      if (newKeyword !== oldKeyword) {
        this.getData(newKeyword);
        window.location.reload();
        } 
    },
 
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    // searchVideo(){ 
      goPersonPage(id){
        const user_page_url='/lookPerson/'+id;
        window.open(user_page_url,'_blank');
      },
      handleClick(tab) {
        console.log(tab, event);
      },
      videoPlay(id){
        const video_play_url='/video/'+id
        window.open(video_play_url,'_blank');
      },
      go(){
          console.log(this.input);
          const currentPath = this.$route.path;
          const currentKeyword = this.$route.query.keyword;

          const targetPath = '/search';
          const targetKeyword = this.input;

            // 判断当前路由是否已经是目标路由
          if (currentPath === targetPath && currentKeyword === targetKeyword) {
              return; // 避免重复导航
           }

          this.$router.push({ path: '/search', query: { keyword: this.input } })
      },
      follow(id,index){
        let formData=new FormData();
        formData.append("following_id",id);
        formData.forEach(function(value, key) {
         console.log(key, value);
        });
        let Headers={'Authorization': this.$store.getters.getStorage}
        axios.post('/account/create_follow',formData,{headers:Headers})
        .then((response)=>{
          console.log(response);
          console.log(response.data.msg);
          if(response.data.errno==0){
            console.log(response.data.errno);
            // window.location.reload();
            this.search_users[index].followed=1;
            // this.$data.search_users.forEach((user, index) => {
            //   if (user.id===id){
            //     user.followed=1;
            //   } 
            // });
          }
          else{
            // alert(response.data.msg);
            this.$message.warning(response.data.msg)
          }
          
        })
      },
      defollow(id,index){
        let formData=new FormData();
        formData.append("following_id",id);
        formData.forEach(function(value, key) {
         console.log(key, value);
        });
        let Headers={'Authorization': this.$store.getters.getStorage}
        axios.post('/account/remove_follow',formData,{headers:Headers})
        .then((response)=>{
          console.log(response);
          console.log(response.data.msg);
          
          if(response.data.errno==0){
            console.log(response.data.errno);
            // window.location.reload();
            this.search_users[index].followed=0;
            // this.$data.search_users.forEach((user, index) => {
            //   if (user.id===id){
            //     user.followed=0;
            //   } 
            // });
          }
          else{
            // alert(response.data.msg);
            this.$message.error(response.data.msg);
          }
        })
      },
      getData(text){
      console.log(text);
      axios.get('videos/search',{params:{keyword:text}})
      .then((response)=>{
          console.log(text);
          console.log(response.data);
           response.data.video.forEach((video,index) => {
                // this.search_videos[index]=video;
                this.$set(this.search_videos,index,video)  
        });
        if(Array.isArray(response.data.user)){response.data.user.forEach((user,index)=>{
            this.$set(this.search_users,index,user)
            console.log('users'+this.search_users[index])
          });}
          // else{
          //   this.user=response.data.user;
          //   console.log('single'+this.user);
          // }
          
        
      })
      .catch(error => {
      console.log(error);
    });}
     
    
    },
    
  }
</script>

<style scoped>


/* .search-container {
margin:50px;
margin-top:50px;

display: grid;
grid-template-columns: repeat(5, 1fr) ;
grid-gap: 50px;
justify-items: center;
} */
.top-row {
  display: flex;
  /* justify-content: space-between; */
  padding: 5px;
  /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); */
  align-items: center;
  flex-direction: row;
}

.search-bar {
  /* display: flex; */
  margin-top:30px;
  position:center;
  width: 500px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* flex: 2; */
}
.search-input2{
  background-color: white;
  border-color: grey;
  width:80%;
  border-radius: 5px;
  /* text-align: left; */
  padding-left:3%;
  
  border: 1px solid rgb(221, 221, 221);
  background-color: rgba(230, 230, 230, 0.303);
  /* height:100%; */
}
.search-input2:focus {
  outline: none;
  border-color: rgb(147, 227, 252);
  box-shadow: 0 0 5px rgb(105, 163, 255);
  background-color: white;
}

.search-input2::placeholder {
  color: rgb(107, 107, 107);
  
}
.search-navigation{
  margin:20px;
}
.navigation {
display: flex;
justify-content: center;
margin-bottom: 20px;
}

.nav-list {
display: flex;
list-style: none;
}

.nav-item {
margin-right: 10px;
padding: 5px 10px;
border: 1px solid #ccc;
border-radius: 4px;
cursor: pointer;
}

.nav-item:hover {
background-color: #ccc;
}
.blank-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* 根据需要调整容器的高度 */
}
.video-result{
  margin:50px;
}

.blank-msg {
  font-size: 24px;
  font-weight: bold;
  color:rgb(163, 154, 154)
}
.center-pagination {
  display: flex;
  justify-content: center;
}
.play-info, .like-info {
display: flex;
align-items: center;
color: white;
font-weight:bold;
margin-left: 8px;
margin-right:8px;
}
.play-icon, .like-icon{
margin:5px;
}
a{
text-decoration: none;
}
.router-link-active {
text-decoration: none;
}

.user-result-display{
  width:100%;
  list-style-type: none;
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap:50px;
}
.users-result{
  margin:50px;
}
.user-row {
  /* display: flex;
  align-items: center;
  margin-bottom: 20px; */
  width:100%;
  display:flex;
    margin:20px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
  cursor:pointer;
  transition: transform 0.3s ease;
}
.avatar-container:hover .user-avatar{
  transform: scale(1.1);
}
/* .user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
} */
.user-detail{
  display:flex;
  width:100%;
  height:100%;
}
.user-name {
  /* margin-top:10px; */
  /* height:33.3%; */
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
  cursor:pointer;
}
.user-name:hover{
  color:orange;

}

.follow-button {
  /* margin-left:6%; */
  height:30px;
  width:100px;
  background-color: #22b8cf;
  /* margin-left:50px; */
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: bold;
  cursor: pointer;
}
.cancel-follow-button{
  /* margin-left:6%; */
  height:30px;
  width:100px;
  background-color: #9b9b9b;

  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: bold;
  cursor: pointer;
}
</style>
