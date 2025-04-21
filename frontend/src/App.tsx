import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Layout from "./Layout"
import Loading from "@/components/Loading"
import ScrollToTop from "@/components/ScrollToTop"
import NotFound from "@/pages/NotFound"

function App() {
  const Home = lazy(() => import("@/pages/Home"))
  const About = lazy(() => import("@/pages/About"))
  const Community = lazy(() => import("@/pages/Community"))
  const Contribute = lazy(() => import("@/pages/Contribute"))
  const Blog = lazy(() => import("@/pages/Blog"))
  const Article = lazy(() => import("@/pages/Article"))
  const Events = lazy(() => import("@/pages/Events"))
  const EventDetail = lazy(() => import("@/pages/EventDetail"))
  const FAQ = lazy(() => import("@/pages/FAQ"))
  const Newsletter = lazy(() => import("@/pages/Newsletter"))
  const Contact = lazy(() => import("@/pages/Contact"))
  const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"))
  const Login = lazy(() => import("@/pages/Login"))

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<Loading/>}><Home/></Suspense>}/>
          <Route path="/about" element={<Suspense fallback={<Loading/>}><About/></Suspense>}/>
          <Route path="/community" element={<Suspense fallback={<Loading/>}><Community/></Suspense>}/>
          <Route path="/contribute" element={<Suspense fallback={<Loading/>}><Contribute/></Suspense>}/>
          <Route path="/blog" element={<Suspense fallback={<Loading/>}><Blog/></Suspense>}/>
          <Route path="/blog/:slug" element={<Suspense fallback={<Loading/>}><Article/></Suspense>}/>
          <Route path="/events" element={<Suspense fallback={<Loading/>}><Events/></Suspense>}/>
          <Route path="/events/:slug" element={<Suspense fallback={<Loading/>}><EventDetail/></Suspense>}/>
          <Route path="/faq" element={<Suspense fallback={<Loading/>}><FAQ/></Suspense>}/>
          <Route path="/newsletter" element={<Suspense fallback={<Loading/>}><Newsletter/></Suspense>}/>
          <Route path="/contact" element={<Suspense fallback={<Loading/>}><Contact/></Suspense>}/>
          <Route path="/admin" element={<Suspense fallback={<Loading/>}><AdminDashboard/></Suspense>}/>
          <Route path="/login" element={<Suspense fallback={<Loading/>}><Login/></Suspense>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
