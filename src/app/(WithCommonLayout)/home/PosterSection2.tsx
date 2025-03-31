import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const PosterSection2 = () => {
  return (
    <div className="mb-10">
      <section className="py-12 my-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
            <Image
              src="/poster2.png"
              alt="Specialty"
              width={500}
              height={300}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-3xl font-bold">
                Benefits for <span className="text-primary">Everyone</span>{" "}
              </h2>
              <p className="text-gray-600 mt-3">
                Our rental properties are designed for comfort, offering modern
                interiors, spacious rooms, and well-maintained facilities.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Convenient Housing Options",
                  "Easy Application Process",
                  "Apartment Within Walking Distance",
                  "24/7 Support Team",
                  "Secure & Safe",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* part-2 */}
      <section className="py-12 my-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
            <div>
              <h2 className="text-3xl font-bold">
                Benefits for <span className="text-primary">Owner</span>{" "}
              </h2>
              <p className="text-gray-600 mt-3">
                BasaFinder offers seamless property management with tools for
                managing leases, handling maintenance issues, and processing
                payments all in one place. Its intuitive design ensures
                efficient operations and enhanced communication between
                landlords and tenants.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Property Listing & Rental Marketing",
                  "Tenant Screening & Application Processing",
                  "Apartment Tour Booking Management",
                  "Renter’s Work Order Processing",
                  "Invoicing and Employee Management",
                  "Manage Leases, Tenants, and Vacancies",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src="/poster3.png"
              alt="Specialty"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">Ready to Move In?</h2>
          <p className="text-lg mt-2">
            Contact us today and find your perfect rental home.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
            {/* <Button className="bg-white text-blue-600 hover:text-white px-6 py-3">
              Contact Us
            </Button> */}
            <Link href={"/all-listings"}>
              <Button className="bg-black text-white px-6 py-3">
                View Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PosterSection2;
