import 'bootstrap/dist/css/bootstrap.min.css';
import jwt from 'jsonwebtoken';

const Navbar = () => {

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    function getUsername() {
        const token = localStorage.getItem('token');
        const decoded = jwt.verify(token, 'key');
        return decoded.Username;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Expense-Tracker</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-nav">
                <a className="nav-item nav-link" href="/dashboard">Dashboard</a>
                <a className="nav-item nav-link" href="/goaltracker">GoalTracker</a>
            </div>
            <div className="navbar-nav ml-auto pr-4">
                <span className="badge badge-pill badge-dark text-white p-3 mr-4">{getUsername()}</span>
                <button className="btn btn-sm btn-danger " onClick={handleLogout}>LOG OUT</button>

            </div>
        </nav>
    );
}

export default Navbar;