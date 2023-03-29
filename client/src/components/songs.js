import { Avatar, Card, List, Skeleton, Spin } from 'antd';
import { useEffect, useState } from 'react';
import './album.css';
import { Pagination } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { getSongsFetch } from '../redux/songSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

const Song = () => {
  const navigate = useNavigate();
  const songs = useSelector(state=>state.songs);
  const dispatch = useDispatch();
  const [initLoading,setInitLoading] = useState (true);
  const [isLoading, setIsLoading] = useState(false);

  const deleteSong = (id)=>{
    setIsLoading(true)
    fetch(`http://localhost:3001/api/songs/delete/${id}`,{
      method:"DELETE"
    }).then(res=>{
      if (res.status == 200){
        navigate(0);
      }
      else{
        setIsLoading(false)
      }
    })
  }

  useEffect(()=>{
    dispatch(getSongsFetch());
    setInitLoading(false);
  },[dispatch])
  console.log(songs);
  const loadMore =
    !initLoading && !songs.isSongsLoading ? (
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
      <Spin tip="Loading..." spinning={isLoading}>
      <Card title="Songs">
        <Card type="inner" title="List of Song" >
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={songs.songs.data}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Link to={`/update/${item._id}`}>Update</Link>,
                  <div onClick={()=>deleteSong(item._id)} style={{cursor:"pointer",color:"red"}}>Delete</div>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    
                    title={<Link>{item.title}</Link>}
                    description={`Artist: ${item.artist}`}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </Card>
      </Spin>
    </div>
  );
};
export default Song;
