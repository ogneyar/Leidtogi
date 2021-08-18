import Admin from '../pages/Admin'
import CartPage from '../pages/cart/CartPage'
import Shop from '../pages/shop/Shop'
import Auth from '../pages/Auth'
import ProductPage from '../pages/product/ProductPage'
import Lk from '../pages/lk/Lk'
import SearchPage from '../pages/search/SearchPage'
import Error from '../components/Error'

import AboutUs from '../pages/informations/AboutUs'
import Delivery from '../pages/informations/Delivery'
import Payment from '../pages/informations/Payment'
import PrivacyPolicy from '../pages/informations/PrivacyPolicy'
import ReturnsPolicy from '../pages/informations/ReturnsPolicy'
import TermsOfUse from '../pages/informations/TermsOfUse'
import Warranty from '../pages/informations/Warranty'
import Contacts from '../pages/informations/Contacts'
import Specials from '../pages/informations/Specials'

import Delete from '../pages/site/Delete'

import {
    ADMIN_ROUTE, CART_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, 
    PRODUCT_ROUTE, LK_ROUTE, SEARCH_ROUTE, ERROR_ROUTE, ABOUT_US_ROUTE, 
    DELIVERY_ROUTE, PAYMENT_ROUTE, PRIVACY_POLICY_ROUTE, RETURNS_POLICY_ROUTE, 
    TERMS_OF_USE_ROUTE, WARRANTY_ROUTE, CONTACTS_ROUTE, SPECIALS_ROUTE, DELETE_ROUTE
} from './consts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: LK_ROUTE,
        Component: Lk
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: SEARCH_ROUTE,
        Component: SearchPage
    },
    {
        path: ERROR_ROUTE,
        Component: Error
    },
    
    // отдел Информация
    {
        path: ABOUT_US_ROUTE,
        Component: AboutUs
    },
    {
        path: DELIVERY_ROUTE,
        Component: Delivery
    },
    {
        path: PAYMENT_ROUTE,
        Component: Payment
    },
    {
        path: PRIVACY_POLICY_ROUTE,
        Component: PrivacyPolicy
    },
    {
        path: RETURNS_POLICY_ROUTE,
        Component: ReturnsPolicy
    },
    {
        path: TERMS_OF_USE_ROUTE,
        Component: TermsOfUse
    },
    {
        path: WARRANTY_ROUTE,
        Component: Warranty
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: SPECIALS_ROUTE,
        Component: Specials
    },

     // юмор It отдела
    {
        path: DELETE_ROUTE,
        Component: Delete
    },

    // роут категорий - /nazvanie-kategorii
    {
        path: '/:name',
        Component: Shop
    }
]