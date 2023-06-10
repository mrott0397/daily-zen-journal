import React from "react";

function Homepage() {
  return (
    <div>
      <br />
      <h1 style={{ textAlign: "center" }}>
        Welcome to your Daily Zen Journal, a place for you to relax and reflect.
      </h1>
      <br />
      <br />
      <div className="container">
        <div className="cover"></div>
        <div>
          <h2 className="qoute" style={{ textAlign: "center" }}>
            “Wellness starts with a positive mindset and a commitment to
            change.” - Unknown
          </h2>
        </div>
      </div>
      {/* <Footer className="homepage-footer"/> */}
    </div>
  );
}

export default Homepage;
