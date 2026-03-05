import React, { useState, useCallback } from "react";
import usePageMeta from "../hooks/usePageMeta";
import { submitWebProject } from "../services/api";
import { motion, AnimatePresence } from "framer-motion"; // Added motion
import ReviewSummaryCard from "../components/features/forms/ReviewSummaryCard";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppProject() {
  usePageMeta('Web App Project', 'Plan your web project with Tekunik — step-by-step intake form for custom web development.');
  const [step, setStep] = useState(1);
  const [showAdvice, setShowAdvice] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [agreed, setAgreed] = useState(false); // For final submit
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

  const TOTAL_STEPS = 6;

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
    // Clear error if user starts typing
    if (status.error) setStatus(prev => ({ ...prev, error: null }));
  };

  const removeTag = useCallback((key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((v) => v !== value),
    }));
  }, []);

  const validateStep = () => {
    if (step === 1) {
      const required = ["name", "email", "company", "mobile", "budget"];
      const missing = required.filter(field => !form[field]);
      if (missing.length > 0) {
        setStatus(prev => ({
          ...prev,
          error: `Please fill in all mandatory (*) fields: ${missing.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(", ")}`
        }));
        return false;
      }
    }
    return true;
  };

  const handleUpdate = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const prevStep = () => setStep((s) => s - 1);

  // 3. Styling Classes
  const inputClass = "w-full mt-1 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan outline-none transition-all";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1";
  const sectionClass = "space-y-6";

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-25 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">

        {/* Progress Header */}
        <div className="bg-brand-green p-8 text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black tracking-tight uppercase">Web Project Intake</h1>
            <span className="bg-brand-green/60 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Step {step} of {TOTAL_STEPS}</span>
          </div>
          <p className="text-white/80 my-3 text-sm uppercase font-bold tracking-widest">
            {step === TOTAL_STEPS ? "Final Review" : `Step ${step} of ${TOTAL_STEPS} — ${Math.round((step / TOTAL_STEPS) * 100)}% Completed`}
          </p>
          <div className="w-full bg-black/10 h-2 rounded-full">
            <div
              className="bg-white h-2 rounded-full transition-all duration-700"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={async (e) => {
          e.preventDefault();
          if (!agreed) return;

          setStatus({ loading: true, success: false, error: null });
          try {
            await submitWebProject(form);
            setStatus({ loading: false, success: true, error: null });
            // Reset form
            setForm({ name: "", company: "", email: "", mobile: "", address: "", urlIdea: "", hosting: "", hostingProvider: "", buyDomain: "", domainName: "", deadline: "", budget: "", reasons: [], otherReason: "", ecommerce: "", productCount: "", paymentGateways: [], training: "", trainingType: "", extra: "" });
            setStep(1);
            setAgreed(false);
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
          } catch (err) {
            setStatus({ loading: false, success: false, error: err.message || 'Failed to submit. Please try again.' });
          }
        }} className="p-8 md:p-12">

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className={sectionClass}
            >
              {/* STEP 1: MANDATORY CONTACT INFO */}
              {step === 1 && (
                <>
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
                </>
              )}

              {/* STEP 2: DOMAIN & HOSTING (BRANCHING) */}
              {step === 2 && (
                <>
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
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-brand-cyan/10 border-l-4 border-brand-cyan rounded-r-xl overflow-hidden">
                        <label className={labelClass}>Preferred hosting provider?</label>
                        <input name="hostingProvider" onChange={handleChange} value={form.hostingProvider} className={inputClass} placeholder="e.g. AWS, Bluehost" />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className={labelClass}>Do you need us to buy a domain?</label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer"><input type="radio" name="buyDomain" value="Yes" onChange={handleChange} checked={form.buyDomain === "Yes"} className="mr-2 w-4 h-4" /> Yes</label>
                      <label className="flex items-center cursor-pointer"><input type="radio" name="buyDomain" value="No" onChange={handleChange} checked={form.buyDomain === "No"} className="mr-2 w-4 h-4" /> No</label>
                    </div>
                    {form.buyDomain === "Yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-brand-cyan/10 border-l-4 border-brand-cyan rounded-r-xl overflow-hidden">
                        <label className={labelClass}>Preferred domain name?</label>
                        <input name="domainName" onChange={handleChange} value={form.domainName} className={inputClass} placeholder="yourdomain.com" />
                      </motion.div>
                    )}
                  </div>
                </>
              )}

              {/* STEP 3: GOALS & REASONS */}
              {step === 3 && (
                <>
                  <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 3: Site Goals</h2>
                  <label className={labelClass}>I want this site because (Select all that apply):</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Build awareness", "Offer contact", "Better brand image", "Sell products", "Customer loyalty", "Promote services", "Own reasons"].map((item) => (
                      <label key={item} className={`flex items-center p-3 border rounded-xl hover:bg-slate-50 cursor-pointer transition ${form.reasons.includes(item) ? 'border-brand-green bg-brand-green/5' : ''}`}>
                        <input type="checkbox" name="reasons" value={item} onChange={handleChange} checked={form.reasons.includes(item)} className="mr-3 w-4 h-4" />
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </label>
                    ))}
                  </div>
                  {form.reasons.includes("Own reasons") && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-50 border-l-4 border-slate-400 rounded-r-xl">
                      <label className={labelClass}>Please specify your reason</label>
                      <textarea name="otherReason" onChange={handleChange} value={form.otherReason} className={inputClass} rows="3" />
                    </motion.div>
                  )}
                </>
              )}

              {/* STEP 4: E-COMMERCE (BRANCHING) */}
              {step === 4 && (
                <>
                  <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 4: Features</h2>
                  <div className="space-y-4">
                    <label className={labelClass}>Do you want to sell products online?</label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer"><input type="radio" name="ecommerce" value="Yes" onChange={handleChange} checked={form.ecommerce === "Yes"} className="mr-2 w-4 h-4" /> Yes</label>
                      <label className="flex items-center cursor-pointer"><input type="radio" name="ecommerce" value="No" onChange={handleChange} checked={form.ecommerce === "No"} className="mr-2 w-4 h-4" /> No</label>
                    </div>
                    {form.ecommerce === "Yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-6 bg-green-50 border-l-4 border-green-500 rounded-r-xl space-y-4 overflow-hidden">
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
                      </motion.div>
                    )}
                  </div>
                </>
              )}

              {/* STEP 5: TRAINING & ADVICE */}
              {step === 5 && (
                <>
                  <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 5: Final Details</h2>

                  <div className="space-y-4">
                    <label className={labelClass}>Do you need training to manage the website?</label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer"><input type="radio" name="training" value="Yes" onChange={handleChange} checked={form.training === "Yes"} className="mr-2 w-4 h-4" /> Yes</label>
                      <label className="flex items-center cursor-pointer"><input type="radio" name="training" value="No" onChange={handleChange} checked={form.training === "No"} className="mr-2 w-4 h-4" /> No</label>
                    </div>
                    {form.training === "Yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-slate-50 border-l-4 border-slate-400 rounded-r-xl overflow-hidden">
                        <label className={labelClass}>Preferred training type?</label>
                        <select name="trainingType" onChange={handleChange} value={form.trainingType} className={inputClass}>
                          <option value="">Select an option</option>
                          <option value="Online">Online Video Call</option>
                          <option value="Video tutorials">Recorded Video Tutorials</option>
                          <option value="Documentation">PDF/Written Documentation</option>
                        </select>
                      </motion.div>
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
                      <div className="mt-4 space-y-3 pt-4 border-t border-brand-green/40">
                        {getAdvice().length > 0 ? (
                          getAdvice().map((item, i) => <p key={i} className="text-sm font-medium bg-brand-green/50 p-3 rounded-lg">{item}</p>)
                        ) : (
                          <p className="text-sm italic opacity-80">Fill in your budget and feature needs for personalized advice.</p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* STEP 6: REVIEW & SUBMIT */}
              {step === 6 && (
                <>
                  <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Final Review: Web Project</h2>
                  <div className="space-y-6">
                    <ReviewSummaryCard
                      title="Step 1: Basic Information"
                      onUpdate={handleUpdate}
                      onRemoveTag={removeTag}
                      items={[
                        { label: "Name", value: form.name, key: "name" },
                        { label: "Email", value: form.email, key: "email", type: "email" },
                        { label: "Company", value: form.company, key: "company" },
                        { label: "Mobile", value: form.mobile, key: "mobile", type: "tel" },
                        { label: "Address", value: form.address, key: "address" },
                        { label: "Budget", value: form.budget, key: "budget", type: "number" },
                        { label: "Deadline", value: form.deadline, key: "deadline", type: "date" },
                      ]}
                    />

                    <ReviewSummaryCard
                      title="Step 2: Domain & Hosting"
                      onUpdate={handleUpdate}
                      onRemoveTag={removeTag}
                      items={[
                        { label: "URL Idea", value: form.urlIdea, key: "urlIdea" },
                        { label: "Need Hosting", value: form.hosting, key: "hosting", type: "select", options: ["Yes", "No"] },
                        { label: "Provider", value: form.hostingProvider, key: "hostingProvider" },
                        { label: "Buy Domain", value: form.buyDomain, key: "buyDomain", type: "select", options: ["Yes", "No"] },
                        { label: "Domain Name", value: form.domainName, key: "domainName" },
                      ]}
                    />

                    <ReviewSummaryCard
                      title="Step 3: Site Goals"
                      onUpdate={handleUpdate}
                      onRemoveTag={removeTag}
                      items={[
                        { label: "Reasons", value: form.reasons, key: "reasons", type: "tags" },
                        { label: "Other Reason", value: form.otherReason, key: "otherReason", type: "textarea" },
                      ]}
                    />

                    <ReviewSummaryCard
                      title="Step 4: Features"
                      onUpdate={handleUpdate}
                      onRemoveTag={removeTag}
                      items={[
                        { label: "E-Commerce", value: form.ecommerce, key: "ecommerce", type: "select", options: ["Yes", "No"] },
                        { label: "Products", value: form.productCount, key: "productCount" },
                        { label: "Gateways", value: form.paymentGateways, key: "paymentGateways", type: "tags" },
                      ]}
                    />

                    <ReviewSummaryCard
                      title="Step 5: Training & Extra"
                      onUpdate={handleUpdate}
                      onRemoveTag={removeTag}
                      items={[
                        { label: "Need Training", value: form.training, key: "training", type: "select", options: ["Yes", "No"] },
                        { label: "Training Type", value: form.trainingType, key: "trainingType", type: "select", options: ["Online", "Video tutorials", "Documentation"] },
                        { label: "Requirements", value: form.extra, key: "extra", type: "textarea" },
                      ]}
                    />

                    {/* Final Submission Section Moved Inline */}
                    <div className="mt-12 bg-slate-50 rounded-2xl p-8 border border-slate-200">
                      <h3 className="font-bold text-slate-800 text-lg mb-4">Complete Your Submission</h3>
                      <div className="flex flex-col gap-6">
                        <label className="flex items-start gap-3 cursor-pointer select-none group">
                          <div className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${agreed ? 'bg-brand-green border-brand-green' : 'border-slate-300 group-hover:border-brand-green'}`}>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={agreed}
                              onChange={(e) => setAgreed(e.target.checked)}
                            />
                            {agreed && <Check size={16} className="text-white" strokeWidth={4} />}
                          </div>
                          <span className="text-sm font-medium text-slate-600 leading-tight">
                            I have reviewed all the information above and confirm that it is correct to the best of my knowledge.
                          </span>
                        </label>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-200">
                          <Link to="/" className="text-slate-500 font-bold hover:text-slate-800 transition text-sm">
                            Back to Home
                          </Link>

                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="flex-1 sm:flex-none text-slate-500 font-bold hover:text-slate-800 transition px-6 py-3"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={status.loading || !agreed}
                              className={`flex-1 sm:flex-none px-10 py-3 rounded-xl font-bold shadow-lg transition active:scale-95 ${status.loading || !agreed
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                            >
                              {status.loading ? 'Submitting...' : 'Final Submit Project'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* STATUS MESSAGES */}
          {status.error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
              ⚠️ {status.error}
            </motion.div>
          )}
          {status.success && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-semibold">
              🎉 Your project has been submitted successfully! We'll get back to you soon.
            </motion.div>
          )}

          {/* NAVIGATION BUTTONS (Step 1-5) */}
          {step < 6 && (
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
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-cyan shadow-lg transition active:scale-95 flex items-center gap-2"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
