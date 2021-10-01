import Navbar from "./components/Navbar";
import "./App.css";
import { Layout, Space, Typography } from "antd";
import { Route, Switch } from "react-router";
import Exchanges from "./pages/Exchanges";
import CryptoCurrencies from "./pages/CryptoCurrencies";
import CryptoDetails from "./pages/CryptoDetails";
import News from "./pages/News";
import Homepage from "./pages/Homepage";
import { Link } from "react-router-dom";
import useScrollOnRouteChange from "./hooks/useScrollOnRouteChange";

function App() {
    useScrollOnRouteChange();

    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>

            <div className="main">
                <Layout>
                    <div className="routes">
                        <Switch>
                            <Route path="/exchanges" component={Exchanges} />
                            <Route
                                path="/cryptocurrencies"
                                component={CryptoCurrencies}
                            />
                            <Route
                                path="/crypto/:coinId"
                                component={CryptoDetails}
                            />
                            <Route path="/news" component={News} />
                            <Route exact path="/" component={Homepage} />
                        </Switch>
                    </div>
                </Layout>

                <div className="footer">
                    <Typography.Title
                        level={5}
                        style={{ color: "white", textAlign: "center" }}
                    >
                        CryptoChain
                        <br />
                        All rights reserved
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/exchanges">Exchanges</Link>
                        <Link to="/news">News</Link>
                    </Space>
                </div>
            </div>
        </div>
    );
}

export default App;
