import react, {useEffect, useState} from 'react'

function App() {
  const [state, setState] = useState({
    count: 5,
    users: [],
    loading: false
  })
  const [numOfPage, setNumOfPage] = useState(1)
  async function fetchUsers() {
    setState(x=>({
      ...x,
      loading: true
    }))
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const parsed = await res.json()
    setState({...state, users: parsed, loading:false})
   }
  useEffect(()=>{
    fetchUsers()
  }, [numOfPage])

  const handleNext = () => {
      setNumOfPage(c=> c + 1)
  }
  const handlePrevious = () => {
    if (numOfPage > 0) {
      setNumOfPage(c=> c - 1)
    }
  }
  const handleFirst = () => {
    setNumOfPage(1)
  }
  const handleLast = () => {
    setNumOfPage(state.count)
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        {!state.loading && <tbody>
        {state.users.map(user=> (
          <li key={user.id}>
            <p>{user.id}</p> 
            <p>{user.name}</p> 
            <p>{user.lastName}</p>            
          </li>
        ))}
        </tbody>}
      </table>
      <section className="pagination">
        <button className="first-page-btn" onClick={handleFirst} disabled={state.loading}>first</button>
        <button className="previous-page-btn" onClick={handlePrevious} disabled={state.loading || numOfPage===1}>previous</button>
        <button className="next-page-btn" onClick={handleNext} disabled={state.loading || numOfPage===state.count}>next</button>
        <button className="last-page-btn" onClick={handleLast} disabled={state.loading}>last</button>
      </section>
    </div>
  );
}

export default App;
