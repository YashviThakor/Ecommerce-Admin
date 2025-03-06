const UserCard = ({ user }) => {
    return (
      <div className="user-card">
        <h3>{user.firstName} {user.lastName}</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    );
  };
  
  export default UserCard;