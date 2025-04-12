import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./Layout";
import Loading from "@/components/Loading";
import NotFound from "@/pages/NotFound";

/**
 * Main App entrypoint with routing.
 */
function App() {
  const Home = lazy(() => import("@/pages/Home"))
  const About = lazy(() => import("@/pages/About"))
  const Blog = lazy(() => import("@/pages/Blog"))
  const Article = lazy(() => import("@/pages/Article"))
  const Events = lazy(() => import("@/pages/Events"))
  const EventDetail = lazy(() => import("@/pages/EventDetail"))
  const FAQ = lazy(() => import("@/pages/FAQ"))
  const Contact = lazy(() => import("@/pages/Contact"))
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Suspense fallback={<Loading/>}><Home/></Suspense>}/>
          <Route path="/about" element={<Suspense fallback={<Loading/>}><About/></Suspense>}/>
          <Route path="/blog" element={<Suspense fallback={<Loading/>}><Blog/></Suspense>}/>
          <Route path="/blog/:slug" element={<Suspense fallback={<Loading/>}><Article/></Suspense>}/>
          <Route path="/events" element={<Suspense fallback={<Loading/>}><Events/></Suspense>}/>
          <Route path="/events/:slug" element={<Suspense fallback={<Loading/>}><EventDetail/></Suspense>}/>
          <Route path="/faq" element={<Suspense fallback={<Loading/>}><FAQ/></Suspense>}/>
          <Route path="/contact" element={<Suspense fallback={<Loading/>}><Contact/></Suspense>}/>
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
