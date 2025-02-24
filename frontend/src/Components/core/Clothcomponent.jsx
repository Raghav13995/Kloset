import React from 'react'
const Clothcomponent = (props) => {
  return (
    <div>
        <div className="users">
            {props.users.map((user) => {
                return (
                    <div key={user.id} className="wrap">
                    <div className="img-wrap">
                        <img src={user.img} alt="" />
                    </div>
                    <div className="desc">
                        <p className="name">{user.name}</p>
                        <p className="description">{user.description}</p>
                    </div>
                    </div>
                );
            })
            }
        </div>
    </div>
  )
}
export default Clothcomponent;
