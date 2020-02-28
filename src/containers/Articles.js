import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Layout } from 'antd';

import { Footer, DataTable } from '../core';

import { searchArticles, getArticles } from '../redux';

const { Header, Content } = Layout;
const { Search } = Input;

const Articles = ({ searchArticles, articles, history }) => (
  <Layout>
    <Header>
      <Search
        placeholder="Search Article..."
        onSearch={value => {
          if (value && value !== '') {
            searchArticles(value);
          }
        }}
        enterButton
      />
    </Header>
    <Content>
      {articles.error && (
        <span className="error">Something went wrong try again later!</span>
      )}
      <DataTable dataSet={articles} history={history} />
    </Content>
    <Footer />
  </Layout>
);

const mapStateToProps = state => ({
  articles: getArticles(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    { searchArticles }
  )(Articles)
);
