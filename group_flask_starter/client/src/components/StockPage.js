import React, {useEffect} from "react"

export default function StockPage(props) {
    let ticker = props.match.params.stockId;
    useEffect(()=> {
        async function getStock() {
            const res = await fetch(`/api/stocks/${ticker}`);
            const data = await res.json();
            console.log(data);
            return data;
        }
        getStock()
    }, [ticker])



    return `${props.match.params.stockId}`;
}
