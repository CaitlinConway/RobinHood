import React, {useEffect, useState} from "react";
import {LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from "recharts";
import StockPrice from "./StockPrice";

export default function StockPage({stockId}) {
    return (
      <div>
         ${stockId}
      </div>
    )
  }
