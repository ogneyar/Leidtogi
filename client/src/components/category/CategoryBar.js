import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import CategoryService from '../../service/category/CategoryService'
import CategoryModal from './CategoryModal'

import './CategoryBar.css'


const CategoryBar = observer(() => {

    const [categoryVisible, setCategoryVisible] = useState(false)


    return (
        <div
            className="CategoryBar"
        >
            <div
                className="CategoryBarPC"
                id="CategoryBarPC"
            >
                <CategoryService />
            </div>

            <div
                className="CategoryBarMobile"
                id="CategoryBarMobile"
            >
                <label
                    onClick={() => setCategoryVisible(true)}
                >
                    Категории <i className="fa fa-bars" aria-hidden="true"></i>
                </label>
                
                <CategoryModal show={categoryVisible} onHide={() => setCategoryVisible(false)}/>

            </div>
        </div>
    )
})

export default CategoryBar
