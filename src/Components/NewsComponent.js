import React, { Component } from "react";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

export default class NewsComponent extends Component {
  // let articles=
  constructor() {
    super();
    this.state = {
      article: [],
      pageNumber: 1,
      totalResults: null,
    };
  }
  async update() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=de&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.pageNumber}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(70);
    let parsedData = await data.json();
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);

    let capatilize = (string) => {
      return string.charAt().toUpperCase() + string.slice(1);
    };
    document.title = `News Monkey- ${capatilize(this.props.category)}`;
  }
  async componentDidMount() {
    this.update();
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=de&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${this.state.pageNumber + 1}&pageSize=${
      this.props.pageSize
    }`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      pageNumber: this.state.pageNumber + 1,

      // loading: false,
    });
  };
  // nextHandler = async () => {
  //   await this.setState({
  //     pageNumber: this.state.pageNumber + 1,
  //   });
  //   this.update();
  // };

  // previousHandler = async () => {
  //   await this.setState({
  //     pageNumber: this.state.pageNumber - 1,
  //   });
  //   this.update();
  // };

  render() {
    return (
      <div>
        <h1 className="my-3 text-center">
          Breaking News of {this.props.category}
        </h1>
        {/* {this.state.loading && <Spinner />}   if we want spinner on loading         */}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults} // it needs false to stop
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row ">
              {this.state.article.map((element, index) => {
                return (
                  // !this.state.loading && (
                  <div className="col-md-4 my-3" key={index}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      urlLink={element.url}
                      date={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                  // )
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* {!this.state.loading && (
          <div>
            <div className="d-flex justify-content-between">
              <button
                disabled={this.state.pageNumber <= 1}
                type="button"
                onClick={this.previousHandler}
                className="btn btn-dark"
              >
                &laquo; Previous
              </button>
              <button
                disabled={
                  this.state.pageNumber + 1 >
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                }
                type="button"
                onClick={this.nextHandler}
                className="btn btn-dark"
              >
                Next &raquo;
              </button>
            </div>
          </div>
        )} */}
      </div>
    );
  }
}
