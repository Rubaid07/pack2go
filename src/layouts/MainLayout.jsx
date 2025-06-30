import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet, useNavigation } from 'react-router';
import ScrollToTop from '../components/ScrollToTop';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../provider/AuthProvider';
import LogoLoading from '../components/LogoLoading';
const MainLayout = () => {
    const navigation = useNavigation()
    const [authChecking, setAuthChecking] = useState(true);
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, () => {
            setAuthChecking(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (navigation.state === 'idle') {
            window.scrollTo(0, 0);
        }
    }, [navigation.state]);
    
     if (authChecking || navigation.state === "loading") {
        return <LogoLoading />;
    }
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <div className='open-sans min-h-[calc(100vh-418px)]'>
               <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;