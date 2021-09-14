import { useState, useEffect } from "react";
import "./App.css";
import Pagination from "@material-ui/lab/Pagination";
import {
  Box,
  Grid,
  Paper,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core";

const App = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const matches = useMediaQuery("(max-width:500px)");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fecthPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/posts?page=${page}`
        );

        const { data, pages: totalPages } = await res.json();

       
          setPages(totalPages);
          setPosts(data);
          setLoading(false);
       
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Some Error Occured");
      }
    };

    fecthPosts();
  }, [page]);

  return (
    <div className="app">
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <h1 style={matches ? { fontSize: 24 } : { fontSize: 34 }}>
            Advanced MERN Pagination
          </h1>
          <p>Pagination in Backend</p>
        </Grid>
        <Grid item item xs={12}>
          <Pagination
            size={matches ? "small" : "large"}
            className="paginationContainer"
            color="primary"
            count={pages}
            onChange={(object, currentPage) => setPage(currentPage)}
          />
        </Grid>
        <Grid item item xs={12}>
          {loading ? (
            <div className="loaderContainer">
              <h3 style={{margin:'20px'}}>Loading</h3>
            </div>
          ) : error ? (
            <div className="errorContainer">
              <h3>{error}</h3>
            </div>
          ) : (
            <Grid container spacing={2}>
              {posts.map((item, k) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Paper elevation={2} style={{ height: "100%" }}>
                    <Box style={{ padding: "10px" }}>
                      <h4>{item.title}</h4>
                      <p>{item.author}</p>
                      <p>{item.body}</p>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
