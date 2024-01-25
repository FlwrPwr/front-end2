import { createRouter, createWebHistory } from "vue-router";
import LogInView from "../views/Auth/LogInView.vue";
import HomePageAdminView from "../views/Admin/HomePageAdminView.vue";
import NewsPageAdminView from "../views/Admin/NewsAdminView.vue";
import PlayerAdminView from "../views/Admin/PlayerAdminView.vue";
import SponsorsAdminView from "../views/Admin/SponsorsAdminView.vue";
import MatchesAdminView from "../views/Admin/MatchesAdminView.vue";
import ClubDetailsAdminView from "../views/Admin/ClubDetailsAdminView.vue";
import UserAdminView from '../views/Admin/UserAdminView';
import LoggedInLayout from '../views/Layout/LoggedInLayout';
import NotLoggedLayout from '../views/Layout/NotLoggedLayout';
import VerifyEmailView from '../views/Auth/VerifyEmail';

//user
import SponsorsUserView from "../views/User/SponsorsUserView.vue";
import ClubDetailsUserView from "../views/User/ClubDetailsUserView.vue";
import HomePageUserView from "../views/User/HomePageUserView.vue";
import MatchesUserView from "../views/User/MatchesUserView.vue";
import NewsPageUserView from "../views/User/NewsUserView.vue";
import PlayerUserView from "../views/User/PlayerUserView.vue";

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
        {
          path: "/account/verify-email",
          name: "VerifyEmail",
          component: VerifyEmailView,
        },
      ],
    },
    {
      path: "",
      component: LoggedInLayout,
      children: [
        {
          path:"/admin/User",
          name: 'Users',
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
        //user
        {
          path: "/sponsors",
          name: "SponsorsUser",
          component: SponsorsUserView,
        },
        {
          path: "/clubDetailsUser",
          name: "ClubDetailsUser",
          component: ClubDetailsUserView,
        },
        {
          path: "/Homepage",
          name: "HomepageUser",
          component: HomePageUserView,
        },
        {
          path: "/matches",
          name: "MatchesUser",
          component: MatchesUserView,
        },
        {
          path: "/news",
          name: "NewsUser",
          component: NewsPageUserView,
        },
        {
          path: "/Players",
          name: "PlayersUser",
          component: PlayerUserView,
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
    '/sponsors',
    '/clubDetailsUser',
    '/Homepage',
    '/news',
    '/Players',

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