<template>
  <div class="home-body">
    <div class="home-admin hidden-md-and-down">
      <div class="home-admin-top">
        <div class="home-admin-top-nei">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="top-nei-L"></el-avatar>
          <h2>{{ nickname }}</h2>
        </div>
        <div class="id-box">
          <h4 class="btn-nei1">管辖范围：</h4>
          <h4 class="btn-nei2">{{ juris }}</h4>
        </div>
        <div class="id-box">
          <h4 class="btn-nei1">用户级别：</h4>
          <h4 class="btn-nei2">{{ level }}</h4>
        </div>
      </div>
      <Memorandum></Memorandum>
    </div>
    <div class="home-data">
      <div class="home-data-top">
        <div class="home-body-num1">
          <div class="home-body-num-left">
            <i class="el-icon-office-building"></i>
            <span>房间数</span>
          </div>
          <div class="home-body-num-right">{{daternum}}间</div>
        </div>
        <div class="home-body-num1">
          <div class="home-body-num-left">
            <i class="el-icon-s-custom"></i>
            <span>学生数</span>
          </div>
          <div class="home-body-num-right">{{datesnum}}人</div>
        </div>
        <div class="home-body-num1 hidden-md-and-down">
          <div class="home-body-num-left">
            <i class="el-icon-moon-night"></i>
            <span>请假人数</span>
          </div>
          <div class="home-body-num-right">{{roomdata.length}}人</div>
        </div>
      </div>
      <div ref="myChart" class="myChart"></div>
      <div class="home-data-search">
        <input type="text" placeholder="请输入学生姓名、班主任姓名或房间号" v-model="detailstudentdata">
        <button @click="initdetailstudent">搜索</button>
      </div>
      <div class="home-data-bottom">
        <el-tabs tab-position="left" style="height: 317px">
          <el-tab-pane label="请假学生">
            <el-table
              :data="roomdata"
              style="width: 100%">
              <el-table-column
                prop="sname"
                label="姓名"
                width="110">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                width="160">
              </el-table-column>
              <el-table-column
                prop="headmaster"
                label="班主任"
                width="110">
              </el-table-column>
              <el-table-column
                prop="masterphone"
                label="班主任联系方式"
                width="160">
              </el-table-column>
              <el-table-column
                prop="room"
                label="宿舍">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">已回</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="未归学生">
            <el-table
              :data="roomdata1"
              style="width: 100%">
              <el-table-column
                prop="sname"
                label="姓名"
                width="110">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                width="160">
              </el-table-column>
              <el-table-column
                prop="headmaster"
                label="班主任"
                width="110">
              </el-table-column>
              <el-table-column
                prop="masterphone"
                label="班主任联系方式"
                width="160">
              </el-table-column>
              <el-table-column
                prop="room"
                label="宿舍">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">已回</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="查询结果" :visible.sync="dialogTableVisible" width="70%">
      <el-table :data="gridData">
        <el-table-column property="sname" label="姓名" width="100"></el-table-column>
        <el-table-column property="major" label="所在系" width="100"></el-table-column>
        <el-table-column property="sclass" label="班级" width="100"></el-table-column>
        <el-table-column property="phone" label="联系方式" width="150"></el-table-column>
        <el-table-column property="headmaster" label="班主任" width="100"></el-table-column>
        <el-table-column property="masterphone" label="班主任联系方式" width="150"></el-table-column>
        <el-table-column property="room" label="宿舍" width="80"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as echarts from 'echarts'
import axios from 'axios'
import Memorandum from '../../components/memorandum.vue'
import 'element-ui/lib/theme-chalk/display.css'
export default {
  data() {
    return {
      floordate: [],
      roomdata:[],
      roomdata1:[],
      roomnum:[],
      studennum:[],
      gridData:[],
      daternum: '',
      datesnum: '',
      detailstudentdata: '',
      dialogTableVisible: false,
    }
  },
  components: {
    Memorandum,
  },
  created() {
    this.floordata()
    this.statedata()
  },
  computed: {
    ...mapState(['userData', 'nickname', 'level', 'juris']),
    isfloordata() {
      return this.floordate.filter((item) => item.children)
    }
  },
  methods: {
    async floordata() {
      // echartX数据接口
      const { data: res } = await axios.get('/My-Json/menu.json')
      this.floordate = res
      this.floordate = this.isfloordata[0].children
      const arr = this.floordate.map(item => item.label)

      const { data: rnum } = await axios.get('/api/erp/homedata/roomnum')
      if (rnum.errno === 0) {
        this.roomnum = rnum.data
        this.roomnum = this.roomnum.map(item => item.rnum)
      }
      const { data: snum } = await axios.get('/api/erp/homedata/studennum')
      if (snum.errno === 0) {
        this.studennum = snum.data
        this.studennum = this.studennum.map(item => item.sname)
      }

      const { data: dnum } = await axios.get('/api/erp/homedata/datenum')
      if (dnum.errno === 0) {
        this.daternum = dnum.data[0].bnum
        this.datesnum = dnum.data[1].bnum
      }
      this.setChart(arr)
    },
    setChart(x) {
      let myChart = echarts.init(this.$refs.myChart)
      let option = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          show: true,
        },
        xAxis: {
          type: 'category',
          data: x,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '房间数',
            type: 'line',
            stack: 'num',
            data: this.roomnum,
          },
          {
            name: '学生数',
            type: 'line',
            stack: 'num',
            data: this.studennum,
          },
        ],
        grid: {
          // 让图表占满容器
          top: '40px',
          left: '50px',
          right: '50px',
          bottom: '30px',
        },
      }
      myChart.setOption(option)
      // 自适应大小
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    async statedata() {
      const { data: resfloor } = await axios.get('/api/erp/homedata/floordate')
      if (resfloor.errno === 0) {
        this.roomdata = resfloor.data
      }
      const { data: resfloor1 } = await axios.get('/api/erp/homedata/floordate1')
      if (resfloor.errno === 0) {
        this.roomdata1 = resfloor1.data
      }
    },
    handleClick(row) {
      axios.post('/api/student/updatestate',{
        sid: row.sid,
        state: 3
      }).then(res => {
        if (res.data.errno === 0) {
          this.$message({
            message: '恭喜你，成功更换该学生状态',
            type: 'success'
          });
          this.statedata()
        }
      })
    },
    initdetailstudent() {
      if (this.detailstudentdata === '') {
        this.$message({
          message: '请输入关键字：姓名、班主任或宿舍号',
          type: 'warning'
        });
        return
      } else {
        axios.get('/api/erp/homedata/detailstudent',{params:{
          keyword: this.detailstudentdata
        }}).then(res => {
          if (res.data.errno === 0) {
            this.dialogTableVisible = true
            this.gridData = res.data.data
            console.log(this.gridData);
            this.detailstudentdata = ''
          }
        })
      }
      
    }
  },
}
</script>

