import { Typography, Select, Row, Col, Card, Avatar } from "antd";
import moment from "moment";
import { useState } from "react";
import Loader from "../components/Loader";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
    const { data: cryptosList } = useGetCryptosQuery(100);

    const { data, isFetching } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 12,
    });

    const selectHandler = (v) => {
        setNewsCategory(v);
    };

    const { Text, Title } = Typography;
    const { Option } = Select;

    const defaultImg =
        "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

    if (isFetching) {
        return <Loader />;
    }

    const newsList = data.value;

    return (
        <>
            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a crypto"
                            optionFilterProp="children"
                            onChange={selectHandler}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLocaleLowerCase()) >= 0
                            }
                        >
                            <Option value="Cryptocurrency">
                                Cryptocurrency
                            </Option>
                            {cryptosList?.data?.coins.map((c) => (
                                <Option key={c.name} value={c.name}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                )}
                {newsList?.map((n, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card className="news-card" hoverable>
                            <a rel="noreferrer" target="_blank" href={n.url}>
                                <div className="news-image-container">
                                    <Title level={4} className="news-title">
                                        {n.name}
                                    </Title>
                                    <img
                                        style={{ objectFit: "contain" }}
                                        src={
                                            n.image?.thumbnail?.contentUrl ||
                                            defaultImg
                                        }
                                        alt="news"
                                    />
                                </div>
                                <p>
                                    {n.description.length > 100
                                        ? `${n.description.substring(
                                              0,
                                              100
                                          )}...`
                                        : n.description}
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar
                                            src={
                                                n.provider[0]?.image?.thumbnail
                                                    ?.contentUrl || defaultImg
                                            }
                                        />
                                        <Text className="provider-name">
                                            {n.provider[0]?.name}
                                        </Text>
                                    </div>
                                    <Text>
                                        {moment(n.datePublished)
                                            .startOf("seconds")
                                            .fromNow()}
                                    </Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default News;
