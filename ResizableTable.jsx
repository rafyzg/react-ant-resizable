import React, { useState } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { Resizable } from 'react-resizable';

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 200,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 400,
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 100,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: 100,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => <a>Delete</a>,
  },
];

const components = {
  header: {
    cell: ResizableTitle,
  },
};

const data = [
  {
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer',
  },
];
export default () => {
  const [cols, setCols] = useState(columns);

  const handleResize =
    (index) =>
    (e, { size }) => {
      let newCols = [...cols];
      newCols[index].width = size.width;
      setCols(newCols);
    };
  const newColumns = cols.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <Table
      bordered
      components={components}
      columns={newColumns}
      dataSource={data}
    />
  );
};
