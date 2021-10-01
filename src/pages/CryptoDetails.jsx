import {
    CheckOutlined,
    DollarCircleOutlined,
    ExceptionOutlined,
    ExclamationCircleOutlined,
    FundOutlined,
    MoneyCollectOutlined,
    NumberOutlined,
    StopOutlined,
    ThunderboltOutlined,
    TrophyOutlined,
} from "@ant-design/icons";
import { Typography, Select, Col, Row } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useState } from "react";
import { useParams } from "react-router";
import LineChart from "../components/LineChart";
import Loader from "../components/Loader";
import {
    useGetCryptosDetailsQuery,
    useGetCryptosHistoryQuery,
} from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const [timePeriod, setTimePeriod] = useState("7d");
    const { coinId } = useParams();
    const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
    const cryptoDetails = data?.data?.coin;
    const { data: coinHistory } = useGetCryptosHistoryQuery({
        coinId,
        timePeriod,
    });

    const selectHandler = (v) => {
        setTimePeriod(v);
    };

    const time = ["24h", "7d", "30d", "1y", "5y"];

    if (isFetching) {
        return <Loader />;
    }

    const stats = [
        {
            title: "Price to USD",
            value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
            icon: <DollarCircleOutlined />,
        },
        { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
        {
            title: "24h Volume",
            value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
            icon: <ThunderboltOutlined />,
        },
        {
            title: "Market Cap",
            value: `$ ${
                cryptoDetails.marketCap && millify(cryptoDetails.marketCap)
            }`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: "All-time-high(daily avg.)",
            value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
            icon: <TrophyOutlined />,
        },
    ];

    const genericStats = [
        {
            title: "Number Of Markets",
            value: cryptoDetails.numberOfMarkets,
            icon: <FundOutlined />,
        },
        {
            title: "Number Of Exchanges",
            value: cryptoDetails.numberOfExchanges,
            icon: <MoneyCollectOutlined />,
        },
        {
            title: "Approved Supply",
            value: cryptoDetails.approvedSupply ? (
                <CheckOutlined />
            ) : (
                <StopOutlined />
            ),
            icon: <ExceptionOutlined />,
        },
        {
            title: "Total Supply",
            value: `$ ${millify(cryptoDetails.totalSupply)}`,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Circulating Supply",
            value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
            icon: <ExclamationCircleOutlined />,
        },
    ];

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails.name} ({cryptoDetails.slug}) Price
                </Title>
                <p>
                    {cryptoDetails.name} live price in USD. View value,
                    statistics, market cap and supply.
                </p>
            </Col>
            <Select
                defaultValue="7d"
                className="select-timeperiod"
                placeholder="Select Time Period"
                onChange={selectHandler}
            >
                {time.map((d) => (
                    <Option value={d} key={d}>
                        {d}
                    </Option>
                ))}
            </Select>

            <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(cryptoDetails.price)}
                coinName={cryptoDetails.name}
            />

            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title className="coin-details-heading" level={3}>
                            {cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the stats of{" "}
                            {cryptoDetails.name}
                        </p>
                    </Col>
                    {stats.map((c, i) => (
                        <Col className="coin-stats" key={i}>
                            <Col className="coin-stats-name">
                                <Text>{c.icon}</Text>
                                <Text>{c.title}</Text>
                            </Col>
                            <Text className="stats">{c.value}</Text>
                        </Col>
                    ))}
                </Col>

                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title className="coin-details-heading" level={3}>
                            Other Statistics
                        </Title>
                        <p>
                            An overview showing the stats of all
                            cryptocurrencies
                        </p>
                    </Col>
                    {genericStats.map((c, i) => (
                        <Col className="coin-stats" key={i}>
                            <Col className="coin-stats-name">
                                <Text>{c.icon}</Text>
                                <Text>{c.title}</Text>
                            </Col>
                            <Text className="stats">{c.value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>

            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title className="coin-details-heading" level={3}>
                        What is {cryptoDetails.name}?
                        <div>{HTMLReactParser(cryptoDetails.description)}</div>
                    </Title>
                </Row>
                <Col className="coin-links">
                    <Title className="coin-details-heading" level={3}>
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map((l, i) => (
                        <Row className="coin-link" key={i}>
                            <Title className="link-name" level={5}>
                                {l.type}
                            </Title>
                            <a rel="noreferrer" href={l.url} target="_blank">
                                {l.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};

export default CryptoDetails;
