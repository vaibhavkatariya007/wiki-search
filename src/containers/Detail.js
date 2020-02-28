import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import { Layout, Icon } from 'antd';


import { Loading, Footer } from '../core';
import { fetchDetails, getDetails } from '../redux';

import 'antd/dist/antd.css';

const { Header, Content } = Layout;

class Detail extends Component {
  componentDidMount() {
    const {
      fetchDetails,
      match: {
        params: { title },
      },
    } = this.props;
    fetchDetails(title);
  }
  render() {
    const {
      details,
      match: {
        params: { pageid },
      },
    } = this.props;
    console.log("PROPS::", this.props);
    return (
      <Layout>
        <Header>
          <h2 className="heading">
            {details.data && details.data[pageid] && details.data[pageid].title}
            <Icon type="arrow-left" style={{ float: 'right' }} onClick={this.props.history.goBack} />
          </h2>
        </Header>
        <Content>
          {details.error && (
            <span className="error">Something went wrong try again later!</span>
          )}
          {details.request && <Loading />}
          {!details.request &&
            details.data &&
            details.data[pageid] &&
            details.data[pageid].extract}
        </Content>
        <Footer />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  details: getDetails(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchDetails }
  )(Detail)
);
