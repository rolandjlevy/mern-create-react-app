import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = function () {
	const [users, setUsers] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

  let rand = 0;

	useEffect(() => {
    axios
      .get("/api/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => console.log(err));
	}, [users]);

	const submitForm = (e) => {
    e.preventDefault();
		if (username === "" || email === "") return;
		axios.post('/api/users', 
      { username, email	}, 
      { 'Content-Type': 'application/json' }
    )
    .then(response => {
      rand = Math.random(Math.random() * 50)
      console.log("Account created successfully",  { response });
    })
    .catch(error => {
      console.log("Could not create account", { error });
    });
	}

	return (
		<>
			<h1>MERN app</h1>
			<ol>
      {users && users.length ? users.map((user, index) => (
        <li key={index}>
          Name: {user.username} - Email: {user.email}
        </li>
      )) : 'Loading...'}
			</ol>
		
			<form onSubmit={submitForm}>
				<input
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="Enter username..."
          name="username"
				/>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Enter email..."
          name="email"
				/>
				<input type="submit" />
			</form>
		</>
	);
};

export default App;