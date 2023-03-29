import {  Card, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import './album.css';
import { Pagination } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { getSongsFetch } from '../redux/songSlice';
import { Link } from 'react-router-dom';

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};
const Genre = () => {
  const songs = useSelector(state=>state.songs);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const list = [
    {
      value: 'classic',
      label: 'Classic',
    },
    {
      value: 'jazz',
      label: 'Jazz',
    },
    {
      value: 'slow',
      label: 'Slow',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  useEffect(()=>{
    dispatch(getSongsFetch());
    setInitLoading(false);
  },[dispatch])
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'right',
          marginTop: 12,
          height: 32,
        }}
      >
      </div>
    ) : null;
  return (
    <div>
      <Card title="Genres">
        <Card type="inner" title="List of Genre">
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={<Link to={`/genre/${item.value}`}>{item.label}</Link>}
                    description={`${songs.songs.data.filter(song=> song.genre == item.value).length} musics`}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </Card>
      ;
    </div>
  );
};
export default Genre;
