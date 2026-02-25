import React, { useState } from "react";
import usePageMeta from "../hooks/usePageMeta";
import { submitWebProject } from "../services/api";

export default function AppProject() {
  usePageMeta('Web App Project', 'Plan your web project with Tekunik — step-by-step intake form for custom web development.');
  const [step, setStep] = useState(1);
  const [showAdvice, setShowAdvice] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [form, setForm] = useState({
    name: "", company: "", email: "", mobile: "", address: "",
    urlIdea: "", hosting: "", hostingProvider: "",
    buyDomain: "", domainName: "",
    deadline: "", budget: "",
    reasons: [], otherReason: "",
    ecommerce: "", productCount: "", paymentGateways: [],
    training: "", trainingType: "",
    extra: "",
  });

  // 1. Logic for expert advice based on user selection
  const getAdvice = () => {
    const advice = [];
    if (form.budget && parseInt(form.budget) < 1000) advice.push("• For budgets under $1000, we recommend a high-quality CMS template to maximize value.");
    if (form.ecommerce === "Yes") advice.push("• E-commerce projects benefit from Stripe integration for the most secure and seamless checkout experience.");
    if (form.hosting === "No" && !form.urlIdea) advice.push("• Since you don't have hosting or a URL yet, we recommend a '.com' domain for better global SEO.");
    if (form.training === "Yes") advice.push("• We offer video tutorials which you can re-watch any time your staff changes.");
    return advice;
  };

  // 2. State Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let arr = [...(form[name] || [])];
      if (checked) arr.push(value);
      else arr = arr.filter((v) => v !== value);
      setForm((prev) => ({ ...prev, [name]: arr }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // 3. Styling Classes
  const inputClass = "w-full mt-1 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan outline-none transition-all";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1";
  const sectionClass = "space-y-6 animate-in fade-in duration-500";

  return (
    <div className="min-h-screen bg-slate-50 py-25 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

        {/* Progress Header */}
        <div className="bg-brand-green p-8 text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black tracking-tight uppercase">Web Project Intake</h1>
            <span className="bg-brand-green/60 px-3 py-1 rounded-full text-xs font-bold">Step {step} of 5</span>
          </div>
          <p className="text-white/80 my-3 text-sm uppercase font-bold tracking-widest">
            Step {step} of 5 — {Math.round((step / 5) * 100)}% Completed
          </p>
          <div className="w-full bg-black/10 h-2 rounded-full">
            <div
              className="bg-white h-2 rounded-full transition-all duration-700"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={async (e) => {
          e.preventDefault();
          if (!form.name || !form.email || !form.mobile) {
            setStatus({ loading: false, success: false, error: 'Please fill in all required fields (Name, Email, Mobile).' });
            return;
          }
          setStatus({ loading: true, success: false, error: null });
          try {
            await submitWebProject(form);
            setStatus({ loading: false, success: true, error: null });
            setForm({ name: "", company: "", email: "", mobile: "", address: "", urlIdea: "", hosting: "", hostingProvider: "", buyDomain: "", domainName: "", deadline: "", budget: "", reasons: [], otherReason: "", ecommerce: "", productCount: "", paymentGateways: [], training: "", trainingType: "", extra: "" });
            setStep(1);
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
          } catch (err) {
            setStatus({ loading: false, success: false, error: err.message || 'Failed to submit. Please try again.' });
          }
        }} className="p-8 md:p-12">

          {/* STEP 1: MANDATORY CONTACT INFO */}
          {step === 1 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 1: Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Your Name *</label><input name="name" onChange={handleChange} value={form.name} className={inputClass} placeholder="Full Name" /></div>
                <div><label className={labelClass}>Email *</label><input name="email" type="email" onChange={handleChange} value={form.email} className={inputClass} placeholder="email@company.com" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Company Name *</label><input name="company" onChange={handleChange} value={form.company} className={inputClass} /></div>
                <div><label className={labelClass}>Mobile *</label><input name="mobile" type="tel" onChange={handleChange} value={form.mobile} className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>Address</label><input name="address" onChange={handleChange} value={form.address} className={inputClass} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Estimated Budget *</label><input name="budget" type="number" onChange={handleChange} value={form.budget} className={inputClass} placeholder="e.g. 2000" /></div>
                <div><label className={labelClass}>Project Deadline</label><input name="deadline" type="date" onChange={handleChange} value={form.deadline} className={inputClass} /></div>
              </div>
            </div>
          )}

          {/* STEP 2: DOMAIN & HOSTING (BRANCHING) */}
          {step === 2 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 2: Domain & Hosting</h2>
              <div>
                <label className={labelClass}>Do you have a URL in mind?</label>
                <input name="urlIdea" onChange={handleChange} value={form.urlIdea} className={inputClass} placeholder="www.example.com" />
              </div>

              <div className="space-y-4">
                <label className={labelClass}>Do you need hosting?</label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="hosting" value="Yes" onChange={handleChange} checked={form.hosting === "Yes"} className="mr-2 w-4 h-4" /> Yes</label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="hosting" value="No" onChange={handleChange} checked={form.hosting === "No"} className="mr-2 w-4 h-4" /> No</label>
                </div>
                {form.hosting === "Yes" && (
                  <div className="p-4 bg-brand-cyan/10 border-l-4 border-brand-cyan rounded-r-xl animate-in slide-in-from-left-2">
                    <label className={labelClass}>Preferred hosting provider?</label>
                    <input name="hostingProvider" onChange={handleChange} value={form.hostingProvider} className={inputClass} placeholder="e.g. AWS, Bluehost" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className={labelClass}>Do you need us to buy a domain?</label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="buyDomain" value="Yes" onChange={handleChange} checked={form.buyDomain === "Yes"} className="mr-2 w-4 h-4" /> Yes</label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="buyDomain" value="No" onChange={handleChange} checked={form.buyDomain === "No"} className="mr-2 w-4 h-4" /> No</label>
                </div>
                {form.buyDomain === "Yes" && (
                  <div className="p-4 bg-brand-cyan/10 border-l-4 border-brand-cyan rounded-r-xl animate-in slide-in-from-left-2">
                    <label className={labelClass}>Preferred domain name?</label>
                    <input name="domainName" onChange={handleChange} value={form.domainName} className={inputClass} placeholder="yourdomain.com" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: GOALS & REASONS */}
          {step === 3 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 3: Site Goals</h2>
              <label className={labelClass}>I want this site because (Select all that apply):</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Build awareness", "Offer contact", "Better brand image", "Sell products", "Customer loyalty", "Promote services", "Own reasons"].map((item) => (
                  <label key={item} className="flex items-center p-3 border rounded-xl hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" name="reasons" value={item} onChange={handleChange} checked={form.reasons.includes(item)} className="mr-3 w-4 h-4" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </label>
                ))}
              </div>
              {form.reasons.includes("Own reasons") && (
                <div className="p-4 bg-slate-50 border-l-4 border-slate-400 rounded-r-xl animate-in slide-in-from-left-2">
                  <label className={labelClass}>Please specify your reason</label>
                  <textarea name="otherReason" onChange={handleChange} value={form.otherReason} className={inputClass} rows="3" />
                </div>
              )}
            </div>
          )}

          {/* STEP 4: E-COMMERCE (BRANCHING) */}
          {step === 4 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 4: Features</h2>
              <div className="space-y-4">
                <label className={labelClass}>Do you want to sell products online?</label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="ecommerce" value="Yes" onChange={handleChange} checked={form.ecommerce === "Yes"} className="mr-2 w-4 h-4" /> Yes</label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="ecommerce" value="No" onChange={handleChange} checked={form.ecommerce === "No"} className="mr-2 w-4 h-4" /> No</label>
                </div>
                {form.ecommerce === "Yes" && (
                  <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-r-xl space-y-4 animate-in slide-in-from-left-2">
                    <div>
                      <label className={labelClass}>How many products approximately?</label>
                      <input name="productCount" onChange={handleChange} value={form.productCount} className={inputClass} placeholder="e.g. 50" />
                    </div>
                    <div>
                      <label className={labelClass}>Payment gateways needed?</label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {["Stripe", "PayPal", "Razorpay", "Other"].map(gw => (
                          <label key={gw} className="flex items-center text-sm"><input type="checkbox" name="paymentGateways" value={gw} onChange={handleChange} checked={form.paymentGateways.includes(gw)} className="mr-2" /> {gw}</label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: TRAINING & ADVICE */}
          {step === 5 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 5: Final Details</h2>

              <div className="space-y-4">
                <label className={labelClass}>Do you need training to manage the website?</label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="training" value="Yes" onChange={handleChange} checked={form.training === "Yes"} className="mr-2 w-4 h-4" /> Yes</label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="training" value="No" onChange={handleChange} checked={form.training === "No"} className="mr-2 w-4 h-4" /> No</label>
                </div>
                {form.training === "Yes" && (
                  <div className="p-4 bg-slate-50 border-l-4 border-slate-400 rounded-r-xl animate-in slide-in-from-left-2">
                    <label className={labelClass}>Preferred training type?</label>
                    <select name="trainingType" onChange={handleChange} value={form.trainingType} className={inputClass}>
                      <option value="">Select an option</option>
                      <option value="Online">Online Video Call</option>
                      <option value="Video tutorials">Recorded Video Tutorials</option>
                      <option value="Documentation">PDF/Written Documentation</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className={labelClass}>Additional Requirements</label>
                <textarea name="extra" onChange={handleChange} value={form.extra} className={inputClass} rows="3" placeholder="Anything else we missed?" />
              </div>

              {/* ADVICE ENGINE SECTION */}
              <div className="mt-8 bg-brand-green rounded-2xl p-6 text-white shadow-lg">
                <button
                  type="button"
                  onClick={() => setShowAdvice(!showAdvice)}
                  className="w-full flex justify-between items-center font-bold text-lg"
                >
                  <span>💡 Professional Recommendations</span>
                  <span>{showAdvice ? "▲" : "▼"}</span>
                </button>
                {showAdvice && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-brand-green/40 animate-in slide-in-from-top-2">
                    {getAdvice().length > 0 ? (
                      getAdvice().map((item, i) => <p key={i} className="text-sm font-medium bg-brand-green/50 p-3 rounded-lg">{item}</p>)
                    ) : (
                      <p className="text-sm italic opacity-80">Fill in your budget and feature needs for personalized advice.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STATUS MESSAGES */}
          {status.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">{status.error}</div>
          )}
          {status.success && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-semibold">🎉 Your project has been submitted successfully! We'll get back to you soon.</div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="text-slate-500 font-bold hover:text-slate-800 transition px-4 py-2"
              >
                Back
              </button>
            )}
            <div className="ml-auto">
              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-cyan shadow-lg transition active:scale-95"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status.loading}
                  className={`bg-green-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg transition active:scale-95 ${status.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                >
                  {status.loading ? 'Submitting...' : 'Submit Project'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}