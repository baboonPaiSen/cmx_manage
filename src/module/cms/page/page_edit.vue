<template>
  <div>
    <el-form   :model="pageForm" label-width="80px" ref="pageFormSubmit" :rules="pageFormRules">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模版" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择">
          <el-option
            v-for="item in templateList"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="数据Url" prop="dataUrl">
        <el-input v-model="pageForm.dataUrl" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio class="radio" label="0">静态</el-radio>
          <el-radio class="radio" label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="go_back">返回</el-button>
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
    </div>
  </div>
</template>
<script>
  import * as cmsApi from "../api/csm"
  export default{
    data(){
      return {

        //模版列表
        templateList:[],
        addLoading: false,//加载效果标记
        //新增界面数据
        pageForm: {
          siteId:'',
          pageId:"",
          templateId:'',
          pageName: '',
          pageAliase: '',
          pageWebPath: '',
          dataUrl:'',
          pageParameter:'',
          pagePhysicalPath:'',
          pageType:'',
          pageCreateTime:'',
        },
        siteList:[{
          siteId:"5a751fab6abb5044e0d19ea1",
          siteName:"门户主站",
        }],
        pageFormRules: {
          siteId:[
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateId:[
            {required: true, message: '请选择模版', trigger: 'blur'}
          ],
          pageName: [
            {required: true, message: '请输入页面名称', trigger: 'blur'}
          ],
          pageWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'}
          ],
          pagePhysicalPath: [
            {required: true, message: '请输入物理路径', trigger: 'blur'}
          ]
        },
      }
    },
    methods:{
      go_back(){
        /*注意路由是router*/
        this.$router.push({
          path:'/cms/page/list',
          /*取出路由后缀*/
          query:{
            /*注意这里是route*/
            page:this.$route.query.page,
          }
        })
      },
      addSubmit(){
        /*对pageForm 注意要加双引号表单进行校验*/
        this.$refs["pageFormSubmit"].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交', '提示', {
            }).then(() => {

              cmsApi.page_edit(this.pageForm.pageId,this.pageForm).then(resp=>{
                /*对状态码测试*/

                if (resp.code===10000){
                  this.$message.success('修改成功了');
                  /*跳转到查询列表*/
                  this.$router.push({
                    path:'/cms/page/list',
                    /*取出路由后缀*/
                    query:{
                      /*注意这里是route*/
                      page:this.$route.query.page,
                    }
                  })
                }else {
                  this.addLoading=false;
                  this.$message.warning('修改失败');
                }
              })
            })
          } else {
            /*校验不通过直接返回*/
            return false;
          }
        });
      },
    },
    created() {
      /*url路径拿参数是$route.params.pageId 如果是?拿参数是$route.query.pageId*/

      this.pageForm.pageId = this.$route.params.pageId;

      cmsApi.queryPage(this.pageForm.pageId).then(res=>{
        cmsApi.queryTemplate(res.cmsPage.siteId).then(resp=>{
          this.templateList= resp;
        });
        this.pageForm  = res.cmsPage;
      });



    },
    mounted(){


    }
  }
</script>
<style>

</style>
