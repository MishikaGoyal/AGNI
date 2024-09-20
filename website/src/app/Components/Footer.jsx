export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="flex justify-between flex-wrap items-start">
          {/* Logo Section */}
          <div className="mb-6">
          
            <p className="mt-2">EduSync</p>
          </div>

          {/* Services & About Us Section */}
          <div className="grid grid-cols-2 gap-[40px]">
            {/* Services */}
            <div>
              <h2 className="font-bold">SERVICES</h2>
              <ul className="mt-2 space-y-2">
                <li><a href="#know" className="hover:text-white">Know your School</a></li>
                <li><a href="#update" className="hover:text-white">Make Updates</a></li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h2 className="font-bold">ABOUT US</h2>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#guide" className="hover:text-white">Guidelines</a></li>
                <li><a href="#resource" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-gray-500 my-6" />

       
        <div className="flex justify-between items-center">
      
          <div className="space-x-4 ml-[40px] -mt-[100px]">
            <a href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-rss"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-google"></i></a>
            <a href="#" className="hover:text-white"><i className="fas fa-ellipsis-h"></i></a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">©Copyright. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
