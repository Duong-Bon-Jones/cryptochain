import { Avatar, Button, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import icon from "../images/cryptocurrency.png";
import {
    BulbOutlined,
    FundOutlined,
    HomeOutlined,
    MenuOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    const location = useLocation();
    let key;

    if (location.pathname.includes("/crypto")) {
        key = "2";
    } else {
        switch (location.pathname) {
            case "/exchanges":
                key = "3";
                break;
            case "/news":
                key = "4";
                break;
            default:
                key = "1";
                break;
        }
    }

    useEffect(() => {
        const resizeHandler = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    useEffect(() => {
        if (screenSize <= 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">CryptoChain</Link>
                </Typography.Title>
                <Button
                    className="menu-control-container"
                    onClick={() => setActiveMenu((prev) => !prev)}
                >
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu selectedKeys={[key]} theme="dark">
                    <Menu.Item key={1} icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key={2} icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">CryptoCurrencies</Link>
                    </Menu.Item>
                    <Menu.Item key={3} icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item key={4} icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    );
};

export default Navbar;