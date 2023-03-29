import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const  { Header } = Layout;

const items = [
    {
      label: 'Home',
      key: '/',
    },
    {
      label: 'Artist',
      key: 'artist',
    },
    {
      label: 'Album',
      key: 'album',
    },
    {
      label: 'Genre',
      key: 'genre',
    },
    {
      label: 'Song',
      key: 'song',
    },
    {
      label: 'Upload',
      key: 'upload',
    },
  ];

function NavBar (){
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate(e.key)
      };
    return <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      items={items}
      onClick={onClick}
    />
  </Header>
}

export default NavBar;