<template>

    <!-- <el-button>上传视频</el-button> -->
    <div class="upload-body">
       <!--导航栏-->
      <Header />
      <!-- <navMenu /> -->
      <div class="creation-display">
        <div class="aside-wrapper">
                <el-button class="upload-button" @click="upload_video">
                    <i class="el-icon-upload" ></i>
                    投稿
                </el-button>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" @click="goCreationManage">稿件管理</el-menu-item>
                </el-menu>
      </div>
      <div class="upload-form-display">
        <el-form :model="form" status-icon:rules="rules" ref="form" label-width="100px" class="upload-form">

            <!-- <div style="display:flex"> -->
            <!-- <div style="flex:1"></div> -->
            <!-- <el-upload v-model="form.video" 
            :auto-upload="false"
            action=""
            class="upload-demo" 
            drag 
            :file-list="fileList"
            :on-change="saveVideo"
            accept=".mp4"
            :limit="1"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传mp4文件</div>
            </el-upload>
            <div style="flex:1"></div>
            </div> -->
            <!-- <el-form-item label="视频文件" prop="video"></el-form-item> -->
            <i class="el-icon-success" style="color:rgb(90, 177, 90)">视频文件已上传</i>
            <div class="video_info">
            <el-form-item label="视频标题" prop="title" style="margin-top:20px;width:100%">
                    <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="视频封面" prop="cover" style="margin-top:20px">
                <img :src="this.form.cover" style="height:20%;width:40%">
                    
            </el-form-item>
            
            <el-form-item label="分区" prop="label" style="margin-top: 20px;display:inline;">
                <el-select v-model="form.label">
                <el-option label="娱乐" value="娱乐"></el-option>
                <el-option label="生活" value="生活"></el-option>
                <el-option label="学习" value="学习"></el-option>
                <el-option label="游戏" value="游戏"></el-option>
                <el-option label="运动" value="运动"></el-option>
                <el-option label="美食" value="美食"></el-option>
                <el-option label="音乐" value="音乐"></el-option>
                <el-option label="影视" value="影视"></el-option>
                <el-option label="科技" value="科技"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="简介" prop="description" style="margin-top: 20px;width:100%">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            </div>
            
            <!-- <div class="upload_video" prop="video">
            <el-input v-model="form.video" id="upload_video" type="file" ref="fileInput" accept=".mp4"  style="display:none"/>
            <label for="upload_video">
                <img src="../assets/upload/cloud_upload.svg" style="opacity:0.6">
            </label>
            <div>请在此处选择视频</div>
            </div> -->
            <div style="display:flex">
            <div style="flex:1"></div>
            <el-button @click="goCreationManage" style="margin-top:20px;">放弃修改</el-button>
            <el-button @click="uploadVideo" style="margin-top:20px;">上传</el-button>
            <div style="flex:1"></div>
            </div>
        
        <div v-if="uploading">
            <p>正在上传...</p>
            <el-progress :percentage="uploadProgress" :show-text="false" class="progress-bar"></el-progress>
        </div>
        </el-form>
        <el-dialog
      title="确认离开"
      :visible="uploadConfirmationVisible"
      @close="cancelUpload"
      :close-on-click-modal="false"
    >
      <span>当前内容未保存，要离开吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUpload">取消</el-button>
        <el-button type="primary" @click="confirmUpload">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="确认离开"
      :visible="uploadConfirmationVisible2"
      @close="cancelUpload2"
      :close-on-click-modal="false"
    >
      <span>当前内容未保存，要离开吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUpload2">取消</el-button>
        <el-button type="primary" @click="confirmUpload2">确定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
  </div>
</template>

<script>

