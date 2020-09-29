import React from "react";

class StockPrice extends React.Component {
    constructor(props) {
        this.state = {price: 0}
    }

    componentDidMount() {
        this.setState({price: this.props.price})
    }
}

export default StockPrice
