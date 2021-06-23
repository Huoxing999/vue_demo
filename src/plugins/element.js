import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Footer, Menu, Submenu, MenuItem, Dialog, Radio,
  InputNumber, Cascader, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination,
  Tabs, TabPane, Divider, Carousel, CarouselItem, MessageBox, Select, Option, Badge, Popconfirm, Upload,
  // Notification,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // RadioGroup,
  // RadioButton,
  // Loading,
  // DatePicker,
  Autocomplete,
  Link,
  Progress
  // Avatar
} from 'element-ui'
// Vue.use(Loading)
// Vue.use(DatePicker)
Vue.use(Progress)
Vue.use(Autocomplete)
// Vue.use(Notification)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(RadioGroup)
// Vue.use(RadioButton)
// Vue.use(Avatar)
Vue.use(Link)
Vue.use(Upload)
Vue.use(Popconfirm)
Vue.use(Badge)
Vue.use(Option)
Vue.use(Select)
Vue.use(CarouselItem)
Vue.use(Carousel)
Vue.use(Divider)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Cascader)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
