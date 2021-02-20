// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';

// 右侧显示的组件
import DashboardPage from '../views/Dashboard/Dashboard';
import BookPage from '../views/Book/Book';
import AuthorPage from '../views/Author/Author';

// 路由内容
const RouteList = [
  // {
  //   path: '/dashboard',
  //   name: '仪表盘',
  //   icon: Dashboard,
  //   component: DashboardPage,
  // },
  {
    path: '/author',
    name: '作者管理',
    icon: Person,
    component: AuthorPage,
  },
  {
    path: '/book',
    name: '书籍管理',
    icon: LibraryBooks,
    component: BookPage,
  },
];

export default RouteList;
