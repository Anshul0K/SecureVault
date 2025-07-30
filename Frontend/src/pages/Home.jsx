import { useNavigate, Link } from "react-router-dom";
const Home = ()=>{
    return(
        <div className="wrapper">
            {/*Navbar*/}
            <div className="navbar sticky top-0 flex justify-around mt-[-8px] z-50 ">
                <div className="w-full sticky top-0 bg-white z-50 shadow-md">
                    <div className="navbar flex justify-between items-center px-8 py-2">
                        <img
                        src="../../assets/home_logo.png"
                        alt="logo"
                        className="w-60"
                        />

                        <div className="nav-items flex items-center gap-10">
                        <Link to="/help">
                            <div className="group help flex flex-col items-center cursor-pointer">
                            <p className="text-xl font-bold group-hover:text-gray-700">Help</p>
                            <div className="under-line bg-blue-500 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </Link>

                        <div
                            className="group contact flex flex-col items-center cursor-pointer"
                            onClick={() => {
                            const section = document.getElementById("contact");
                            section?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            <p className="text-xl font-bold group-hover:text-gray-700">Contact Us</p>
                            <div className="under-line bg-blue-500 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <Link to="/login">
                            <button className="font-bold py-2 px-6 bg-[#00BFFF] text-white hover:bg-[#1795BF] rounded-md">
                            Log In
                            </button>
                        </Link>
                        </div>
                    </div>
                </div>

            </div>

            {/*Main content*/}
            <div className=" h-[600px] w-full flex justify-center relative">
                <img className="w-full" src="../../assets/Homepage_main.png" alt="" />
                <div className="absolute top-0 left-10 flex flex-col gap-20 items-start">
                    <img src="../../assets/no_bg_logo.png" alt="" className=" h-[200px]"/>
                    <ul className="text-xl space-y-4 text-[#084054]">
                        <li className="flex items-center gap-3 hover:scale-105 transition-all duration-200">
                            <span className="text-[#00BFFF] text-2xl">✔</span>
                            <span className="font-medium">Secure document storage for employees</span>
                        </li>
                        <li className="flex items-center gap-3 hover:scale-105 transition-all duration-200">
                            <span className="text-[#00BFFF] text-2xl">🔐</span>
                            <span className="font-medium">Role-based access and authentication</span>
                        </li>
                        <li className="flex items-center gap-3 hover:scale-105 transition-all duration-200">
                            <span className="text-[#00BFFF] text-2xl">📄</span>
                            <span className="font-medium">Track reimbursements and payslips easily</span>
                        </li>
                        <li className="flex items-center gap-3 hover:scale-105 transition-all duration-200">
                            <span className="text-[#00BFFF] text-2xl">📤</span>
                            <span className="font-medium">Simple upload and approval workflows</span>
                        </li>
                    </ul>
                </div>
                <p className="text-7xl text-[#243C4A] font-bold absolute z-10 right-20 top-[100px]">Our purpose is people</p>
                <img src="../../assets/Home_design.png"  className="absolute bottom-[-80px] right-0 h-[400px] rounded-full" alt="" />
            </div>

            <div className="do mt-[50px] ml-[50px] mr-[50px]">
                <div className="flex items-center">
                    <img src="../../assets/home_do.png" className="h-[450px]" alt="" />
                    <div className="flex flex-col gap-10">
                        <p className="text-3xl font-bold text-[#243C4A]">We believe that trust and transparency are the foundation of any thriving workplace.</p>
                        <p className="text-lg  text-[#24648F]">It's not just about storing documents or tracking reimbursements — it's about empowering people with secure, seamless access to what matters. By combining intuitive technology with a focus on compliance and user experience, SecurePay Vault helps foster a culture of accountability, efficiency, and belonging across your organization.</p>
                    </div>
                </div>
            </div>


            {/*contact us*/}
            <div className="w-full bg-[#B0D9D9] py-16 px-6 md:px-20" id="contact">
                <h2 className="text-2xl font-bold text-[#0F332E] mb-8 text-center font-serif">
                    Contact Us
                </h2>

                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6">
                    <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
                        <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                        <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Message</label>
                        <textarea
                        rows="3"
                        placeholder="Write your message here..."
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#00BFFF] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#009FD9] transition-colors duration-200"
                    >
                        Send Message
                    </button>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default Home;