"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const RentRequestModal = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm();
  const { user, setIsLoading } = useUser();
  const {
    formState: { isSubmitting },
  } = form;

  // console.log("user in renting", user);

  const handleAuthorizeUser = () => {
    toast.error("You are not allowed! Please login first!");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    if (!data?.isAgree || data?.isAgree == "undefined") {
      toast.error("Please agree with the terms and conditions");
      return;
    }
    // try {
    //   console.log("ekhane asche")
    //   const formData = new FormData();
    //   formData.append("data", JSON.stringify(data));
    //   formData.append("icon", imageFiles[0]);
    //   const res = await createCategory(formData);
    //   console.log(res);
    //   if (res?.success) {
    //     toast.success(res?.message);
    //   } else {
    //     toast.error(res?.message);
    //   }
    // } catch (err: any) {
    //   console.error(err);
    // }
  };

  return (
    <Dialog>
      {!user ? (
        <Button onClick={handleAuthorizeUser} className="w-full mt-5">
          Click For Renting
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button className="w-full mt-5">Request For Renting</Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Renting Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between mt-5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36 w-72"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {imagePreview.length > 0 ? (
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  className="mt-8"
                />
              ) : (
                <div className="mt-8">
                  <NMImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Icon"
                  />
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="isAgree"
              render={({ field }) => (
                <FormItem className="mt-5 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I'm accepting the terms and conditions
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Creating...." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RentRequestModal;
