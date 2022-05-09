import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../../node_modules/axios/index.js';
import usePromise from '../lib/usePromise.js';
import NewsItem from './NewsItem.js';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=3cc3e17d03d94507866d1214a4209520`,
    );
  }, [category]);

  //대기중일때
  if (loading) {
    return <NewsListBlock>로딩 중 ...</NewsListBlock>;
  }
  // 아직 article 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }
  if (error) {
    return <NewsListBlock>에러발생!</NewsListBlock>;
  }
  //response 값이 유효할때
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
