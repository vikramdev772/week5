import React, { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:4040/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  // DELETE USER
  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`http://localhost:4040/api/user/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchUsers();
    });
  };

  

  // UPDATE USER
  const updateUser = () => {
    fetch(`http://localhost:4040/api/user/${editingUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingUser),
    }).then(() => {
      setEditingUser(null);
      fetchUsers();
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel – Users</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>
                {editingUser?.id === user.id ? (
                  <input
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>

              <td>
                {editingUser?.id === user.id ? (
                  <input
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>

              

              <td>
                {editingUser?.id === user.id ? (
                  <input
                    value={editingUser.password}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        password: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.password
                )}
              </td>

              <td>
                {editingUser?.id === user.id ? (
                  <>
                    <button onClick={updateUser}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingUser(user)}>Edit</button>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;


