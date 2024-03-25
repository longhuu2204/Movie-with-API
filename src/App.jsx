import { Fragment, lazy, Suspense } from "react";
import "swiper/scss";
import { Route, Routes } from "react-router-dom";
// import Homepage from "./pages/Homepage";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";

const Homepage = lazy(() => import("./pages/Homepage"));
export default function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <Homepage></Homepage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}
