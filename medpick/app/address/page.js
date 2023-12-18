"use client";

import MainLayout from "../layouts/MainLayout";
import TextInput from "../components/TextInput";
import { useEffect, useState } from "react";
import { useUser } from "../context/user";
import useIsLoading from "../hooks/useIsLoading";
import useCreateAddress from "../hooks/useCreateAddress";
import useUserAddress from "../hooks/useUserAddress";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ClientOnly from "../components/ClientOnly";
import { set } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  const [addressId, setAddressId] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [error, setError] = useState({});
  
  const showError = (type) => {
    if (Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const getAdddress = async () => {
    if (user?.id == null || user?.id == undefined) {
      useIsLoading(false);
      return;
    }

    const response = await useUserAddress();
    if (response) {
      setTheCurrentAddres(response);
      useIsLoading(false);
      return;
    }
    useIsLoading(false);
  };

  useEffect(() => {
    useIsLoading(true);
    getAdddress();
  }, [user]);

  const setTheCurrentAddres = (result) => {
    setAddressId(result.id);
    setName(result.name);
    setEmail(result.email);
    setAddress(result.address);
    setZipcode(result.zipcode);
    setCity(result.city);
   
  };

  const validate = () => {
    setError(null);
    setError({});
    let isError = false;

    if (!name) {
      setError({ type: "name", message: "A name is required" });
      isError = true;
    } else if (!address) {
      setError({ type: "address", message: "An address is required" });
      isError = true;
    } else if (!zipcode) {
      setError({ type: "zipcode", message: "A zipcode is required" });
      isError = true;
    } else if (!city) {
      setError({ type: "city", message: "A city is required" });
      isError = true;
    } else if (!email) {
      setError({ type: "email", message: "An Email is required" });
      isError = true;
    }
    return isError;
  };

  const submit = async (event) => {
    event.preventDefault();
    let isError = validate();

    if (isError) {
      toast.error(error.message, { autoClose: 3000 });
      return;
    }

    try {
      setIsUpdatingAddress(true);

      const response = await useCreateAddress({
        addressId,
        name,
        email,
        address,
        zipcode,
        city,
        
      });

      setTheCurrentAddres(response);
      setIsUpdatingAddress(false);

      toast.success("Address updated!", { autoClose: 3000 });

      router.push("/checkout");
    } catch (error) {
      setIsUpdatingAddress(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <MainLayout>
        <div id="AddressPage" className="mt-4 max-w-[600px] mx-auto px-2">
          <div className="mx-auto bg-white rounded-lg p-3">
            <div className="text-xl text-bold mb-2">Address Details</div>

            <form onSubmit={submit}>
              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={name}
                    placeholder="Name"
                    onUpdate={setName}
                    error={showError("name")}
                  />
                </ClientOnly>
              </div>
              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full mt-2"
                    string={email}
                    placeholder="Email"
                    onUpdate={setEmail}
                    error={showError("email")}
                  />
                </ClientOnly>
              </div>

              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={address}
                    placeholder="Address"
                    onUpdate={setAddress}
                    error={showError("address")}
                  />
                </ClientOnly>
              </div>

              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full mt-2"
                    string={zipcode}
                    placeholder="Zip Code"
                    onUpdate={setZipcode}
                    error={showError("zipcode")}
                  />
                </ClientOnly>
              </div>

              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full mt-2"
                    string={city}
                    placeholder="City"
                    onUpdate={setCity}
                    error={showError("city")}
                  />
                </ClientOnly>
              </div>

              <button
                type="submit"
                disabled={isUpdatingAddress}
                className={`
                                mt-6
                                w-full 
                                text-white 
                                text-lg 
                                font-semibold 
                                p-3 
                                rounded
                                ${
                                  isUpdatingAddress
                                    ? "bg-blue-800"
                                    : "bg-blue-600"
                                }
                            `}
              >
                {!isUpdatingAddress ? (
                  <div>Update Address</div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Please wait...
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
