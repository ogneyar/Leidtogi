import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

import Category from '../../components/admin/Category'
import Brand from '../../components/admin/Brand'
import Product from '../../components/admin/Product'
import DeleteSite from '../../components/admin/DeleteSite'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'

import './AdminPage.css';


const Admin = observer(() => {
    
    const { product, category, brand } = useContext(Context)

    const history = useHistory()

    useEffect(() => {
    },[])

    useEffect(() => {
        if (product.allProducts.length) {
            product.setProducts(product.allProducts)
            product.setTotalCount(product.allProducts.length)
        }
    },[product.allProducts])

    useEffect(() => {
        if (category.allCategories.length) {
            category.setCategories(category.allCategories)
            category.setSelectedCategory({})
        }
    },[category.allCategories])

    useEffect(() => {
        if (brand.allBrands.length) {
            brand.setBrands(brand.allBrands)
            brand.setSelectedBrand({})
        }
    },[brand.allBrands])

    const [categoryVisible, setCategoryVisible] = useState(false)
    const [brandVisible, setBrandVisible] =  useState(false)
    const [productVisible, setProductVisible] = useState(false)
    
    const [deleteSiteVisible, setDeleteSiteVisible] = useState(false)

    return (
        <Container className="Content d-flex flex-column Admin Mobile">
            <Button 
                variant={"outline-dark"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setProductVisible(true)}
            >
                Редактор продукции
            </Button>

            <Button 
                variant={"outline-dark"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setCategoryVisible(true)}
            >
                Редактор категорий
            </Button>

            <Button 
                variant={"outline-dark"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setBrandVisible(true)}
            >
                Редактор брендов
            </Button>

            {/* <Button 
                variant={"outline-dark"} 
                className="m-3 p-2 Admin_button"
                onClick={() => history.push("/parser")}
            >
                Парсер
            </Button> */}

            <hr/>

            <Button 
                variant={"outline-danger"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setDeleteSiteVisible(true)}
            >
                Удалить САЙТ!!!
            </Button>
            
            <Product show={productVisible} onHide={() => setProductVisible(false)}/>
            <Category show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <Brand show={brandVisible} onHide={() => setBrandVisible(false)}/>

            <DeleteSite show={deleteSiteVisible} onHide={() => setDeleteSiteVisible(false)}/>
            
        </Container>
    )
})

export default Admin
