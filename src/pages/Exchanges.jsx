import { Avatar, Table } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import Loader from "../components/Loader";
import { useGetCryptosExchangeQuery } from "../services/cryptoApi";

const Exchanges = () => {
    const { data: exchangeData, isFetching } = useGetCryptosExchangeQuery();

    if (isFetching) {
        return <Loader />;
    }

    const columns = [
        { title: "Exchanges", dataIndex: "exchanges" },
        { title: "24h Trade Volume", dataIndex: "volume" },
        { title: "Markets", dataIndex: "markets" },
        { title: "Market Share", dataIndex: "marketShare" },
    ];

    const data = exchangeData?.data?.exchanges?.map((coin) => ({
        key: coin.rank,
        exchanges: `${coin.rank}. ${coin.name}`,
        volume: millify(coin.volume),
        markets: coin.numberOfMarkets,
        marketShare: `${millify(coin.marketShare)} %`,
        description: HTMLReactParser(
            coin.description || "There is no description available."
        ),
    }));

    return (
        <>
            <Table
                expandRowByClick={true}
                sticky={true}
                pagination={false}
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => (
                        <div>{record.description}</div>
                    ),
                    expandIconColumnIndex: -1,
                }}
                dataSource={data}
            />
        </>
    );
};

export default Exchanges;
