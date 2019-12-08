import React from 'react';
import {Table} from 'antd';
import moment from 'moment';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'snippet',
    render: description => (
      <div dangerouslySetInnerHTML={{__html: description}} />
    ),
  },
  {
    title: 'Posted On',
    dataIndex: 'timestamp',
    render: dataTime => moment(dataTime).format('DD/MM/YYYY'),
  },
];

const DataTable = ({dataSet, history}) => (
  <Table
    columns={columns}
    onRow={({pageid, title}) => ({
      onClick: event => {
        history.push(`/detail/${pageid}/${title}/`);
      },
    })}
    dataSource={dataSet.data || []}
    loading={dataSet.request}
  />
);

export default DataTable;