// @ is an alias to /src
import Header from '@/components/HomePage/Header_del_search.vue'
import navMenu from '@/components/PersonPage/navMenu.vue'
import axios from 'axios'
export default {
  name: 'CreationView',//当前引入页面
  components: {
    Header,
    navMenu
  },
  data() {
    return {
      file: null,          // 选择的视频文件对象
      fileList:[],
      // uploadUrl:"http://101.43.159.45:8000/api/videos/upload_video",
      uploading: false,    // 是否正在上传
      uploadProgress: 0,  // 上传进度，0-100
      dialogImageUrl: '',
      dialogVisible: false,
      uploadConfirmationVisible:false,
      uploadConfirmationVisible2:false,
      form:{
        video:'',
        cover:'',
        title:'',
        label:'',
        description:'',
      }
    }
    
  },
  computed: {
    // coverUrl() {
    //   return this.form.cover ? `data:image/jpeg;base64,${this.form.cover}` : require("../assets/upload/upload_cover.png");
    // },
  },
  created(){
    const self=this;
    this.getCreationInfo();
  },
   
  methods: {
    confirmUpload() {
      // 用户点击确认按钮，执行上传逻辑
      this.$router.push('/myCreation');
      // 关闭确认弹窗
      this.uploadConfirmationVisible = false;
    },
    cancelUpload() {
      // 用户点击取消按钮，关闭确认弹窗
      this.uploadConfirmationVisible = false;
    },
    confirmUpload2() {
      // 用户点击确认按钮，执行上传逻辑
      this.$router.push('/creation');
      // 关闭确认弹窗
      this.uploadConfirmationVisible2 = false;
    },
    cancelUpload2() {
      // 用户点击取消按钮，关闭确认弹窗
      this.uploadConfirmationVisible2 = false;
    },
    goCreationManage(){
      // this.text=text;
      if(this.form.cover||this.form.description||this.form.description||this.form.title||this.form.video){
        this.uploadConfirmationVisible = true;
        console.log(this.form.cover);
        // console.log("未保存");
        // alert("上传视频未保存");
        return;
      }
      this.$router.push('/myCreation');
    },
  
    upload_video(){
      // this.text=text;
      if(this.form.cover||this.form.description||this.form.description||this.form.title||this.form.video){
        console.log(this.form.cover);
        this.uploadConfirmationVisible2 = true;
        // console.log("未保存");
        // alert("当前内容未上传");
        return;
      }
      this.$router.push('/creation');
    },
    getCreationInfo(){
        let Headers = { 'Authorization': this.$store.getters.getStorage };
        axios.get('/videos/get_one_video',{params:{video_id:this.$route.params.id}},{headers:Headers})
        .then((response)=>{
            console.log(response);
            if(response.data.errno!=0){
                console.log(response.data.msg);
                alert(response.data.msg);
            }
            else{
                this.form.cover=response.data.video.cover_url;
                this.form.video=response.data.video.video_url;
                this.form.label=response.data.video.label;
                this.form.title=response.data.video.title;
                this.form.description=response.data.video.description;
            }
            
        })
    },
 
    uploadVideo(){
      // console.log(this.form);
    //   console.log(this.form.video);
    //   console.log(this.form.cover);
    //   if (!this.form.video) {
    //      this.$message.error('请先选择视频文件!');
    //       return;
    //     }
      
      if(!this.form.title){
        this.$message.error('视频标题不能为空!');
        return;
      }
    //   if(!this.form.cover){
    //     this.$message.error('请先选择视频封面!');
    //     return;
    //   }
      console.log(this.form.cover);
    //   const isIMAGE = (this.form.cover.type === 'image/jpeg' ||this.form.cover.type === 'image/png'|| this.form.cover.type === 'image/jpg');
    //   if (!isIMAGE) {
    //     this.$message.error('视频封面只能是jpeg/jpg/png格式!');
    //     return ;
    //   }
      if(!this.form.label){
        this.$message.error('请选择视频分区!');
        return;
      }
      if(!this.form.description){
        this.$message.error('视频简介不能为空!');
        return;
      }
      this.uploading = true;
      let formData=new FormData();
      formData.append("video_id",this.$route.params.id);
      console.log("id"+this.$route.params.id);
      formData.append("video_file",this.form.video);
      formData.append("cover_file",this.form.cover);
      formData.append("label",this.form.label);
      formData.append("title",this.form.title);
      formData.append("description",this.form.description);
    //   console.log(formData);
    console.log(this.form.label);
      let Headers={'Authorization': this.$store.getters.getStorage}
      // axios.get('/videos/get_video',{ headers: Headers, params:{favorite_id: 1} })
      axios.post('/videos/update_video',formData, {headers:Headers,
          onUploadProgress: progressEvent => {
            this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(this.uploadProgress);
            console.log(Headers);
            // for (let pair of formData.entries()) {
            //       console.log(pair[0] + ": " +pair[1] );
            //   }
            // console.log(formData.get(video_file));
            // console.log(formData.get(cover_file));
          }
        })
      .then((res)=>{
        console.log(res);
        if(res.data.errno==0){ 
          // alert("更新成功");
          alert(res.data.msg);
          const keyURL='/myCreation';
          this.$router.push(keyURL);
         
        }else {
            alert(res.data.msg)
          }
          console.log(res.data.msg);
          this.uploading=false;
          this.uploadProgress=0;
          // this.uploadProgress = { value: 0, displayValue: '0%' };
      })
    }

  }
}
</script>
<style scoped>
.upload-body{
  /* position: absolute; */
  /* margin-bottom:50px; */
  /* width: 100%; */
  /* height: 100%; */
  /* overflow: hidden; */
  /* background-image:url('../../assets/upload/upload_background.jpeg'); */
  /* background-size: 100% 100%; */
}
.upload-form{
  width: 80%;
  margin-left: 10%;
  background-color:white;
  border-color: #333;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #8a8a8a;
  border-style:dashed;
  
}
.creation-display{
    margin:30px;
    display:flex;
}
.aside-wrapper{
    width:14%;
    background-color: white;
    
}
.upload-button{
    width:80%;
    margin-left:20px;
    background-color: rgb(0, 166, 255);
    color:white;
    font-size:16px;
}
.upload-form-display{
  width:80%;
}
.upload-display{
    margin:50px;
}

.video_info{
  display: flex; 
  flex-direction: column; 
  align-items: flex-start;
}
.el-form-item__label {
  text-align: left;
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  
}
.el-form-item{
  opacity: 1;
}


.progress-bar {
  -webkit-animation: progress-bar-animation 2s ease-out forwards;
  animation: progress-bar-animation 2s ease-out forwards;
}

@-webkit-keyframes progress-bar-animation {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@keyframes progress-bar-animation {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

</style>
