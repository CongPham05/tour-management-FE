import React, { useEffect, useContext, useRef } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Header.css'
import { AuthContext } from './../../context/AuthContext'



const nav__links = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/tours',
        display: 'Tours'
    },
    {
        path: '/about',
        display: 'About'
    },
]

const Header = () => {
    const headerRef = useRef(null)
    const menuRef = useRef(null)
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
    }

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            // ở một số trình duyệt,
            // thuộc tính scrollTop được lưu trữ ở đối tượng documentElement, 
            //và không được hỗ trợ trên document.body. Vì vậy ktra cả 2
            if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                headerRef.current.classList.add('sticky__header')
            }
            else {
                headerRef.current.classList.remove('sticky__header')
            }

        })
    }

    useEffect(() => {
        stickyHeaderFunc()
        //loại bỏ event listener, 
        // mỗi khi component được render lại, một event listener mới sẽ được đăng ký 
        //và event listener cũ vẫn không bị gỡ bỏ
        return window.removeEventListener('scroll', stickyHeaderFunc)
    })

    const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

    return (
        <header className='header' ref={headerRef}>
            <Container>
                <Row>
                    <div className='nav__wrapper d-flex algin-items-center justify-content-between'>
                        {/**___________logo_________________ */}
                        <div className='logo'>
                            <img src={logo} alt='' />
                        </div>
                        {/**___________logo end_____________ */}

                        {/**___________Menu start_____________ */}

                        <div className='navigation' ref={menuRef} onClick={toggleMenu}>
                            <ul className='menu d-flex align-items-center gap-5'>
                                {
                                    nav__links.map((item, index) => (
                                        <li className='nav__item' key={index}>
                                            <NavLink to={item.path}
                                                //className={navClass => navClass.isActive ? 'active__link' : ""}>
                                                className={({ isActive }) => isActive ? 'active__link' : ''}>
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        {/**___________Menu end_____________ */}
                        <div className='nav__right d-flex align-items-center gap-4'>
                            <div className='nav__btn d-flex align-items-center gap-4 '>
                                {
                                    user ?
                                        <>
                                            <h5 className='mb-0'>Hello,{user.username}</h5>
                                            <Button className='btn btn-dark ' onClick={logout}>Logout</Button>
                                        </> :
                                        <>
                                            <Button className='btn secondary__btn'>
                                                <Link to='/login' >Login</Link>
                                            </Button>
                                            <Button className='btn primary__btn'>
                                                <Link to='/register' >Register</Link>
                                            </Button>
                                        </>
                                }
                            </div>
                            <span className='mobile__menu' onClick={toggleMenu}>
                                <i className="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    )
}

export default Header



