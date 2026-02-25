import { useState } from "react";
import usePageMeta from "../hooks/usePageMeta";

export default function WebQuestionnaire() {
  usePageMeta('Web Project', 'Submit your web project requirements to Tekunik for a custom quote.');
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    mobile: "",
    address: "",
    urlIdea: "",
    hosting: "",
    buyDomain: "",
    deadline: "",
    budget: "",
    reasons: [],
    otherReason: "",
    target: [],
    clientAges: [],
    whyClients: [],
    keywords: "",
    unique: "",
    proof: "",
    includes: [],
    extraFeatures: [],
    resources: {
      images: "",
      logo: "",
      content: "",
      hosting: "",
      ssl: "",
    },
    competitors: "",
    updateFrequency: "",
    training: "",
    extra: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto py-6 md:py-12 px-4 sm:px-6 mt-8">
      {/* <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-slate-800">Website Questionnaire</h2> */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 mt-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-xl md:text-4xl font-bold mb-4 md:mb-8 text-brand-green text-center uppercase tracking-tight">WEB PROJECT</h1>
        {/* Basic Info */}
        <div>
          <label className="block text-sm font-medium mb-1">Your Name *</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Name *</label>
          <input name="company" type="text" onChange={handleChange} placeholder="Company Name" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile *</label>
          <input name="mobile" type="tel" onChange={handleChange} placeholder="Mobile" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input name="address" onChange={handleChange} placeholder="Address" className="w-full border px-3 py-2 rounded" />
        </div>

        {/* Site Details */}
        <div>
          <label className="block text-sm font-medium mb-1">Do you have a URL in mind?</label>
          <input name="urlIdea" onChange={handleChange} placeholder="www.example.com" className="w-full border px-3 py-2 rounded" />
        </div>

        {/* Hosting Question */}
        <div>
          <label className="block text-sm font-medium mb-2">Do you need hosting?</label>
          <div className="flex gap-4">
            <label className="flex items-center"><input type="radio" name="hosting" value="Yes" onChange={handleChange} className="mr-2" /> Yes</label>
            <label className="flex items-center"><input type="radio" name="hosting" value="No" onChange={handleChange} className="mr-2" /> No</label>
          </div>
        </div>

        {/* Conditional: Hosting Details */}
        {form.hosting === "Yes" && (
          <div className="ml-4 p-4 bg-gray-50 rounded border-l-4 border-brand-cyan">
            <label className="block text-sm font-medium mb-1">Preferred hosting provider?</label>
            <input name="hostingProvider" onChange={handleChange} placeholder="e.g., AWS, Bluehost, HostGator" className="w-full border px-3 py-2 rounded" />
          </div>
        )}

        {/* Domain Question */}
        <div>
          <label className="block text-sm font-medium mb-2">Do you need us to buy domain?</label>
          <div className="flex gap-4">
            <label className="flex items-center"><input type="radio" name="buyDomain" value="Yes" onChange={handleChange} className="mr-2" /> Yes</label>
            <label className="flex items-center"><input type="radio" name="buyDomain" value="No" onChange={handleChange} className="mr-2" /> No</label>
          </div>
        </div>

        {/* Conditional: Domain Details */}
        {form.buyDomain === "Yes" && (
          <div className="ml-4 p-4 bg-gray-50 rounded border-l-4 border-brand-cyan">
            <label className="block text-sm font-medium mb-1">Preferred domain name?</label>
            <input name="domainName" onChange={handleChange} placeholder="yourdomain.com" className="w-full border px-3 py-2 rounded" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Any Deadline?</label>
          <input name="deadline" type="date" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Budget *</label>
          <input name="budget" onChange={handleChange} placeholder="Your budget" className="w-full border px-3 py-2 rounded" />
        </div>

        {/* Multi Select */}
        <div>
          <label className="block text-sm font-medium mb-2">I want this site because:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Build awareness",
              "Offer contact",
              "Better brand image",
              "Sell products",
              "Customer loyalty",
              "Reach multiple languages",
              "Promote services",
              "Own reasons",
            ].map((item) => (
              <label key={item} className="flex items-center">
                <input type="checkbox" name="reasons" value={item} onChange={handleChange} className="mr-2" /> {item}
              </label>
            ))}
          </div>
        </div>

        {/* Conditional: Own Reasons */}
        {form.reasons.includes("Own reasons") && (
          <div className="ml-4 p-4 bg-gray-50 rounded border-l-4 border-brand-cyan">
            <label className="block text-sm font-medium mb-1">Please specify your reason</label>
            <textarea name="otherReason" onChange={handleChange} placeholder="Describe your reason" className="w-full border px-3 py-2 rounded" rows="3" />
          </div>
        )}

        {/* E-commerce Question */}
        <div>
          <label className="block text-sm font-medium mb-2">Do you want to sell products online?</label>
          <div className="flex gap-4">
            <label className="flex items-center"><input type="radio" name="ecommerce" value="Yes" onChange={handleChange} className="mr-2" /> Yes</label>
            <label className="flex items-center"><input type="radio" name="ecommerce" value="No" onChange={handleChange} className="mr-2" /> No</label>
          </div>
        </div>

        {/* Conditional: E-commerce Details */}
        {form.ecommerce === "Yes" && (
          <div className="ml-4 p-4 bg-gray-50 rounded border-l-4 border-brand-cyan space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">How many products approximately?</label>
              <input name="productCount" onChange={handleChange} placeholder="e.g., 50, 100, 500+" className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Payment gateway needed?</label>
              <div className="space-y-2">
                {["Stripe", "PayPal", "Razorpay", "Other"].map((item) => (
                  <label key={item} className="flex items-center">
                    <input type="checkbox" name="paymentGateways" value={item} onChange={handleChange} className="mr-2" /> {item}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Training Question */}
        <div>
          <label className="block text-sm font-medium mb-2">Do you need training to manage the website?</label>
          <div className="flex gap-4">
            <label className="flex items-center"><input type="radio" name="training" value="Yes" onChange={handleChange} className="mr-2" /> Yes</label>
            <label className="flex items-center"><input type="radio" name="training" value="No" onChange={handleChange} className="mr-2" /> No</label>
          </div>
        </div>

        {/* Conditional: Training Details */}
        {form.training === "Yes" && (
          <div className="ml-4 p-4 bg-gray-50 rounded border-l-4 border-brand-cyan">
            <label className="block text-sm font-medium mb-1">What type of training do you prefer?</label>
            <div className="space-y-2">
              {["Online", "In-person", "Video tutorials", "Documentation"].map((item) => (
                <label key={item} className="flex items-center">
                  <input type="radio" name="trainingType" value={item} onChange={handleChange} className="mr-2" /> {item}
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Any additional requirements?</label>
          <textarea name="extra" onChange={handleChange} placeholder="Tell us anything else" className="w-full border px-3 py-2 rounded" rows="3" />
        </div>

        <button type="submit" className="w-full bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-cyan transition">
          Submit
        </button>
      </form>
    </div>
  );
}