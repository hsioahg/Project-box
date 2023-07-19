<template>
  <div class="floor-body" v-loading="loading">
    <el-empty :image-size="250" v-if="datastate" class="nodate"></el-empty>
    <div class="newroom" @click="addDormitorystate = true" v-if="level === '超级管理员' ? true:false">
      <div class="newroom-nei">
        <i class="el-icon-plus"></i>
        <span>添加宿舍</span>
      </div>
    </div>
    <div class="wai-student" v-if="!datastate">
      <div class="out-student" v-for="item in studentlist" :key="item.id">
          <div class="headata">
            <h2>{{item.room}}</h2>
            <h4>人员情况：{{item.student.length}}/8</h4>
          </div>
          <p class="dheadlist">宿舍长：
            <!-- {{item.dhead}} -->
            <span>{{item.dhead}}</span>
            <a v-if="level === '超级管理员' ? true:false" @click="emptydormid(item)">移除该宿舍</a>
          </p>
        <div class="out-dmem-body">
          <div class="dmem-body">
            <div class="dmem-head">宿舍成员</div>
            <div class="Dmembers" v-for="(subItem) in item.student" :key="subItem.id">
              <el-tooltip class="item" effect="dark" content="点击查看学生信息" placement="bottom-start">
                <span @click="itemid(item,subItem)">{{subItem.name}}</span>
              </el-tooltip>
              
              <i class="el-icon-remove-outline detil-student" @click="test(subItem)"></i>
            </div>
            <div class="Dmembers el-icon-plus" style="font-size: 20px; cursor: pointer;" v-if="item.student.length === 8 ? false:true" @click="dialogVisible(item)"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除学生对话框 -->
    <el-dialog
      title="删除学生"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>如果确定删除此学生请在下方输入“确认删除”</span>
      <el-input placeholder="请输入内容" style="margin-top: 20px;" v-model="inputext"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nodetermine">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加学生对话框 -->
    <el-dialog
      title="添加学生"
      :visible.sync="dialogVisible1"
      width="30%"
      @close="outinfomation1"
      >
      <input type="text" placeholder="姓名" v-model="obj.sname">
      <input type="text" placeholder="所在系" v-model="obj.major">
      <input type="text" placeholder="班级" v-model="obj.sclass">
      <input type="text" placeholder="联系方式" v-model="obj.phone">
      <input type="text" placeholder="班主任" v-model="obj.headmaster">
      <input type="text" placeholder="班主任联系方式" v-model="obj.masterphone">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisi">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加宿舍对话框 -->
    <el-dialog
      :title='floor'
      :visible.sync="addDormitorystate"
      width="30%">
      <input type="text" placeholder="请输入添加的宿舍号" v-model="room">
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDormitorystate = false">取 消</el-button>
        <el-button type="primary" @click="addDormitory">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 学生信息对话框 -->
    <el-dialog
      title="学生信息"
      :visible.sync="sinfomation"
      width="30%"
      :show-close= false
      @close="outinfomation">
      <div v-if="!minformation" v-loading="detailoading">
        <p>性名：{{studentdetail.sname}}</p>
        <p>所在系：{{studentdetail.major}}</p>
        <p>班级：{{studentdetail.sclass}}</p>
        <p>联系方式：{{studentdetail.phone}}</p>
        <p>班主任：{{studentdetail.headmaster}}</p>
        <p>班主任联系方式：{{studentdetail.masterphone}}</p>
        <p>状态：
          <el-radio-group v-model="radio" @change="studentstate">
            <el-radio :label="3">正常</el-radio>
            <el-radio :label="6">请假</el-radio>
            <el-radio :label="9">未归</el-radio>
          </el-radio-group>
        </p>
      </div>
      <div v-if="minformation">
        <div>
          <span class="information-sapn">姓名：</span>
          <input type="text" class="information-btn" v-model="studentdetail.sname">
        </div>
        <div>
          <span class="information-sapn">所在系：</span>
          <input type="text" class="information-btn" v-model="studentdetail.major">
        </div>
        <div>
          <span class="information-sapn">班级：</span>
          <input type="text" class="information-btn" v-model="studentdetail.sclass">
        </div>
        <div>
          <span class="information-sapn">联系方式：</span>
          <input type="text" class="information-btn" v-model="studentdetail.phone">
        </div>
        <div>
          <span class="information-sapn">班主任：</span>
          <input type="text" class="information-btn" v-model="studentdetail.headmaster">
        </div>
        <div class="last-box">
          <span class="information-sapn">班主任联系方式：</span>
          <input type="text" class="information-btn" v-model="studentdetail.masterphone">
        </div>
      </div>
      <button class="student-btn" v-if="!minformation" @click="setrounding">设为舍长</button>
      <button class="student-btn" @click="minformationstate">{{minformation ? '保存信息':'修改信息'}}</button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sinfomation = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 清空宿舍对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="emptydorm"
      width="30%">
      <span>本次操作将会移除此宿舍及其全部宿舍成员，风险较高！若果确认移除请在下方输入“确认删除”</span>
      <input type="text" placeholder="请输入内容" v-model="inputext">
      <span slot="footer" class="dialog-footer">
        <el-button @click="emptydorm = false">取 消</el-button>
        <el-button type="primary" @click="emptydormitory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      studentlist: [],
      studentdetail: [],
      datastate: false,
      loading: false,
      detailoading: false,
      centerDialogVisible: false,
      dialogVisible1: false,
      addDormitorystate: false,
      sinfomation: false,
      minformation: false,
      emptydorm:false,
      thisroomid: '',
      inputext: '',
      delstudentid:'',
      room: '',
      radio: +'',
      updateroom: '',
      updatesname: '',
      updatenamestateid: '',
      obj:{
        sname:'',
        major:'',
        sclass: '',
        phone: '',
        headmaster: '',
        masterphone: '',
        roomid:''
      }
    }
  },
  computed: {
    ...mapState(['floor','level'])
  },
  created() {
    this.student()
  },
  watch:{
    '$route':'student'
  },
  methods: {
    //查询学生列表
    student() {
      this.loading = true
      axios.get('/api/student/studentdate',{params: {
        floor: this.$store.state.floor
      }}).then(res => {
        if (res.data.errno === 0) {
          this.studentlist = res.data.data
          this.loading = false
        }
        if(this.studentlist.length === 0) {
          this.datastate = true
        } else {
          this.datastate = false
        }
      })
    },
    test(subItem){
      this.centerDialogVisible = true
      this.delstudentid = subItem.id
      // console.log(this.delstudentid);
    },
    //删除学生
    determine() {
      if (this.inputext === '确认删除') {
        axios.get('/api/student/delstudent',{params: {
          id: this.delstudentid
        }}).then(res => {
          if (res.data.errno === 0) {
            this.$message({
              message: '恭喜你，成功删除此学生',
              type: 'success'
            })
            this.centerDialogVisible = false
            this.inputext = ''
            this.student()
          }
        })
      } else {
        this.$message({
          message: '输入内容有误',
          type: 'warning'
        });
        this.inputext = ''
      }
    },
    nodetermine() {
      this.centerDialogVisible = false
      this.$message({
        message: '已取消删除该学生',
        type: 'warning'
      });
      this.inputext = ''
    },
    dialogVisible(item){
      this.obj.roomid = item.id
      this.dialogVisible1 = true
    },
    //添加学生
    dialogVisi() {
      const numReg = /^[0-9]*$/
      const numRe = new RegExp(numReg)
      if (!numRe.test(this.obj.phone && this.obj.masterphone)) {
        this.$message({
          message: '警告哦，请输入正确格式的电话号码',
          type: 'warning'
        });
        return
      } else if(this.obj.sname === '' || 
                this.obj.major === '' ||
                this.obj.sclass === '' ||
                this.obj.phone === '' ||
                this.obj.headmaster === '' ||
                this.obj.masterphone === '') {
        this.$message({
          message: '警告哦，请输入全部信息',
          type: 'warning'
        });
      } else {
        axios.post('/api/student/newstudent',this.obj).then(res => {
          if (res.data.errno === 0) {
            this.student()
            this.dialogVisible1 = false
            this.obj = {}
            this.$message({
              message: '恭喜你，添加学生成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '添加失败，数据出错',
              type: 'warning'
            });
          }
        })
      }
    },
    addDormitory() {
      console.log(this.room);
      axios.post('/api/student/newdormitory', {
        floor: this.floor,
        room: this.room
      }).then(res => {
        if (res.data.errno === 0) {
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
          this.addDormitorystate = false
          this.room = ''
          this.student()
        }
      })
    },
    minformationstate() {
      this.minformation = !this.minformation
      if (this.minformation === false) {
        axios.post('/api/student/updatestudent',{
          sid: this.updatenamestateid,
          sname: this.studentdetail.sname,
          major: this.studentdetail.major,
          sclass: this.studentdetail.sclass,
          phone: this.studentdetail.phone,
          headmaster: this.studentdetail.headmaster,
          masterphone: this.studentdetail.masterphone
        }).then(res => {
          if (res.data.errno === 0) {
            this.$message({
              message: '恭喜你，成功修改学生信息',
              type: 'success'
            });
          }
        })
      }
    },
    outinfomation(){
      this.sinfomation = false
      this.minformation = false
    },
    outinfomation1(){
      this.obj = {}
    },
    itemid(item,subItem){
      this.sinfomation = true
      this.detailoading = true
      axios.get('/api/student/studentdetail',{params:{
        sid: subItem.id
      }}).then(res => {
        if (res.data.errno === 0) {
          this.studentdetail = res.data.data
          this.radio = +res.data.data.state
          this.detailoading = false
        }
      })
      this.updateroom = item.id
      this.updatesname = subItem.name
      this.updatenamestateid = subItem.id
    },
    setrounding(){
      axios.post('/api/student/updatedhead',{
        id: this.updateroom,
        dhead: this.updatesname
      }).then(res => {
        if (res.data.errno === 0) {
          this.$message({
            message: '恭喜你，成功更换宿舍长',
            type: 'success'
          });
          this.student()
          this.sinfomation = false
        } else {
          this.$message.error('服务器出错');
        }
      })
    },
    studentstate(val) {
      axios.post('/api/student/updatestate',{
        sid: this.updatenamestateid,
        state: val
      }).then(res => {
        if (res.data.errno === 0) {
          this.$message({
            message: '恭喜你，成功更换该学生状态',
            type: 'success'
          });
          this.sinfomation = false
        }
      })
    },
    emptydormid(item){
      this.emptydorm = true
      this.thisroomid = item.id
    },
    emptydormitory(){
      if (this.inputext === '确认删除') {
        axios.get('/api/student/emptydorstu',{params:{
          thisroomid: this.thisroomid
        }}).then(res => {
          if (res.data.errno === 0) {
            this.$message({
              message: '恭喜你，成功删除此宿舍及其所有成员',
              type: 'success'
            });
            this.student()
            this.emptydorm = false
          } else {
            this.$message.error('服务器出错！');
          }
        })
      } else {
        this.$message({
          message: '警告哦，请输入正确内容',
          type: 'warning'
        });
      }
    }
  },
}
</script>

