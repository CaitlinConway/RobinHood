import React from "react";

class StockPrice extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        let percent = Math.round(((this.props.price - this.props.first)/this.props.first)*100)
        let value = this.props.price - this.props.first
        let sign = value > 0 ? "+" : "-"
        return (
                <>
                    <div className="stock-name">{this.props.name}</div>
                    <div className="stock-price">{"$" + this.props.price}</div>
                    <div className="stock-return" style={{ color: value > 0 ? "#03C805" : "#FF5103"}}>
                        {`${sign}$${Math.abs(value.toFixed(2))} (${sign}${Math.abs(percent)}%) `}
                    </div>
                    {/* </div> */}
                </>

        )
    }
}

export default StockPrice;
