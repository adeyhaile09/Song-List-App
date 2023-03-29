import Home from "./components/home";
import UploadFile from "./components/upload";
import Artist from "./components/artist";
import Album from "./components/album";
import Genre from "./components/genre";
import Song from "./components/songs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import NavBar from "./components/navbar";
import GenerMusics from "./components/generMusics";
import Update from "./components/update";

const { Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Router>
        <NavBar />

        <Routes>
          <Route exact index path="/" element={<Home />} />
          <Route exact index path="/artist" element={<Artist />} />
          <Route exact index path="/album" element={<Album />} />
          <Route exact index path="/genre" element={<Genre />} />
          <Route exact index path="/genre/:genre" element={<GenerMusics />} />
          <Route exact index path="/song" element={<Song />} />
          <Route exact index path="/upload" element={<UploadFile />} />
          <Route exact index path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
      ;
      <Footer style={{ textAlign: "center" }}>
        Song List ©2023 Created by Kidest
      </Footer>
    </Layout>
  );
}

export default App;
