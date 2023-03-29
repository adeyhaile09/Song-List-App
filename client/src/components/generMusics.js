import { Card, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import './album.css';
import { Pagination } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { getSongsFetch } from '../redux/songSlice';
import { Link, useParams } from 'react-router-dom';

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

const GenerMusics = () => {
  const songs = useSelector(state=>state.songs);
  const params = useParams();
const dispatch = useDispatch();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
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
      <Card title={`${params.genre} musics`}>
        <Card
          type="inner"
          title={`List of ${params.genre} musics`}
        >
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={songs.songs.data.filter(song=> song.genre == params.genre)}
            renderItem={(item) => (
              <List.Item
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={<Link>{item.title}</Link>}
                    description= {`Artist: ${item.artist}`}
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
export default GenerMusics;