<style lang="less">
.floor-body{
  height: 100%;
  position: relative;
  .newroom{
    position: relative;
    transform: translateX(-50%);
    left: 50%;
    width: 500px;
    height: 130px;
    background-color: rgb(249, 249, 249);
    box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 20px;
    border: 1px dashed #000;
    cursor: pointer;
    .newroom-nei{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      i{
        width: 100%;
        font-size: 40px;
        text-align: center;
      }
      span{
        display: block;
        width: 100%;
        font-size: 25px;
      }
    }
    
  }
  .newroom:active{
    box-shadow:none;
  }
  .nodate{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .wai-student{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .out-student{
      display: inline-block;
      width: 304px;
      height: 362px;
      background-color: rgb(242, 242, 242);
      border-radius: 15px;
      margin: 10px 0;
      overflow: hidden;
      border: 1px solid rgb(174, 174, 174);
      box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      .headata{
        display: flex;
        h2,h4{
          margin: 10px 0 0 30px;
          display: inline-block;
          align-self: center;
        }
      }
      .dheadlist{
        margin: 10px 0 20px 30px;
        span{
          // color: aqua;
          display: inline-block;
          width: 70px;
          text-align: center;
        }
        a{
          color: rgb(186, 14, 14);
          cursor: pointer;
          font-size: 15px;
        }
        a:hover{
          color: rgb(230, 4, 4);
          font-size: 16px;
        }
        .update-dhead{
          width: 80px;
          .el-input__inner{
            padding: 0;
            font-size: 15px;
            border: none;
            text-align: center;
          }
        }
        .dhead-chan{
          color: rgb(228, 174, 93);
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    .out-dmem-body{
      width: 100%;
      height: 100%;
      background-color: rgb(255, 255, 255);
      .dmem-body{
        background-color: rgb(255, 255, 255);
        padding: 0 20px;
        display: flex;
        // height: 362px;
        justify-content: space-around;
        flex-wrap: wrap;
        .dmem-head{
          padding: 10px 0 10px 10px;
          width: 100%;
          height: 19px;
          border-bottom: 1px solid #000;
          background-color: rgb(255, 255, 255);
        }
        .Dmembers{
          display: inline-block;
          margin: 8px 0;
          padding: 0px 10px;
          width: 90px;
          height: 41px;
          background-color: rgb(249, 249, 249);
          box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
          text-align: center;
          line-height: 41px;
          border-radius: 10px;
          font-size: 13px;
          position: relative;
          span{
            cursor: pointer;
          }
          .detil-student{
            color: rgb(255, 1, 1);
            font-size: 15px;
            position: absolute;
            right: 7px;
            top: 13px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .el-dialog__body{
    text-align: center;
    .student-btn{
      width: 90px;
      height: 37px;
      margin: 0 10px;
      background-color: rgb(243, 188, 107);
      border: none;
      cursor: pointer;
      border-radius: 10px;
      box-shadow: 0 3px 5px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .student-btn:active{
      box-shadow: none;
    }
    input{
      width: 90%;
      height: 36px;
      margin-top: 15px;
      border: none;
      border-bottom: 1px solid #000;
      text-indent: 1em;
      outline: none;
      font-size: 15px;
    }
    .information-sapn{
      display: inline-block;
      width: 135px;
    }
    .information-btn{
      width: 180px;
      margin: 0;
    }
    .last-box{
      margin-bottom: 33px;
    }
  }
  
}

</style>