import React from "react";

const UsersLogin = () => {
  return (
    <>
      <div className="users-login">
        <form>
          <input type="email" placeholder="Enter Your Email" />
          <input type="password" placeholder="Enter Your Password" />

          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default UsersLogin;
