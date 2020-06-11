<template>
  <div>
    <el-row>
      <el-form :model="pageInfo">
      <el-select v-model="pageInfo.siteId" placeholder="请选择站点id">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteName">
        </el-option>
      </el-select>
      <span>页面别名</span>
      <el-input v-model="pageInfo.pageAliase" placeholder="请输入网站别名" style="width: 200px"></el-input>
      <el-button type="primary" size="medium" @click="queryPageList()">查询</el-button>
        <!--新增路由地址,还需要去index.js添加路由-->
        <!--query后面携带参数-->
        <router-link :to="{path:'/cms/page/add',query:{
          page:this.pageInfo.page,
          siteId:this.pageInfo.siteId
        }}">
          <el-button type="primary">添加页面</el-button>
        </router-link>

      </el-form>
    </el-row>
    <el-table
      :data="pageList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="pageName"
        label="pageName"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pageAliase"
        label="pageAliase"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pageWebPath"
        label="pageWebPath">
      </el-table-column>
      <el-table-column
        prop="pagePhysicalPath"
        label="pagePhysicalPath">
      </el-table-column>
      <el-table-column
        prop="pageCreateTime"
        label="pageCreateTime">
      </el-table-column>
      <el-table-column
        prop="templateId"
        label="templateId">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row.pageId)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.pageId)">删除</el-button>
          <el-button
            size="mini"
            @click="handlePreview(scope.$index, scope.row.pageId)">页面预览</el-button>
          <el-button
            size="mini"
            @click="handlePublish(scope.$index, scope.row.pageId)">发布</el-button>
        </template>
      </el-table-column>


    </el-table>




    <!--分页-->
<!--    <el-pagination-->
<!--      layout="prev, pager, next"-->
<!--      :total="50" style="float: right" :page-size="pageInfo.pageSize" :current-page="pageInfo.page" @current-change="changePage"	>-->
<!--    </el-pagination>-->
    <el-pagination
      @current-change="changePage"
      :current-page="pageInfo.page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
  /*引入写入的查询方法*/
  import * as cmsApi  from  "../api/csm"
  export default {
    data() {
      return {
        pageList: [ {
          "siteId": "5a751fab6abb5044e0d19ea1",
          "pageId": "5a7be667d019f14d90a1fb1c",
          "pageName": "index_category.html",
          "pageAliase": "分类导航",
          "pageWebPath": "/include/index_category.html",
          "pageParameter": null,
          "pagePhysicalPath": "F:\\develop\\xc_portal_static\\include\\",
          "pageType": "0",
          "pageCreateTime": "2018-02-08T05:55:07.590+0000",
          "templateId": "5a962c16b00ffc514038fafd",
          "pageParams": null,
          "htmlFileId": "5a7be8e4d019f14d90a1fb21",
          "dataUrl": null
        }],
        pageInfo:{
          pageSize:10,
          page:1,
          siteId:{},
          pageAliase:"",
        },
        total:0,
        siteList:[],
      }
    },
    created() {
      /*地址栏取出来的是字符串,需要转换*/
      this.pageInfo.page = parseInt(this.$route.query.page || 1);
      this.queryPageList();

    },
    mounted() {

        //初始化站点列表
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]
    },
    methods:{

      queryPageList(){
        cmsApi.page_list(this.pageInfo.page,this.pageInfo.pageSize,this.pageInfo).then(resp=>{
            this.total = resp.queryResult.total;
            let data = resp.queryResult.list;
            data.forEach(x=>{
              // x.pageCreateTime = new Date(x.pageCreateTime)
            });
            this.pageList = data;
        })
      },
      changePage(page){
        this.pageInfo.page= page;
        this.queryPageList();
      },

      handleEdit(index, row) {
        this.$router.push({
          path:"/cms/page/edit/"+row,
          query:{
            page:this.$route.query.page,
          }
        })

      },
      handleDelete(index, row) {
        this.$confirm('是否提交', '提示', {
        }).then(()=>{
          cmsApi.deletePage(row).then(resp=>{
            if (resp.success){
              this.$message.success("删除成功");
              /*重新查询当前页*/
              this.queryPageList();
            }else {
              this.$message.error("删除失败")
            }
          })
        })
      },
      handlePreview(index, row){

        window.open("http://localhost:31001/cms/template/preview/"+row);
      },
      handlePublish(index,row){
        cmsApi.publishPage(row).then(resp=>{
          this.$message.success("发布成功");
        })
      }

    },



  }
</script>
<style>

</style>
