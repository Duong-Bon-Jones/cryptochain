import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetCryptosQuery } from "../services/cryptoApi";

const CryptoCurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;

    const { data, isFetching } = useGetCryptosQuery(count);

    const [searchTerm, setSearchTerm] = useState("");

    // ! Way 2
    // const [cryptosList, setCryptosList] = useState([]);
    // useEffect(() => {
    //     const filteredData = data?.data?.coins.filter((c) =>
    //         c.name.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setCryptosList(filteredData);
    // }, [data, searchTerm]);
    // end of way 2

    if (isFetching) {
        return <Loader />;
    }

    // ! Way 1
    let cryptosList = data.data.coins.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        value={searchTerm}
                        placeholder="Search Cryptocurrency"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptosList?.map((c) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                        key={c.id}
                    >
                        <Link to={`/crypto/${c.id}`}>
                            <Card
                                title={`${c.rank}. ${c.name}`}
                                hoverable
                                extra={
                                    <img
                                        className="crypto-image"
                                        src={c.iconUrl}
                                        alt="currency icon"
                                    />
                                }
                            >
                                <p>Price: {millify(c.price)}</p>
                                <p>Market Cap: {millify(c.marketCap)}</p>
                                <p>Daily Change: {millify(c.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default CryptoCurrencies;
