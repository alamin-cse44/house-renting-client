"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { toast } from "sonner";
import { createShop } from "@/services/Shop";
import { useUser } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingValidationSchema } from "@/components/modules/listing/ListingValidation";

export default function CreateListingForm() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    resolver: zodResolver(listingValidationSchema),
  });

  const { user, setIsLoading } = useUser();
  console.log("user", user);

  const {
    formState: { isSubmitting },
  } = form;

  // Cloudinary Upload Function
  const uploadImagesToCloudinary = async () => {
    const cloudName = `${process.env.NEXT_PUBLIC_CLOUD_NAME}`; // Replace with your Cloudinary cloud name
    const uploadPreset = "first_preset_name"; // Replace with your Cloudinary upload preset
    const urls = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (data.secure_url) {
          urls.push({ url: data.secure_url });
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    return urls;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      // Upload images to Cloudinary
      const uploadedImages = await uploadImagesToCloudinary();

      console.log("images", uploadedImages);

      // Prepare modified data
      const modifiedData = {
        ...data,
        landLord: user?.userId,
        price: Number(data?.price),
        bedrooms: Number(data?.bedrooms),
        images: uploadedImages, // Image URLs from Cloudinary
      };

      // Send data to backend
      //   const res = await createShop(modifiedData);

      //   if (res.success) {
      //     toast.success(res.message);
      //   }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to create listing");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
        <div className="flex items-center space-x-4 mb-5">
          {/* Logo */}
          <div>
            <h1 className="text-xl font-semibold">Create Your Listing</h1>
            <p className="font-extralight text-sm text-gray-600">
              Join us today and start your journey!
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="apartmentType"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Apartment Type</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedroom Quantities</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {imagePreview.length <= 2 && (
              <div className="mt-8">
                <NMImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Image"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
              <div>
                {imagePreview.length <= 3 && (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="mt-8"
                  />
                )}
              </div>
            </div>

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Creating...." : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
