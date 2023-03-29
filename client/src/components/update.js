import { Button, Form, Input, Select, Alert, Space, Spin  } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { getSongsFetch } from '../redux/songSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
};
const props = {
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
};

function Update() {
  const [form] = Form.useForm();
  const params = useParams();
  const songs = useSelector(state=>state.songs);
  const dispatch = useDispatch();
  const [showMsg,setShowMsg] = useState(false);
  const [songDetail,setSongDetail] = useState({})
  const [isLoading,setIsLoading] = useState(true);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinish = (values) => {
    setIsLoading(true)
    const data = {
      album : values.album,
      artist : values.artist,
      genre : values.genre,
      title : values.title,
    };
    fetch(`http://localhost:3001/api/songs/update/${params.id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }).then(res=>{
      if (res.status == 200){
        setShowMsg(true)
        setIsLoading(false)
        dispatch(getSongsFetch);
      }
    })
    console.log(data);
  };
  useEffect(()=>{
    dispatch(getSongsFetch());

  },[dispatch])
  useEffect(()=>{
    songs.songs?.data?.map(song=>{
      if (song._id == params.id){
        // setSongDetail(song)
        form.setFieldsValue({
          title: song.title,
          genre: song.genre,
          artist: song.artist,
          album: song.album,
       });
        setIsLoading(false)
      }})
  },[params.id, songs])
  return (
    <div style={{margin:"20px"}}>
      
      {showMsg &&<Space direction="vertical" style={{ width: '30%',margin:"20px 190px" }}>

      <Alert message="Song Added success-fully" type="success" />
      </Space>}
      <div>
      <Spin tip="Loading..." spinning={isLoading}>
     
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
          form={form}
        >
          <Form.Item
            name={'title'}
            label="Title"
            
            rules={[
              {
                required: true,
              },
            ]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            name='artist'
            label="Artist"
            
            rules={[
              {
                required: true,
              },
            ]}
            >
            <Input/>
          </Form.Item>
          <Form.Item
            name='album'
            label="Album"
            
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={songDetail.album}/>
          </Form.Item>
          <Form.Item
            name= 'genre'
            label="Genre"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue="Classic"
              style={{
                width: 400,
              }}
              onChange={handleChange}
              options={[
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
              ]}
              />
          </Form.Item>
         
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
            x
            >
            <Button
              style={{
                width: 150,
              }}
              type="primary"
              htmlType="submit"
              >
              Update
            </Button>
          </Form.Item>
        </Form>
              </Spin>
      </div>
    </div>
  );
}
export default Update;
