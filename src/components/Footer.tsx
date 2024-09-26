import Container from "@/layout/Container/Container";
import { Facebook, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white overflow-hidden dark:bg-gray-900">
      <Container>
        <div className="p-6 mx-auto">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <a className="text-xl font-semibold">
                  <span className="text-primary font-bold">Inspire Shine</span>
                </a>

                <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
                  Get Your Desired Software Without Any Hassle From Us
                </p>

                <div className="flex mt-6 -mx-2 gap-4">
                  <Facebook />
                  <Github />
                  <Linkedin />
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    About
                  </h3>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Company
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Community
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Careers
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Blog
                  </h3>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Tec
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Music
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Videos
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Products
                  </h3>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.thesaymondev.zacai&pli=1"
                    className="block mt-2 text-sm text-primary font-semibold dark:text-gray-400 hover:underline"
                  >
                    Inspire
                  </a>

                  <a
                    href="#"
                    className="block mt-2 text-sm text-red-500 font-semibold dark:text-gray-400 hover:underline"
                  >
                    Shine
                  </a>
                  <p className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"></p>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Contact
                  </h3>
                  <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    +8801632029032
                  </span>
                  <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    inspireshine@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
          <div>
            <p className="text-center text-gray-500 dark:text-gray-400">
              © Brand 2024 - All rights reserved
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
