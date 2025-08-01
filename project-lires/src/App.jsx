import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NivelLibras from "./pages/NivelLibras";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
           <Route index element={<Home />} />
          <Route path="nivel" element={<NivelLibras />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

