import { createRouter, createWebHistory } from "vue-router";
import LogInView from "../views/Auth/LogInView.vue";
import HomePageAdminView from "../views/Admin/HomePageAdminView.vue";
import NewsPageAdminView from "../views/Admin/NewsAdminView.vue";
import PlayerAdminView from "../views/Admin/PlayerAdminView.vue";
import SponsorsAdminView from "../views/Admin/SponsorsAdminView.vue";
import MatchesAdminView from "../views/Admin/MatchesAdminView.vue";
import ClubDetailsAdminView from "../views/Admin/ClubDetailsAdminView.vue";
import LoggedInLayout from '../views/Layout/LoggedInLayout';
import NotLoggedLayout from '../views/Layout/NotLoggedLayout';
import UserAdminView from "../views/Admin/UserAdminView.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/Landing-page",
      name: "LandingPage",
      component: NotLoggedLayout,
      children: [
        {
          path: "/login",
          component: LogInView,
        },
      ],
    },
    {
      path: "",
      component: LoggedInLayout,
      children: [
        {
          path: "/admin/Users",
          name: "User",
          component: UserAdminView,
        },
        {
          path: "/admin/Homepage",
          name: "Homepage",
          component: HomePageAdminView,
        },
        {
          path: "/admin/news",
          name: "News",
          component: NewsPageAdminView,
        },
        {
          path: "/admin/Players",
          name: "Players",
          component: PlayerAdminView,
        },
        {
          path: "/admin/matches",
          name: "Matches",
          component: MatchesAdminView,
        },
        {
          path: "/admin/sponsors",
          name: "Sponsors",
          component: SponsorsAdminView,
        },
        {
          path: "/admin/clubDetails",
          name: "ClubDetails",
          component: ClubDetailsAdminView,
        },
      ],
    },
  ],
});


router.beforeEach((to, from, next) => {
  const publicPages = [
    '/login',
    '/register',
    '/account/verify-email',
    '/account/forgot-password',
    '/account/reset-password',
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});


export default router;