import { useState } from "react";
import usePageMeta from "../hooks/usePageMeta";

export default function MobileQuestionnaire() {
  usePageMeta('Mobile Project', 'Submit your mobile app project requirements to Tekunik for a custom quote.');
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    mobile: "",
    address: "",
    summary: "",
    parts: [],
    deadline: "",
    budget: "",
    platforms: [],
    orientation: "",
    targetUsers: "",
    objectives: "",
    phases: "",
    freePaid: "",
    tech: "",
    backend: "",
    host: "",
    payment: "",
    thirdParty: [],
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      let arr = [...form[name]];
      if (checked) arr.push(value);
      else arr = arr.filter((v) => v !== value);
      setForm((prev) => ({ ...prev, [name]: arr }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Mobile form submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto py-6 md:py-12 px-4 sm:px-6 mt-8">

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 mt-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-xl md:text-4xl font-bold mb-4 md:mb-8 text-brand-green text-center uppercase tracking-tight">MOBILE PROJECT</h1>
        <div>
          <label className="block text-sm font-medium mb-1">Your Name *</label>
          <input name="name" onChange={handleChange} placeholder="Your Name" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Name *</label>
          <input name="company" onChange={handleChange} placeholder="Company Name" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile *</label>
          <input name="mobile" onChange={handleChange} placeholder="Mobile" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input name="address" onChange={handleChange} placeholder="Address" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Summarise the app</label>
          <textarea name="summary" onChange={handleChange} placeholder="Brief description" className="w-full border px-3 py-2 rounded" rows="3" />
        </div>

        {/* Parts */}
        <div>
          <label className="block text-sm font-medium mb-2">Which parts should be done by us?</label>
          <div className="space-y-2">
            {["UI", "UX", "Development", "Launch", "Training"].map((item) => (
              <label key={item} className="flex items-center">
                <input type="checkbox" name="parts" value={item} onChange={handleChange} className="mr-2" /> {item}
              </label>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-sm font-medium mb-2">Which platforms?</label>
          <div className="space-y-2">
            {["iOS", "Android", "Both"].map((item) => (
              <label key={item} className="flex items-center">
                <input type="radio" name="platforms" value={item} onChange={handleChange} className="mr-2" /> {item}
              </label>
            ))}
          </div>
        </div>

        {/* Backend Question */}
        <div>
          <label className="block text-sm font-medium mb-2">Do you need backend development?</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="backend" value="Yes" onChange={handleChange} className="mr-2" /> Yes
            </label>
            <label className="flex items-center">
              <input type="radio" name="backend" value="No" onChange={handleChange} className="mr-2" /> No
            </label>
          </div>
        </div>

        {/* Conditional: Backend Details */}
        {form.backend === "Yes" && (
          <div className="ml-4 p-4 bg-gray-50 rounded border-l-4 border-brand-cyan">
            <label className="block text-sm font-medium mb-1">What backend technology do you prefer?</label>
            <input name="tech" onChange={handleChange} placeholder="e.g., Node.js, Python, PHP" className="w-full border px-3 py-2 rounded" />
          </div>
        )}

        {/* Hosting Question */}
        <div>
          <label className="block text-sm font-medium mb-2">Do you need hosting services?</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="host" value="Yes" onChange={handleChange} className="mr-2" /> Yes
            </label>
            <label className="flex items-center">
              <input type="radio" name="host" value="No" onChange={handleChange} className="mr-2" /> No
            </label>
          </div>
        </div>

        {/* Conditional: Hosting Details */}
        {form.host === "Yes" && (
          <div className="ml-4 p-4 bg-gray-50 rounded border-l-4 border-brand-cyan">
            <label className="block text-sm font-medium mb-1">Preferred hosting provider?</label>
            <input name="hostProvider" onChange={handleChange} placeholder="e.g., AWS, Google Cloud, Azure" className="w-full border px-3 py-2 rounded" />
          </div>
        )}

        {/* Payment Integration Question */}
        <div>
          <label className="block text-sm font-medium mb-2">Do you need payment integration?</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="payment" value="Yes" onChange={handleChange} className="mr-2" /> Yes
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" value="No" onChange={handleChange} className="mr-2" /> No
            </label>
          </div>
        </div>

        {/* Conditional: Payment Details */}
        {form.payment === "Yes" && (
          <div className="ml-4 p-4 bg-gray-50 rounded border-l-4 border-brand-cyan">
            <label className="block text-sm font-medium mb-2">Which payment gateways?</label>
            <div className="space-y-2">
              {["Stripe", "PayPal", "Razorpay", "Other"].map((item) => (
                <label key={item} className="flex items-center">
                  <input type="checkbox" name="thirdParty" value={item} onChange={handleChange} className="mr-2" /> {item}
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Real Deadline</label>
          <input name="deadline" type="date" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Budget</label>
          <input name="budget" onChange={handleChange} placeholder="Your budget" className="w-full border px-3 py-2 rounded" />
        </div>

        <button type="submit" className="w-full bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-cyan transition">Submit</button>
      </form>
    </div>
  );
}