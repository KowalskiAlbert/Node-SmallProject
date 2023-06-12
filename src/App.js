import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import axios from 'axios';
import './App.css';

const { TextArea } = Input;
const App = () => {
  const [addr, setAddr] = useState('');
  const [TableData, setData] = useState([]);
  const [info, setInfo] = useState();
  const [datalen, setDataLen] = useState();
  function getData() {
    axios.post('http://127.0.0.1:3001/check', { ip: addr })
      .then(function (response) {
        let data = response.data;
        setDataLen(Object.keys(data).length);
        let inf = '';
        Object.keys(data).forEach(key => {
          inf += key + ' : ' + data[key] + '\n';
        });
        inf = inf.slice(0, -1);
        setInfo(inf);
        data.key = 1;
        let arr = [];
        arr.push(data);
        setData(arr);
      })
      .catch(function (error) {
        setDataLen(0);
        setInfo('');
        setData([]);
        console.log("error");
      })
      .finally(function () {
        // always executed
      });
  }

  const columns = [
    {
      title: 'ProxyIP',
      dataIndex: 'proxy',
      key: '1',
      align: 'center',
      render: (_, {proxy}) => <a>{proxy.ip}</a>,
    },
    {
      title: 'Port',
      dataIndex: 'proxy',
      key: '2',
      align: 'center',
      render: (_, {proxy}) => <a>{proxy.port}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'proxy',
      key: '3',
      align: 'center',
      render: (_, {proxy}) => <a>{proxy.valid==="true"?"OK":"dead"}</a>,
    },
    {
      title: 'Speed',
      dataIndex: 'proxy',
      key: '4',
      align: 'center',
      render: (_, {proxy}) => <a>{(proxy.data.connection_time*1000) + 'ms'}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'proxy',
      key: '5',
      align: 'center',
      render: (_, { proxy }) => <a>{proxy.protocol}</a>,
    },
    {
      title: 'Anonymity',
      dataIndex: 'proxy',
      key: '6',
      align: 'center',
      render: (_, { proxy }) => <a>{proxy.data.anonymity_level}</a>,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: '7',
      align: 'center',
      render: (txt) => <a>{txt}</a>,
    },
  ];
  
  useEffect(() => {
    
  }, [TableData]);
  return (
    <div className="App">
      <h1>Proxy Risk Checker</h1>
      <p>Enter proxyies (one per line)</p>
      <TextArea value={addr} onChange={e => setAddr(e.target.value)} rows={1} className='addr' style={{ fontSize: '24px', textAlign: 'center' }}></TextArea>
      <br />
      <Button onClick={getData} style={{fontSize: '16px'}}>Check Proxies</Button>
      <br />
      <br />
      <Table bordered columns={columns} dataSource={TableData} />
      <br />
      <TextArea value={info} rows={datalen} className='infoView'></TextArea>
    </div>
  );
}

export default App;

