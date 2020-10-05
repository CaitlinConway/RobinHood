import NewsItem from './NewsItem'
import React from "react";

const NewsFeed = (news) => {
  if (news['news'] !== undefined){
  return (
    <>
      <div id="news-feed-div">
      <h1 className = 'news-feed-title'>News</h1>
      <ul id="news-feed">
        {(news.news).slice(0,9).map((newsItem) => (
          <li key={news.news.indexOf(newsItem)}>
            <NewsItem newsItem={newsItem}></NewsItem>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
        }
    else {
      return (<>
      </>)
    }
};

export default NewsFeed;
