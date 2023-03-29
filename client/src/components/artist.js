import { Avatar, Card, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import './album.css';
import { Pagination } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { getSongsFetch } from '../redux/songSlice';
import { Link } from 'react-router-dom';

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

const Artist = () => {
  const songs = useSelector(state=>state.songs);
const dispatch = useDispatch();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
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
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={songs.songs.count}
        />
      </div>
    ) : null;
  return (
    <div>
      <Card title="Artists">
        <Card
          type="inner"
          title="List of Artist"
        >
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={songs.songs.data}
            renderItem={(item) => (
              <List.Item
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={<Link>{item.artist}</Link>}
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
export default Artist;
