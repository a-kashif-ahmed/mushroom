import { useState,useEffect } from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";


function ProfilePage(){
    const [navOpen, setNavOpen] = useState(true);
    return(
        <>
        
        <div className="bg-gray-50">
            <div className="flex min-h-screen bg-gray-50">
                <Navbar open={navOpen} setOpen={setNavOpen} />

                {/* MAIN CONTENT */}
                <div className={`flex-1 transition-all duration-300 ${navOpen ? "ml-56" : "ml-0"}`}>
                    <TopBar />
                    </div>
                    </div>
                    </div>
        
        </>
    )
}


export default ProfilePage;