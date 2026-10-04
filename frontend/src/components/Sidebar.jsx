
import { useNavigate } from "react-router-dom";
import './Sidebar.css';

function Sidebar() {
  const Navigate = useNavigate();
  return (
    <div className='sidebar'>
      <div onClick={() => Navigate('/')}>Home</div>
      <div onClick={() => Navigate('/search')}>Search</div>
      <div onClick={() => Navigate('/watchlist')}>Watchlist</div>
    </div>
  );
}
export default Sidebar;