import React from "react";

class StockPrice extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
      return (
            // <div className="stock-price-container">
            <>
                <div className="stock-name">{this.props.name}</div>
                <div className="stock-price">{"$" + this.props.price}</div>
                {/* <div className="stock-return">{`+$${stockData[0].closing - stockData[stockData.length - 1].closing} (+106.48%) Past Year`}</div> */}
                 {/* </div> */}
            </>

      )
    }
}

export default StockPrice
