import Vue from 'vue'
import { SubmitBar } from 'vant';
import { Field } from 'vant';
import { NoticeBar } from 'vant';
import { Picker } from 'vant';
import { Sticky } from 'vant';
import { Grid, GridItem } from 'vant';
import { Step, Steps } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { Image as VanImage } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Calendar } from 'vant';
import { AddressEdit } from 'vant';
import { popup } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Stepper } from 'vant';
import { Card } from 'vant';
import { Radio } from 'vant';
import { Toast } from 'vant';
import { Form } from 'vant';
import { AddressList } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Panel } from 'vant';
import { Uploader } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Tag } from 'vant';
import { Button } from 'vant';
import { Divider } from 'vant';
import { Tab, Tabs } from 'vant';
import { ContactCard } from 'vant';
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'
import GroupOrder from '@/components/pages/GroupOrder'
import Order from '@/components/pages/Order'
import oldOrder from '@/components/pages/oldOrder'
import HistoryOrder from '@/components/pages/HistoryOrder'
import OrderBody from '@/components/pages/OrderBody'
import serviceOrder from '@/components/pages/serviceOrder'
import otherOrder from '@/components/pages/otherOrder'
import bookOrder from '@/components/pages/bookOrder'
import OrderS from '@/components/pages/OrderS'



Vue.use(Router).use(SubmitBar)
Vue.use(Field)
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(AddressList);
Vue.use(Toast);
Vue.use(NoticeBar)
Vue.use(Card);
Vue.use(Tag);
Vue.use(Radio);
Vue.use(ContactCard);
Vue.use(Picker);
Vue.use(Calendar);
Vue.use(Button);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Divider);
Vue.use(Panel);
Vue.use(popup);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Grid);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(GridItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Stepper);
Vue.use(Sticky);
Vue.use(AddressEdit);
Vue.use(Uploader);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(VanImage);
Vue.use(Form);

// 123

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            { path: '/', name: 'shoppingMall', component: ShoppingMall },
            { path: '/categoryList', name: 'CategoryList', component: CategoryList },
            { path: '/cart', name: 'Cart', component: Cart },
            { path: '/member', name: 'Member', component: Member },

        ]
    },
    { path: '/groupOrder', name: 'GroupOrder', component: GroupOrder },
    { path: '/order', name: 'Order', component: Order },
    { path: '/oldOrder', name: 'oldOrder', component: oldOrder },
    { path: '/historyOrder', name: 'Address', component: HistoryOrder },
    { path: '/orderBody', name: 'OrderBody', component: OrderBody },
    // { path: '/OrderBody', name: 'OrderBody', component: OrderBody },
    { path: '/otherOrder', name: 'otherOrder', component: otherOrder },
    { path: '/bookOrder', name: 'bookOrder', component: bookOrder },
    { path: '/serviceOrder', name: 'serviceOrder', component: serviceOrder },
    { path: '/orderS', name: 'OrderS', component: OrderS },
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/goods', name: 'Goods', component: Goods },
    ]
})