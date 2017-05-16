import React from 'react';
import { Link } from 'react-router';
import '../../public/styles/Header.css';

const MenuItem = ({active, children, to}) => (
    <Link to={to} className={`menu-item ${active ? 'active': ''}`}>
            {children}
    </Link>
);

const Header = (props, context) => {
    const { router } = context;
    return (
        <div>
            <div className="logo">
                velopert
            </div> 
            <div className="menu">
                <MenuItem to={'/'} active={router.isActive('/', true)}>홈</MenuItem>
                <MenuItem to={'/movie/choose'} active={router.isActive('/movie/choose')}>영화</MenuItem>
                <MenuItem to={'/movie/favorite'} active={router.isActive('/movie/favorite')}>선택한 영화</MenuItem>
                <MenuItem to={'/post'} active={router.isActive('/post')}>포스트</MenuItem>
            </div>
        </div>
    );
};

Header.contextTypes = {
    router: React.PropTypes.object
}

export default Header;