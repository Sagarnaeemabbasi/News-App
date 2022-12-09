import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, urlLink, imageUrl, date, author,source } = this.props;
    return (
      <div>
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://cdn.mos.cms.futurecdn.net/VC7YoHpLN23WhZXySeSnhf-1200-80.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">

            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text my-3">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <h5> Source:<span className="badge bg-danger">{source}</span> </h5>
            <a
              href={urlLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
