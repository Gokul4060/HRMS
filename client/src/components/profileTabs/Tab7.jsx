import React from 'react'

const Tab7 = () => {
  return (
    <div className="bg-white px-4 pt-8 pb-10 rounded-2xl">
      <h1>Identity Information</h1>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Textbox
          placeholder="enter"
          type="text"
          name="name"
          label=""
          className="w-full rounded-2xl"
        />
        <Textbox
          placeholder="Gender"
          type="text"
          name="Gender"
          label="Gender"
          className="w-full rounded-2xl"
        />
        <Textbox
          placeholder="DOB"
          type="date"
          name="date"
          label="Date of birth"
          className="w-full rounded-2xl"
        />
        <Textbox
          placeholder="Indian"
          type="text"
          name="Nationality"
          label="Nationality"
          className="w-full rounded-2xl"
        />
        <Textbox
          placeholder="email"
          type="text"
          name="email"
          label="Email"
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  );
}

export default Tab7
