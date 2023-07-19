<template>
  <div>
    <div class="newroom" @click="userVisible = true">
      <div class="newroom-nei">
        <i class="el-icon-plus"></i>
        <span>添加人员</span>
      </div>
    </div>
    <div class="admindata">
      <el-table
        :data="userdata"
        style="width: 100%"
        max-height="100%">
        <el-table-column
          fixed
          prop="username"
          label="用户名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="juris"
          label="管辖范围"
          width="200">
        </el-table-column>
        <el-table-column
          prop="level"
          label="身份级别"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="changeClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="delClick(scope.row)" type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加人员 -->
    <el-dialog
      title="添加管理人员"
      :visible.sync="userVisible"
      width="30%">
      <input type="text" placeholder="用户名" class="initdata" v-model="obj.username">
      <input type="text" placeholder="昵称" class="initdata" v-model="obj.nickname">
      <el-select v-model="obj.value" placeholder="请选择管辖范围" class="initdata1">
        <el-option
          v-for="item in jurisoptions"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <el-select v-model="obj.value1" placeholder="请选择级别" class="initdata1">
        <el-option
          v-for="item in leveloptions"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <input type="text" placeholder="请输入密码" class="initdata" v-model="obj.password1">
      <input type="text" placeholder="请确认密码" class="initdata" v-model="obj.password2">
      <span slot="footer" class="dialog-footer">
        <el-button @click="userVisible = false">取 消</el-button>
        <el-button type="primary" @click="inituserVisible">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改人员信息 -->
    <el-dialog
      title="添加管理人员"
      :visible.sync="detailVisble"
      width="30%">
      <div v-loading="udetloading">
        <el-select v-model="detailuserdata.juris" placeholder="请选择管辖范围" class="initdata1">
          <el-option
            v-for="item in jurisoptions"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
        <el-select v-model="detailuserdata.level" placeholder="请选择级别" class="initdata1">
          <el-option
            v-for="item in leveloptions"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetpassword">重置密码</el-button>
        <el-button type="primary" @click="detailjuris">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userdata:[],
      jurisoptions: [],
      leveloptions: [],
      detailuserdata: [],
      userVisible: false,
      detailVisble: false,
      udetloading: false,
      userdataid: '',
      obj:{
        username: '',
        nickname: '',
        password1: '',
        password2: '',
        value: '',
        value1: ''
      }
    }
  },
  created(){
    this.inituserdate()
    this.biunumdata()
  },
  methods:{
    inituserdate() {
      axios.get('/api/erp/user/userdata').then(res => {
        if (res.data.errno === 0) {
          this.userdata = res.data.data
        }
      })
      
    },
    async biunumdata() {
      const { data: res } = await axios.get('/My-Json/biuldingnum.json')
      this.jurisoptions = res[0].juris
      this.leveloptions = res[1].level
    },
    inituserVisible(){
      if (this.obj.username === '') {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        });
        return
      }
      if (this.obj.nickname === '') {
        this.$message({
          message: '请输入昵称',
          type: 'warning'
        });
        return
      }
      if (this.obj.value === '') {
        this.$message({
          message: '请选择管辖范围',
          type: 'warning'
        });
        return
      }
      if (this.obj.value1 === '') {
        this.$message({
          message: '请选择用户级别',
          type: 'warning'
        });
        return
      }
      if (this.obj.password1 === '') {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        });
        return
      }
      if (this.obj.password2 === '') {
        this.$message({
          message: '请输入确认密码',
          type: 'warning'
        });
        return
      }
      if (this.obj.password1 !== this.obj.password2) {
        this.$message.error('两次输入的密码不一致');
        return
      }
      axios.get('/api/erp/user/userrepeat', {params: {
        username: this.obj.username
      }}).then(res => {
        if (res.data.errno === 0) {
          axios.post('/api/erp/user/insertuser', {
            username: this.obj.username,
            password: this.obj.password1,
            nickname: this.obj.nickname,
            level: this.obj.value1,
            juris: this.obj.value,
          }).then(res => {
            if (res.data.errno === 0) {
              this.$message({
                message: '添加用户成功',
                type: 'success'
              });
              this.obj = {}
              this.userVisible = false
              this.inituserdate()
            }
          })
        } else {
          this.$message({
            message: '警告!该用户名已被占用',
            type: 'warning'
          });
        }
      })
      
      
    },
    changeClick(row) {
      this.detailVisble = true
      this.udetloading = true
      axios.get('/api/erp/user/userdata',{params: {
        id:row.id
      }}).then(res => {
        if (res.data.errno === 0) {
          this.detailuserdata = res.data.data[0]
          this.userdataid = res.data.data[0].id
          this.udetloading = false
        }
      })
    },
    // 重置密码
    resetpassword() {
      axios.post('/api/erp/user/resetpass', {
        id: this.userdataid,
      }).then(res => {
        if (res.data.errno === 0) {
          this.$notify({
            title: '成功',
            message: '重置后密码为“123456”！',
            type: 'success',
            duration: 0
          });
          this.detailVisble = false
        }
      })
    },
    // 修改管理权限
    detailjuris() {
      axios.post('/api/erp/user/detailuser', {
        id: this.userdataid,
        juris: this.detailuserdata.juris,
        level: this.detailuserdata.level
      }).then(res => {
        if (res.data.errno === 0) {
          this.$message({
            message: '您已成功修改权限信息',
            type: 'success'
          });
          this.detailVisble = false
          this.inituserdate()
        }
      })
    },
    delClick(row) {
      this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/api/erp/user/deluser', {
          id: row.id
        }).then(res => {
          if (res.data.errno === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.inituserdate()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    }
  }
}
</script>

<style lang="less">
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
.el-dialog__body{
  text-align: center;
  .newroom:active{
    box-shadow:none;
  }
  .admindata{
    margin-top: 20px;
  }
  .initdata{
    width: 208px;
    margin: 10px 0;
    height: 30px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
  }
  .initdata1{
    margin: 10px 0;
    height: 30px;
  }
}
</style>