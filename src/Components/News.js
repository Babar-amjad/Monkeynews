
import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // const updateNews = async () => {
  //   props.setProgress(10);
  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5e93e41699c54e42bc4f0652a2b12820&page=${page}&pagesize=${props.pageSize}`;
  //   setLoading(true);
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   setArticles(parseData.articles);
  //   setTotalResults(parseData.totalResults);
  //   setLoading(false);
  //   props.setProgress(100);
  // };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    const updateNews = async () => {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5e93e41699c54e42bc4f0652a2b12820&page=${page}&pagesize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles(parseData.articles);
      setTotalResults(parseData.totalResults);
      setLoading(false);
      props.setProgress(100);
    };
  
    Promise.all([updateNews()]).catch((err) => {
      console.log("error " + err);
    });
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   Promise.all(updateNews()).catch((err) => {
  //     // Promise.all(_getTiers()).catch((err) => {
  //     console.log("error " + err)
  //   });
  // }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5e93e41699c54e42bc4f0652a2b12820&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  return (
    <div className="container my-3">
      <div className="text-center" style={{ margin: '45px 0px',marginTop:"100px" }}>
        <h1>Monkeynews -Top headline on {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner />}
      </div>
      <InfiniteScroll
        dataLength={articles?.length}
        next={fetchMoreData}
        hasMore={articles?.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 71) : ''}
                  description={element.description ? element.description.slice(0, 88) : ''}
                  imageurl={element.urlToImage}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  name: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  name: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
