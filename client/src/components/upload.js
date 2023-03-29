import { Button, Form, Input, Select, Alert, Space  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getSongsFetch } from '../redux/songSlice';
import { useState } from 'react';
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

function UploadFile() {
  const [showMsg,setShowMsg] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinish = (values) => {
    const data = {
      album : values.album.album,
      artist : values.artist.artist,
      genre : values.genre.genre,
      title : values.title.title,
    };
    fetch("http://localhost:3001/api/songs/post",{
      method:"Post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }).then(res=>{
      if (res.status == 200){
        setShowMsg(true)
        dispatch(getSongsFetch);
      }
    })
    console.log(data);
  };
  return (
    <div style={{margin:"30px"}}>
      
      {showMsg &&<Space direction="vertical" style={{ width: '30%',margin:"20px 190px" }}>

      <Alert message="Song Added success-fully" type="success" />
      </Space>}
      <div>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['title', 'title']}
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
            name={['artist', 'artist']}
            label="Artist"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['album', 'album']}
            label="Album"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['genre', 'genre']}
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
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default UploadFile;
