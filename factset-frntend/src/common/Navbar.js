import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';

const { Header } = Layout;
const { SubMenu } = Menu;
const Navbar = withRouter(props => {
    const { location } = props;
    const { t, i18n } = useTranslation();
    const changeLanguage = lng => {
        i18n.changeLanguage(lng.key);
    }
    return (
        <Header >
            <div className="logo" />
            <Menu theme="dark" selectedKeys={[location.pathname]} mode="horizontal">
                <Menu.Item key="/">
                    <Link className="nav-text" to='/'>
                        <span>
                            {t('navbar:Converter')}
                        </span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/setting">
                    <Link className="nav-text" to='/setting'>
                        <span>
                            {t('navbar:Setting')}
                        </span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/insight">
                    <Link className="nav-text" to='/insight'>
                        <span>
                            {t('navbar:Insight')}
                        </span>
                    </Link>
                </Menu.Item>

                <SubMenu
                    key="subLanguage"
                    title={
                        <span>
                            <CaretDownOutlined />
                            <span>{t('navbar:Language')}</span>
                        </span>
                    }
                >
                    <Menu.Item onClick={changeLanguage} key="en">{t('navbar:English')}</Menu.Item>
                    <Menu.Item onClick={changeLanguage} key="de">{t('navbar:German')}</Menu.Item>
                </SubMenu>

            </Menu>
        </Header>
    )
})
export default Navbar;