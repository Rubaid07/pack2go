import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/Loading';
import ScrollToTop from '../components/ScrollToTop';
const MainLayout = () => {
    const navigation = useNavigation()
    
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <div className='open-sans min-h-[calc(100vh-430px)]'>
                {
                    navigation.state === "loading" ? <Loading></Loading> : <Outlet></Outlet>
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;