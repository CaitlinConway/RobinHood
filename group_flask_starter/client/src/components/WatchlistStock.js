import React, {useEffect, useState} from "react";
import {LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from "recharts";
import StockPrice from "./StockPrice";

export default function StockPage({stock}) {
    return (
    <>
    <div className = 'individual-watchlist-div'>
      <p>{stock}</p>
      <p>$100</p>
      </div>
    </>
    )
  }
