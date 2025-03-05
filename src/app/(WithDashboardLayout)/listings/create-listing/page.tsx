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

export default function CreateListingForm() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm();

  const { user, setIsLoading } = useUser();
  console.log("user", user)

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);

    const modifiedData = {
      ...data,
      landLord: user?.userId
    };

    console.log("modifiedData: ", modifiedData);

    // try {
    //   const formData = new FormData();
    //   formData.append("data", JSON.stringify(modifiedData));
    //   formData.append("logo", imageFiles[0]);

    //   console.log(formData);

    //   const res = await createShop(formData);

    //   console.log(res);

    //   if (res.success) {
    //     toast.success(res.message);
    //   }
    // } catch (err: any) {
    //   console.error(err);
    // }
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
