import React from "react";

import { useSelector} from "react-redux";

import Textbox from "../components/Textbox";

import Profile from "../assets/pexel.jpg";



const  ProfileFetch = () => {

  const { user } = useSelector((state) => state.auth);

  
  return (
    <div className="w-full md:px-1 px-0 mb-6 p-5">
   
        <div className="bg-white rounded-2xl">
          <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
              <div className="relative mx-auto w-36 h-36 rounded-full">
                <img
                  src={Profile}
                  alt="Profile"
                  className="mx-auto h-28 w-28 rounded-full"
                />
              </div>
              <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
                {user?.name}
              </h1>
              <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
                Role: {user?.role}
              </h3>
              <div className="">
                <ul className="mt-3 divide-y bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow rounded-lg">
                  <li className="flex items-center py-3 text-sm">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                        {user?.isActive ? "Active" : "Disabled"}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3 text-sm">
                    <span>Joined On</span>
                    <span className="ml-auto">Apr 08, 2022</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
              <h1>Basic Information</h1>

              <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                <Textbox
                  placeholder={user?.name}
                  type="text"
                  name="name"
                  label="Full Name"
                 
                />
                <Textbox
                  placeholder="Gender"
                  type="text"
                  name="gender"
                  label="Gender"
                  className="w-full rounded-2xl"
             
                />
                <Textbox
                  placeholder="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  label="Date of Birth"
                  className="w-full rounded-2xl"
            
                />
                <Textbox
                  placeholder="Nationality"
                  type="text"
                  name="nationality"
                  label="Nationality"
                  className="w-full rounded-2xl"
            
                />
                <Textbox
                  placeholder="Email"
                  type="email"
                  name="email"
                  label="Email"
                  className="w-full rounded-2xl"
          
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProfileFetch;
