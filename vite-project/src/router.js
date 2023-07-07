
import {VueRouter} from 'vue-router'
import Basket from './pages/cardBasket.vue'
import PageCard from './pages/pageCard.vue';
import ProductList from './pages/productList.vue';


const router = new VueRouter({
    routes: [
        { 
          path: 'basket',
          component: Basket,
        },
        {
          path: 'page_card',
          component: PageCard,
        },
        {
          path: 'product_list',
          component: ProductList,
        }
      ],
});

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: [
//     { 
//       path: ROUTES.BASKET,
//       component: () => import('./pages/cardBasket.vue'),
//     },
//     {
//       path: ROUTES.PAGE_CARD,
//       component: () => import('./pages/todos/pageCard.vue')
//     },
//     {
//       path: ROUTES.PRODUCT_LIST,
//       component: () => import('./pages/todos/productList.vue')
//     }
//   ],
// });

// router.beforeEach((to, from, next) => {
//   const pb = inject(PROVIDE.PB);
//   const publicPages = [ROUTES.INDEX, ROUTES.SIGNIN];
//   const notAllowedNavigation =
//       publicPages.indexOf(to.path) < 0
//       && !pb.authStore.isValid;

//   console.log('> router -> beforeEach', to.path, {notAllowedNavigation});

//   if (notAllowedNavigation) {
//     next({path: ROUTES.SIGNIN});
//   } else next();
// });

export default router;