import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import Sales from "./Sales";
import QuickAction from "../components/Quick";

function Homepage() {
    const [navOpen, setNavOpen] = useState(true);
    return (
        <div className="bg-gray-50">
            <div className="flex min-h-screen bg-gray-50">
                <Navbar open={navOpen} setOpen={setNavOpen} />

                {/* MAIN CONTENT */}
                <div className={`flex-1 transition-all duration-300 ${navOpen ? "ml-56" : "ml-0"}`}>
                    <TopBar />
                    <div className="flex justify-center">
                        <h2 className=" text-5xl text-green-700 p-7">Welcome to the Mushroom Inventory Management</h2>
                    </div>
                    <div className="flex justify-center p-11 text-xl">
                        You can conveniently monitor daily mushroom production and purchasing activities in one location with this system. It manages purchase entries, including item quantity, rates, transport and labor charges, and final costs, in addition to recording important details like date, stage, gross and net weight, waste, and total amount for production. It guarantees precise stock tracking, cost control, and improved decision-making for your mushroom operations with structured fields and understandable calculations.
                        </div>
                    <div className="mb-8 p-6">
                        <h3 className="flex justify-center text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        {/* CHANGE: Use flex with justify-center and gap */}
                        <div className="flex justify-center gap-4 flex-wrap">
                            <QuickAction 
                            icon="->"
                            label="Login Now"
                            color="bg-green-600"
                            onClick={() => window.location.href = "/login"}
                            />
                            <QuickAction
                                icon="➕"
                                label="New Purchase"
                                color="bg-blue-600"
                                onClick={() => window.location.href = "/purchases"}
                            />
                            <QuickAction
                                icon="💰"
                                label="Record Sale"
                                color="bg-green-600"
                                onClick={() => window.location.href = "/sales"}
                            />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;