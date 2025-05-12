import Swal from "sweetalert2"; // ✅ Import SweetAlert2

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    // Show success notification with SweetAlert
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: `Thank you for subscribing with ${email}! You'll receive updates shortly.`,
    });

    e.target.reset(); // Clear the input field after submission
  };

  return (
    <section className="bg-white/10 p-8 rounded-lg shadow-md w-[90%] mx-auto my-16">
      <h2 className="text-3xl font-bold text-center text-base-content mb-4">Subscribe to Our Newsletter</h2>
      <p className="text-center text-base-content mb-6">
        Get updates about new artifacts, history insights, and special offers.
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="px-4 py-2 w-full sm:w-2/3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
