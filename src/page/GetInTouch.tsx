import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/app/Loader";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: authState?.email || "", // Automatically populate email if logged in
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!authState?.email) {
      toast.error("Please log in to send a message.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      reset(); // Clear the form
      setValue("email", authState.email); // Reset with user's email again
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] mt-[-10px]">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-5 pt-14 pb-10">
        Help & Support
      </h2>
      <p className="text-center mx-auto max-w-xl mb-10 text-2xl font-semibold">
        Have a question, feedback, or just want to say hi?
      </p>
      <p className="text-center mx-auto max-w-xl pb-10">
        We're always here to help and love hearing from you! Whether it's a
        query, suggestion, or collaboration idea — don’t hesitate. Drop us a
        message and we'll get back to you as soon as possible.
      </p>
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-3xl w-full "
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="px-4 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.name && (
                <span className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                value={authState?.email} // Automatically populate email if logged in
                disabled // Always disabled
                className="px-4 py-3 rounded-xl border border-purple-300 bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
              />
              {errors.email && (
                <span className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Subject Field */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Subject
              </label>
              <input
                {...register("subject", { required: "Subject is required" })}
                placeholder="Subject"
                className="px-4 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.subject && (
                <span className="text-sm text-red-600 mt-1">
                  {errors.subject.message}
                </span>
              )}
            </div>

            {/* Message Field */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={5}
                {...register("message", { required: "Message is required" })}
                placeholder="Write your message here..."
                className="px-4 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              ></textarea>
              {errors.message && (
                <span className="text-sm text-red-600 mt-1">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
