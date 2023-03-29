import React, { useEffect } from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Layout,
  Menu,
  Row,
  Skeleton,
  theme,
} from "antd";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { getSongsFetch } from "../redux/songSlice";
import Meta from "antd/es/card/Meta";
const { Header, Content, Footer } = Layout;

function Home() {
  const songs = useSelector((state) => state.songs);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  return (
    <>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <Row>
            <Col span={12}>
              <Card
                style={{
                  width: 300,
                  marginTop: 16,
                }}
                actions={[]}
              >
                <Skeleton loading={songs.isSongsLoading} avatar active>
                  <Meta
                    title="Songs"
                    description={`${songs.songs.count} Songs`}
                  />
                </Skeleton>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{
                  width: 300,
                  marginTop: 16,
                }}
                actions={[]}
              >
                <Skeleton loading={songs.isSongsLoading} avatar active>
                  <Meta title="Geners" description={`4 Geners`} />
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
}

export default Home;
