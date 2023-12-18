"use client";

export default function Footer() {
  return (
    <>
      <div id="Footer" className="border-t mt-20 px-2">
        <div className="flex items-baseline justify-between w-full mx-auto max-w-[1200px] py-10">
          <ul>
            <li>
              <h1 className="font-bold text-lg ">
                Welcome to Medpick, your trusted destination for all your
                medical and healthcare needs. Our footer is designed to provide
                you with quick access to essential information and enhance your
                shopping experience. Explore the following features
              </h1>
            </li>
            <br />
            
            <li>
              <h1 className="font-bold text-lg ">Navigation Links:</h1> Easily navigate through our platform
              using the organized links in the footer. Find categories such as
              Pharmaceuticals, Medical Devices, Personal Care, and more
            </li>
            <li>
              <h1 className="font-bold text-lg ">Quick Links:</h1> Access important pages with a single click.
              From FAQs and Shipping Information to Returns and Privacy Policy,
              we've got you covered.
            </li>
            <li>
              <h1 className="font-bold text-lg ">Stay Connected:</h1> Connect with us on social media
              platforms. Follow us for updates, promotions, and healthcare tips.
              Stay informed about the latest products and industry news.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
