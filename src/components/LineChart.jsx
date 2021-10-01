import { Col, Row, Typography } from "antd";
import { Line } from "react-chartjs-2";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinHistoryData = coinHistory?.data;
    const coinPrice = [];
    const coinTimeStamp = [];

    for (let i = 0; i < coinHistoryData?.history?.length; i++) {
        coinPrice.push(coinHistoryData.history[i].price);
        coinTimeStamp.push(
            new Date(coinHistoryData.history[i].timestamp).toLocaleDateString()
        );
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd",
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <Row className="chart-header">
                <Title className="chart-title" level={2}>
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        {coinHistoryData?.change}%
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price: ${currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
