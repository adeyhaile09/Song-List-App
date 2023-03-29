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
const Album = () => {
  const songs = useSelector(state=>state.songs);
  const dispatch = useDispatch();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
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
      <Card title="Albums">
        <Card type="inner" title="List of Album">
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
                    title={<Link>{item.album}</Link>}
                    description={`Artist : ${item.artist}`}
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
export default Album;
