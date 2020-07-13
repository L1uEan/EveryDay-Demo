import Vue from 'vue'
import Router from 'vue-router'
// 五个导航首位
import Home from '../view/Home'
import KeCheng from '../view/KeCheng';
import LianXi from '../view/LianXi';
import Me from '../view/User/Me';
import YueKe from '../view/YueKe';
import Index from '../view/TeacherXq/Index'
// import Concern from '../view/User/Concern.vue'

// 搜索 
import Search from "../view/Search.vue"
import Details from "../view/Details.vue"


  

Vue.use(Router)


let r = new Router({
  routes: [
    {
      path:'/',
      redirect:'/home/index'
    },
    {
      path: '/home',
      name:'Home',
      component:Home,
      children:[
        {
          path:'index',
          name:'Index',
          component:Index
        },
        {
          path:'lianxi',
          name:'LianXi',
          component:LianXi
        },
        {
          path:'kecheng',
          name:'KeCheng',
          component:KeCheng
        },
        {
          path:'person',
          component:()=> import ('../view/User/PerSon'),
          // beforeEnter:((to,from,next)=>{
          //   // if(localStorage.getItem('token')){
            
          //   // console.log(localStorage.getItem('token'))
          //   //   next()
          //   // }else{
          //   //   next('/me')
          //   // }
          //   let token = localStorage.getItem('token')
          //   if(!token && to.name.indexOf('Me') < 0){
          //     next('/me')
          //   } else {
          //     next()
          //   }
           
          // })
          
        },
        {
          path:'YueKe',
          name:'YueKe',
          component:YueKe
        },
      ]
    },
    //User. 注册界面
    {
      path:'/login',
      name:'Login',
      // 路由懒加载 当点击的时候才会调用
      component:() => import('../view/User/Login')
    },
    // User.设置密码页面
    {
      path:'/passworld',
      name:'PassWorld',
      component:() => import('../view/User/PassWorld')
    },
    // User.登录密码页面
    {
      path:'/me',
      name:'Me',
      component:Me
    },
    // 讲师详情部分
    {
      path:'/teacher',
      name:'TeacherMsg',
      component:()=> import ('../view/TeacherXq/TeacherMsg')
    },
    // 搜索
    {
      path:"/search",
      name:"Search",
      component:Search
    },
    // 分类
    {
      path:"/details",
      name:"Details",
      component:Details
    },
    // 我的关注
    {
      path:"/concern",
      name:"Concern",
      component:()=>import ("../view/User/Concern.vue")
    },
    //我的收藏 
    {
      path:"/collect",
      name:"Collect",
      component:()=>import ("../view/User/Collect.vue")
    }
    
  ]
})

export default r