import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/products">Productos</Link></li>
                        <li><Link to="/sales">Ventas</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet /> {/* Aquí se renderizan las rutas hijas */}
            </main>
            <aside>
                <p>Sidebar</p>
            </aside>
        </div>
    );
};

export default Dashboard;
