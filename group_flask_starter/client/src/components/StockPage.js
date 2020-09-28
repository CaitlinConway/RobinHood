import React from "react"

export default function StockPage(props) {
    console.log(props)
    return `${props.match.params.stockId}`;
}
