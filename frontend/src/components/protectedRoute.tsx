import { useEffect } from 'react';


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {


  useEffect(() => {
    
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
    
    
    if (!token && !client && !uid) {
      window.location.href = "/"
    }
  },[]);

  return <>{children}</>;
};

export default ProtectedRoute;