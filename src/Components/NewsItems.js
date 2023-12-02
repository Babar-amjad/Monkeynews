import React from 'react'

const NewsItems=(props)=> {
    let {title,description,imageurl, url,author,date}=props;
    return (
<div className="container">
  <div className="row">
    <div className="col-lg-12 col-sm-12 mb-4">
      <div className="card">
        <img src={!imageurl ? "https://i.ytimg.com/vi/-kWJYgfa2SU/maxresdefault.jpg" : imageurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}..</p>
          <p className="card-text">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</p>
          <a href={url} target="_blank" className="btn btn-primary mb-3">Read more</a>
        </div>
      </div>
    </div>
  </div>
</div>


    )
}

export default NewsItems;
