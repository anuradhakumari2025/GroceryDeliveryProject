import React, { useState } from "react";
import { assets } from "../assets/greencart_assets/assets";

//input field component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="my-16">
      <p className="text-gray-500 text-2xl md:text-3xl">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form action="" onSubmit={onSubmitHandler} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="firstName"
                placeholder="First Name"
              />
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <InputField
              type="email"
              handleChange={handleChange}
              address={address}
              name="email"
              placeholder="Email Address"
            />

            <InputField
              type="text"
              handleChange={handleChange}
              address={address}
              name="street"
              placeholder="Street"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="city"
                placeholder="City"
              />
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="state"
                placeholder="State"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="number"
                handleChange={handleChange}
                address={address}
                name="zipcode"
                placeholder="Zipcode"
              />
              <InputField
                type="text"
                handleChange={handleChange}
                address={address}
                name="country"
                placeholder="Country"
              />
            </div>
            <InputField
              type="number"
              handleChange={handleChange}
              address={address}
              name="phone"
              placeholder="Phone"
            />
            <button className="bg-primary hover:bg-primary-dull w-full py-2 text-white rounded uppercase mt-6">
              Save Address
            </button>
          </form>
        </div>
        <img
          src={assets.add_address_iamge}
          alt="add address"
          className="md:mr-16 mb-16 md:mt-0"
        />
      </div>
    </div>
  );
};

export default AddAddress;
