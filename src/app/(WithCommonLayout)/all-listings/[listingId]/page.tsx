import Gallery from "@/components/modules/listing/Gallery";
import { Button } from "@/components/ui/button";
import Shell from "@/components/ui/core/Shell";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const ListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  
  const { listingId } = await params;
  
  return (
    <Shell className="mt-10">
      <h2>Product details page {listingId}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  my-5">
        {/* Left Side - Image Gallery */}
        <Gallery />

        {/* Right Side - Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 border w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Book This Apartment</h3>
          {/* <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="test@gmail.com"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-green-600 text-white mt-4"
                type="submit"
              >
                Request Booking
              </Button>
            </form>
          </Form> */}
        </div>
      </div>
    </Shell>
  );
};

export default ListingDetailsPage;
