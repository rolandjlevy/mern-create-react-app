import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const App = function () {
	const [users, setUsers] = useState(null);
	const [error, setError] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

  let isRendered = useRef(false);
  const usersRef = useRef(null);

  const scrollToBottom = () => {
    usersRef.current.scrollTop = usersRef.current.scrollHeight;
  }
  
  useEffect(() => {
    axios
      .get("/api/users")
      .then(response => {
        if (!isRendered.current) {
          setUsers(response.data);
          scrollToBottom();
        }
      })
      .catch(err =>  setError(err));
    return () => isRendered.current = true;
  }, [users]);

	const submitForm = (e) => {
    e.preventDefault();
		axios.post('/api/users', 
      { username, email	}, 
      { 'Content-Type': 'application/json' }
    )
    .then(response => {
      setUsers(response.data);
      scrollToBottom();
    })
    .catch(err => {
      setError(err);
    });
	}

	return (
		<>
			<h1>MERN app</h1>
		
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
				<input type="submit" disabled={username === '' || email === ''} />
			</form>

			<ul className="users" ref={usersRef}>
      {error && JSON.stringify(error.message)}
      {users && users.length ? users.map((user, index) => (
        <li key={index}>
          {index + 1}: {user.username}, {user.email}
        </li>
      )) : !error && 'Loading...'}
			</ul>
		</>
	);
};

export default App;