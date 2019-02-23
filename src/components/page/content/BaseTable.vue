<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="delete"
          class="handle-del mr10"
          @click="delAll"
        >批量删除</el-button>
        <el-select
          v-model="select_cate"
          placeholder="筛选省份"
          class="handle-select mr10"
        >
          <el-option
            key="1"
            label="广东省"
            value="广东省"
          ></el-option>
          <el-option
            key="2"
            label="湖南省"
            value="湖南省"
          ></el-option>
        </el-select>
        <el-input
          v-model="select_word"
          placeholder="筛选关键词"
          class="handle-input mr10"
        ></el-input>
        <el-button
          type="primary"
          icon="search"
          @click="search"
        >搜索</el-button>
      </div>
      <!-- <el-table
        :data="data"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <!-- 人员列表 Start -->
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          label="日期"
          width="120"
        >
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="创建人姓名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="lastName"
          label="姓名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="呢称"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系电话"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 人员列表 End -->
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editVisible"
      width="30%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="50px"
      >
        <el-form-item label="日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveEdit"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteRow"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/services/api.js'
export default {
  name: 'basetable',
  data () {
    return {
      url: './vuetable.json',
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: '',
        date: '',
        address: ''
      },
      idx: -1,
      current: 1, // 页数
      size: 10, // 条目数
      tableData: []
      // tableData: [{
      //   createTime: '2016-05-03',
      //   createBy: '曲玉小姐',
      //   lastName: '王小虎',
      //   nickName: '皮皮虾',
      //   telephone: '0752-6638997',
      //   mobile: '13059555285',
      //   email: '1164698177@qq.com',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   createTime: '2016-05-02',
      //   createBy: '曲玉小姐',
      //   lastName: '王小虎',
      //   nickName: '皮皮虾',
      //   telephone: '0752-6638997',
      //   mobile: '13059555285',
      //   email: '1164698177@qq.com',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   createTime: '2016-05-04',
      //   createBy: '曲玉小姐',
      //   lastName: '王小虎',
      //   nickName: '皮皮虾',
      //   telephone: '0752-6638997',
      //   mobile: '13059555285',
      //   email: '1164698177@qq.com',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   createTime: '2016-05-01',
      //   createBy: '曲玉小姐',
      //   lastName: '王小虎',
      //   nickName: '皮皮虾',
      //   telephone: '0752-6638997',
      //   mobile: '13059555285',
      //   email: '1164698177@qq.com',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   createTime: '2016-05-08',
      //   createBy: '曲玉小姐',
      //   lastName: '王小虎',
      //   nickName: '皮皮虾',
      //   telephone: '0752-6638997',
      //   mobile: '13059555285',
      //   email: '1164698177@qq.com',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   createTime: '2016-05-06',
      //   createBy: '曲玉小姐',
      //   lastName: '王小虎',
      //   nickName: '皮皮虾',
      //   telephone: '0752-6638997',
      //   mobile: '13059555285',
      //   email: '1164698177@qq.com',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   createTime: '2016-05-07',
      //   createBy: '曲玉小姐',
      //   lastName: '王小虎',
      //   nickName: '皮皮虾',
      //   telephone: '0752-6638997',
      //   mobile: '13059555285',
      //   email: '1164698177@qq.com',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }],
    }
  },
  created () {
    this.getData();
  },
  computed: {
    data () {
      return this.tableData.filter((d) => {
        console.log(d)
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      })
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val;
      this.getData();
    },
    getData () { // 请求人员列表数据
      let postData = {
        'current': this.current,
        'size': this.size
      }
      getList(postData).then((res) => {
        console.log(res)
        this.tableData = res.data.data.content
      })
    },
    search () {
      this.is_search = true;
    },
    formatter (row, column) {
      return row.address;
    },
    filterTag (value, row) {
      return row.tag === value;
    },
    handleEdit (index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      }
      this.editVisible = true;
    },
    handleDelete (index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll () {
      const length = this.multipleSelection.length;
      let str = '';
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
      }
      this.$message.error('删除了' + str);
      this.multipleSelection = [];
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit () {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow () {
      this.tableData.splice(this.idx, 1);
      this.$message.success('删除成功');
      this.delVisible = false;
    }
  }
}

</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
