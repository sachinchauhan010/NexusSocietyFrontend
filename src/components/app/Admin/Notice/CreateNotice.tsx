import { useForm } from "react-hook-form";
import { toast } from "sonner";

type NoticeForm = {
  id: string; // Added id field
  title: string;
  description: string;
  link?: string; // Optional link field
  date: string;
};

const CreateNotice = () => {
  const { register, watch, handleSubmit, reset } = useForm<NoticeForm>({
    defaultValues: {
      id: "", // Default value for id
      title: "",
      description: "",
      link: "", // Default value for optional link
      date: "",
    },
  });

  const onSubmit = async (data: NoticeForm) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/notice/create-notice`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // If you're using sessions/cookies
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message || "Failed to create notice.");
      }

      toast.success("Notice successfully published!");
      reset(); // Clear form after success
    } catch (error) {
      console.error("Error submitting notice:", error);
      toast.error(`${(error as Error).message}`);
    }
  };

  const watchFields = watch();

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-12">
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-1/2 bg-white shadow-lg p-6 rounded-lg border"
      >
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Create Notice</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
            <input
              {...register("id", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              placeholder="Enter notice ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              {...register("title", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              placeholder="Enter notice title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label>
            <input
              {...register("link")}
              type="url"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              {...register("date", { required: true })}
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Publish Notice
          </button>
        </div>
      </form>

      {/* Preview */}
      <div className="md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border-l-4 border-purple-500 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">
            {watchFields.title || "Notice Title"}
          </h3>
          <p className="text-gray-600 mb-2">
            {watchFields.description || "Notice description will appear here."}
          </p>
          {watchFields.link && (
            <a
              href={watchFields.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block mb-2"
            >
              View Link
            </a>
          )}
          <p className="text-sm text-gray-500">
            {watchFields.date ? `📅 ${watchFields.date}` : "Select a date"}
          </p>
          <p className="text-sm text-gray-500">
            {watchFields.id ? `🆔 ID: ${watchFields.id}` : "Enter an ID"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateNotice;