import React from "react";

export default function NewsItem({newsItem}) {
    return (
    <div id={'news-item'}>
      <div id={'news-source'}>{newsItem.source}</div>
      <div id={'news-headline'}>{newsItem.headline}</div>
      <div id={'news-summary'}>{newsItem.summary}</div>
      <img id={'news-image'} src={newsItem.image} alt=""/>
    </div>
    )
  }
