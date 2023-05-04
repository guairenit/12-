import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home'),
        children: [
            {
                path: '/',
                name: 'study',
                component: () => import('@/views/study/home_Nav.vue')
            },
            {
                path: '/study',
                name: 'study',
                component: () => import('@/views/study/home_Nav.vue')
            },
            {
                path: 'find',
                name: 'Find',
                component: () => import("@/views/study/find/product_List.vue")
            },
            {
                path: "details",
                name: "Details",
                component: () => import("@/views/study/sub/Details.vue"),
                children: [
                    {
                        path: ":id",
                        name: "OpenProduct",
                        component: () => import("@/views/study/sub/open_Product.vue")
                    },
                    {
                        path: ":id/logo",
                        name: "logo",
                        component: () => import("@/views/study/sub/logo.vue")
                    }
                ]
            },
            {
                path:'/excel',
                name:'Excel',
                component:()=> import('@/views/excel')
            },
            {
                path: '/questions',
                name: 'questions',
                component: () => import('@/views/questions'),
            },
            {
                path: '/question',
                name: 'question',
                component: () => import('@/views/questions/question.vue'),
                //独享路由守卫
                meta:{isAuth:true},
                beforeEnter: (to, from, next) => {
                    if(localStorage.getItem('token')){
                        next()
                    }else{
                        alert('请先登录！')
                        next('/login')
                    }
                }
            },
            
            {
                path: '/discussions',
                name: 'discussions',
                component: () => import('@/views/discussions')
            },
            {
                path: '/discussion',
                name: 'discussion',
                component: () => import('@/views/discussions/discussion')
            },
            {
                path:"/shoppage",
                name:"shopPage",
                component: () => import("@/views/shop/"),
                
            children: [
            {
                path:"goodsDetails",
                name:"goodsDetails",
                component: () => import("@/views/shop/shop_Details.vue"),
                meta:{
                    title:'商品详情',
                    showfater:false
                },
            },
            {
                path:"Allgoods",
                name:"Allgoods",
                component: () => import("@/views/shop/shop_Allgoods.vue"),
                meta:{
                    title:'所有商品',
                    showfater:false
                },
            },
            {
                path:"cart",
                name:"cart",
                component: () => import("@/views/shop/shop_Cart.vue"),
                
                children:[
            {
                path:"pay",
                name:"pay",
                component: () => import("@/views/shop/shop_Pay.vue"),
                meta:{
                    title:'支付',
                    showfater2:false
                },
            },
            {
                path:"order",
                name:"order",
                component: () => import("@/views/shop/shop_Order.vue"),
                meta:{
                    title:'订单页面',
                    showfater2:false
                },
            },
        ],
        meta:{
            title:'购物车',
            showfater:false,
            showfater2:true
        },
       },
        ],
        meta:{
            title:'首页',
            showfater:true
        },
        },
            {
                path: "/user",
                name: "user",
                component: () => import("@/views/user/index.vue")
            },
            {
                path: "/userdisscuss",
                name: "userdisscuss",
                component: () => import("@/views/user/user_Disscuss.vue")
            },
            {
                path: "/usercollection",
                name: "usercollection",
                component: () => import("@/views/user/user_Collection.vue")
            },
            /* 帮助中心 */
            {
                path: '/helps',
                name: 'helps',
                component: () => import('@/views/help/index.vue'),
            },
            {
                path: '/helpInfos',
                name: 'helpInfos',
                component: () => import('@/views/help/help_Info.vue'),
            },
            {
                path: "/usermodification",
                name: "usermodification",
                component: () => import("@/views/user/user_Modification.vue")
            },
            
        ]
    },
    /* 后台管理路由 */
    {
        path: '/admin',
        name: 'Layout',
        component: () => import('@/layout'),
        children: [
            {
                path: '/',
                name: 'admin',
                redirect: "/rolemanage"
            },
            {
                path: '/rolemanage',
                name: 'RoleManage',
                component: () => import('@/views/manage/role_Manage'),
            },
            {
                path: '/usermanage',
                name: 'UserManage',
                component: () => import('@/views/manage/user_Manage'),
            },
            {
                path: '/ordersmanage',
                name: 'OrdersManage',
                component: () => import('@/views/manage/orders_Manage'),
            },
            {
                path: '/questionsManage',
                name: 'QuestionsManage',
                component: () => import('@/views/manage/questions_Manage'),
            },
            {
                path: '/discussManage',
                name: 'DiscussManage',
                component: () => import('@/views/manage/discuss_Manage'),
            },
            {
                path: '/commentsManage',
                name: 'CommentsManage',
                component: () => import('@/views/manage/comments_Mangage'),
            },
            {
                path: '/goodsManage',
                name: 'GoodsManage',
                component: () => import('@/views/manage/goods_Manage'),
            },
            {
                path: '/booksManage',
                name: 'BooksManage',
                component: () => import('@/views/manage/books_Mangage'),
            },

        ]
    },
    /* 登录 */
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/login.vue'),
    },
    /* 邮箱登录 */
    {
        path: '/loginByMail',
        name: 'loginByMail',
        component: () => import('@/views/login/login_ByMail.vue'),
    },
    /* 注册 */
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login/register.vue'),
    },
    {
        path:'/404',
        name:'404',
        component:()=> import('@/views/404')
    }
    //#region
    /* {
        path: '/',
        name: 'homPage',
        component: () => import('@/views/homePage'),
        children:[
            {
                path:"/",
                name:"homePage",
                redirect:"/studyPage"
            },
            {
                path:"/studypage",
                name:"studyPage",
                component: () => import("@/views/study/mainPage.vue")
            },
            {
                path:"/questionpage",
                name:"QuestionPage",
                component: () => import("@/views/study/mainPage.vue")
            },
            {
                path:"/discussionpage",
                name:"discussionPage",
                component: () => import("@/views/study/mainPage.vue")
            },
            {
                path:"/shoppage",
                name:"shopPage",
                component: () => import("@/views/shop/ShopLk.vue")
            },
            {
                path:"/goodsDetails",
                name:"goodsDertails",
                component: () => import("@/views/shop/shop_datails.vue")
            },
            {
                path: '/userinfo',
                name: 'userInfo',
                component: () => import('@/views/userInfo/userInfo.vue'),
            }
        ]
    }, */
    //#endregion
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
