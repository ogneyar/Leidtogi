import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchCategories, deleteCategory, createCategory, updateCategory } from '../http/categoryAPI'
import CategoryAddService from './CategoryAddService'


const CategoryService = observer(({information, idName, offset, sub_id}) => {
    
    const { category } = useContext(Context)
    const [info, setInfo] = useState(information)
    // const [value, setValue] = useState('')

    useEffect(() => {
        // if (information) setInfo(information)
    },[])


    const updateInfo = (sub, data, information = info) => {
        if (sub === 0)  {
            if (information === info)
                setInfo([...information, data])
            else if (information === category.categories) 
                category.setCategories([...information, data])
        }else {
            if (information === info)
                setInfo(information.map(i => {                    
                    return funcMap(i, sub, data)
                }))
            else if (information === category.categories) 
                category.setCategories(information.map(i => {                    
                    return funcMap(i, sub, data)
                }))
        }
        function funcMap(i, sub, data) {
            if (i.id === sub) {
                if (i.sub === undefined){
                    return {...i, sub:data}
                }else {
                    return {...i, sub:[...i.sub, data]}
                }
            }else if (i.sub !== undefined) {
                return {...i, sub:i.sub.map(k => {
                    return funcMap(k, sub, data)
                })}
            }else return i
        }
    }
    
        
    const delCategory = async (id, name) => {
        let yes = window.confirm(`Вы уверены, что хотите удалить категорию ${name}?`)
        if (yes) {
            await deleteCategory(id)
            
            category.setCategories(
                funcFilter(category.categories, id)
            )
            // console.log("category.categories", category.categories)

            setInfo(
                funcFilter(info, id)
            )
            // console.log("info", info)
        }
        // onHide()
    }

    function funcFilter(array, id) {
        return array.filter(i => {
            if (i.sub !== undefined) {
                funcFilter(i.sub, id)
                return true
            }else if (i.id !== id){
                return true
            }
            return false
        })
    }
    

    const editCategory = (id) => {

        let elementCategory = document.getElementById(idName + id)
        elementCategory.readOnly = false
        elementCategory.style.cursor = "text"

        let elementButton = document.getElementById("button_" + id)
        elementButton.style.display = "none"

        let elementWarningButton = document.getElementById("button_warning_" + id)
        elementWarningButton.style.display = "flex"

    }

    const editCategoryApply = async (id) => {

        let elementCategory = document.getElementById(idName + id)
        let newName = elementCategory.value
        elementCategory.style.cursor = "pointer"
        elementCategory.readOnly = true


        let elementButton = document.getElementById("button_" + id)
        elementButton.style.display = "flex"

        let elementWarningButton = document.getElementById("button_warning_" + id)
        elementWarningButton.style.display = "none"

        
        await updateCategory(id, newName)
    }

    const openSubCategory = async (id) => {
        fetchCategories(id).then(data => {
            if (data.length > 0) {
                category.setCategories(category.categories.map(i => i.id === id ? {...i, sub:data} : i))
                setInfo(info.map(i => i.id === id ? {...i, sub:data} : i))
            }
        })
    }

    const toggleSubCategory = async (id) => {
        let element = document.getElementById("sub_" + idName + id)
        if (element.style.display === "flex") {
            element.style.display = "none"
        }else if (element.style.display === "none"){
            openSubCategory(id)
            element.style.display = "flex"
        }
    }

    
    return (
    <div
        className={offset === null ? "" : "ml-4"}
    >
        <div>
            {info && info.map(i => 
                <Row
                    className='mt-4'
                    key={i.id}
                >
                    <Col md={5}>
                        <Form.Control 
                            className='mt-1'
                            style={{cursor:'pointer'}}
                            value={i.name}
                            // disabled={true}
                            readOnly={true}
                            id={idName + i.id}
                            onChange={e => {
                                setInfo(info.map(k => i.id === k.id ? {...k, name:e.target.value} : k))
                            }}
                            onClick={e => {
                                toggleSubCategory(i.id)
                            }}
                            title="Показать подкатегории"
                        />
                    </Col>
                    
                    <Col md={3}>
                        <Button
                            variant="outline-primary"
                            onClick={() => editCategory(i.id)}
                            className='mt-1'
                            id={"button_" + i.id}
                        >
                            Изменить...
                        </Button>

                        <Button
                            variant="outline-warning"
                            onClick={() => editCategoryApply(i.id)}
                            style={{display:"none"}}
                            className='mt-1'
                            id={"button_warning_" + i.id}
                        >
                            Применить
                        </Button>
                    </Col>

                    <Col md={3}>
                        <Button
                            variant="outline-danger"
                            onClick={() => delCategory(i.id, i.name)}
                            className='mt-1'
                        >
                            Удалить
                        </Button>
                    </Col>


                    {/* изначально не видимая форма для добавления подкатегории */}
                    <div 
                        id={"sub_"+ idName + i.id}
                        style={{display:"none"}}
                        className="flex-column "
                    >
                        {i.sub !== undefined 
                        ?
                            <CategoryService information={i.sub} idName={"sub_"+idName} sub_id={i.id} />
                        : 
                            <CategoryAddService sub_id={i.id} updateInfo={(sub, data) => updateInfo(sub, data)} />

                            // <div />
                        }
                    </div>

                </Row>

            )}
        </div>

        <CategoryAddService sub_id={sub_id} offset={null} updateInfo={(sub, data) => updateInfo(sub, data)} />

    </div>
                
    )
})

export default CategoryService
