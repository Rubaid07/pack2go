import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/Loading';

const MainLayout = () => {
    const navigation = useNavigation()
    return (
        <div>
            <Navbar></Navbar>
            <div className='open-sans'>
                {
                    navigation.state === "loading" ? <Loading></Loading> : <Outlet></Outlet>
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;