<style lang="less">
.home-body {
  height: 100%;
  display: flex;
  .home-admin {
    width: 30%;
    height: 100%;
    display: inline-block;
    margin-right: 20px;
    .home-admin-top {
      height: 235px;
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(201, 201, 201);
      border-radius: 20px;
      margin-bottom: 20px;
      box-shadow: 2px 4px 10px rgb(215, 215, 215);
      .home-admin-top-nei {
        display: flex;
        height: 125px;
        margin: 20px;
        border-bottom: 1px solid #000;
        .top-nei-L {
          @media screen and (min-width: 1200px) and (max-width: 1920px) {
            margin-left: 15px;
          }
          width: 100px;
          height: 100px;
          align-self: center;
          margin-left: 60px;
        }
        h2 {
          @media screen and (min-width: 1920px) and (max-width: 2580px) {
            margin-left: 50px;
          }
          @media screen and (min-width: 1233px) and (max-width: 1920px) {
            margin-left: 30px;
          }
          align-self: center;
        }
      }
      .id-box {
        display: flex;
        margin-top: 10px;
        .btn-nei1 {
          @media screen and (min-width: 1920px) and (max-width: 2580px) {
            margin-left: 90px;
          }
          width: 105px;
          margin: 0px 0 0 50px;
          display: inline-block;
        }
        .btn-nei2 {
          @media screen and (min-width: 1920px) and (max-width: 2580px) {
            width: 240px;
          }
          @media screen and (min-width: 1200px) and (max-width: 1920px) {
            width: 140px;
          }
          display: inline-block;
          margin: 0 0 0 10px;
        }
      }
    }
  }
  .home-data {
    flex: 1;
    height: 100%;
    position: relative;
    .home-data-top {
      height: 145px;
      // background-color: antiquewhite;
      display: flex;
      justify-content: space-around;
      
      .home-body-num1 {
        @media screen and (min-width: 1200px) and (max-width: 1520px) {
          width: 230px;
        }
        height: 100%;
        width: 280px;
        position: relative;
        border-radius: 20px;
        display: flex;
        border: 1px solid rgb(202, 202, 202);
        box-shadow: 2px 4px 10px rgb(215, 215, 215);
        .home-body-num-left {
          @media screen and (min-width: 1200px) and (max-width: 1520px) {
            width: 95px;
          }
          position: absolute;
          display: inline-block;
          top: 50%;
          transform: translateY(-50%);
          width: 110px;
          text-align: center;
          border-right: 1px solid #000;
          padding: 18px 0;
          i {
            display: inline-block;
            width: 100%;
            font-size: 40px;
          }
          span {
            font-size: 20px;
          }
        }
        .home-body-num-right {
          @media screen and (min-width: 1200px) and (max-width: 1520px) {
            width: 117px;
          }
          position: absolute;
          right: 0;
          width: 179px;
          height: 145px;
          text-align: center;
          line-height: 145px;
          font-size: 40px;
        }
      }
    }
    .myChart {
      // width: 500px;
      margin: 20px 0;
      height: 250px;
      border: 1px solid rgb(192, 192, 192);
      border-radius: 20px;
    }
    .home-data-search{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 48px;
      display: flex;
      justify-content: center;
      input{
        border-radius: 8px;
        height: 28px;
        width: 350px;
        border: 1px solid #000;
        outline: none;
        font-size: 16px;
        text-indent: 8px;
      }
      button{
        background-color: rgb(246, 210, 130);
        margin-left: 10px;
        border-radius: 6px;
        border: 1px solid rgb(207, 207, 207);
        height: 32px;
        width: 75px;
        cursor: pointer;
      }
    }
    .home-data-bottom {
      border: 1px solid rgb(199, 199, 199);
      padding: 17px 0;
      border-radius: 20px;
      margin-top: 68px;
    }
  }
}
</style>
