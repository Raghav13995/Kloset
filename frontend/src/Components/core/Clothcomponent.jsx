import React from "react";

const Clothcomponent = (props) => {
  return (
    <div className="container">
      <h2 className="title">Explore Our Collection</h2>
      <div className="users">
        {props.users.map((user) => {
          return (
            <div key={user.id} className="card">
              <div className="img-wrap">
                <img src={user.img} alt={user.name} />
              </div>
              <div className="desc">
                <p className="name">{user.name}</p>
                <p className="description">{user.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Clothcomponent;
