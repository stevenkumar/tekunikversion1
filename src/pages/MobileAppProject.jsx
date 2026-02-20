import React, { useState } from "react";

export default function MobileAppProject() {
  const [step, setStep] = useState(1);
  const [showAdvice, setShowAdvice] = useState(false);
  const [form, setForm] = useState({
    // Step 1: Identity & Constraints
    name: "", company: "", email: "", mobile: "", budget: "", deadline: "",
    // Step 2: App Core
    summary: "", parts: [], platforms: "", orientation: "",
    // Step 3: Strategy
    targetUsers: "", objectives: "", phases: "", freePaid: "",
    // Step 4: Technical (The "Yes" Logic)
    backend: "", tech: "", host: "", hostProvider: "",
    payment: "", thirdParty: [], 
    // Step 5: Final
    appStoreLaunch: "", maintenance: "", extra: ""
  });

  // 1. Mobile-Specific Advice Engine
  const getExpertAdvice = () => {
    const advice = [];
    if (form.platforms === "Both") advice.push("• Strategy: For both iOS & Android, we recommend Flutter or React Native to save 40% on development costs.");
    if (form.phases === "MVP (Minimum Viable Product)") advice.push("• MVP Tip: Focus only on 1 core feature to launch faster and gather user feedback.");
    if (form.payment === "Yes") advice.push("• Security: Since you need payments, we'll implement PCI-compliant encryption for user data.");
    if (form.freePaid === "Paid App") advice.push("• Monetization: Remember that Apple and Google take a 15-30% commission on app store purchases.");
    return advice;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
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

  // Styling Helpers
  const inputClass = "w-full mt-1 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1";
  const sectionClass = "space-y-6 animate-in fade-in duration-500";

  return (
    <div className="min-h-screen bg-slate-50 py-25 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Progress Header */}
        <div className="bg-indigo-600 p-8 text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black tracking-tight uppercase">Mobile Project Intake</h1>
            <span className="bg-indigo-800 px-3 py-1 rounded-full text-xs font-bold tracking-widest">STEP {step} OF 5</span>
          </div>
          <p className="text-blue-100 my-3 text-sm uppercase font-bold tracking-widest">
            Step {step} of 5 — {Math.round((step / 5) * 100)}% Completed
          </p>
          <div className="w-full bg-indigo-900/30 h-2 rounded-full">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-700" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="p-8 md:p-12">
          
          {/* STEP 1: CONTACT & BUDGET */}
          {step === 1 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 1: Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Full Name *</label><input name="name" onChange={handleChange} value={form.name} className={inputClass} placeholder="John Doe" /></div>
                <div><label className={labelClass}>Email *</label><input name="email" type="email" onChange={handleChange} value={form.email} className={inputClass} placeholder="john@company.com" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Company Name</label><input name="company" onChange={handleChange} value={form.company} className={inputClass} /></div>
                <div><label className={labelClass}>Mobile *</label><input name="mobile" onChange={handleChange} value={form.mobile} className={inputClass} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>App Budget ($)</label><input name="budget" type="number" onChange={handleChange} value={form.budget} className={inputClass} placeholder="e.g. 10000" /></div>
                <div><label className={labelClass}>Target Launch Date</label><input name="deadline" type="date" onChange={handleChange} value={form.deadline} className={inputClass} /></div>
              </div>
            </div>
          )}

          {/* STEP 2: APP FUNDAMENTALS */}
          {step === 2 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 2: App Core</h2>
              <div>
                <label className={labelClass}>Summarize your app idea</label>
                <textarea name="summary" onChange={handleChange} value={form.summary} className={inputClass} rows="3" placeholder="What does the app do?" />
              </div>

              <div>
                <label className={labelClass}>Target Platforms</label>
                <div className="flex gap-6 mt-2">
                  {["iOS", "Android", "Both"].map(plat => (
                    <label key={plat} className="flex items-center cursor-pointer">
                      <input type="radio" name="platforms" value={plat} onChange={handleChange} checked={form.platforms === plat} className="mr-2 w-4 h-4 text-indigo-600" />
                      {plat}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Scope of Work (Select all needed)</label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["UI Design", "UX Research", "App Development", "App Store Launch", "Training"].map((item) => (
                    <label key={item} className="flex items-center p-3 border rounded-xl hover:bg-slate-50 cursor-pointer">
                      <input type="checkbox" name="parts" value={item} onChange={handleChange} checked={form.parts.includes(item)} className="mr-3 w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: STRATEGY & USERS */}
          {step === 3 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 3: Business Strategy</h2>
              <div>
                <label className={labelClass}>Who are the target users?</label>
                <input name="targetUsers" onChange={handleChange} value={form.targetUsers} className={inputClass} placeholder="e.g. Small business owners, Students" />
              </div>
              
              <div>
                <label className={labelClass}>Development Phase</label>
                <select name="phases" onChange={handleChange} value={form.phases} className={inputClass}>
                  <option value="">Select Phase</option>
                  <option value="MVP (Minimum Viable Product)">MVP (Core features only)</option>
                  <option value="Full Version">Full Scale Application</option>
                  <option value="Redesign">Existing App Redesign</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>App Pricing Model</label>
                <div className="flex gap-6 mt-2">
                  {["Free App", "Paid App", "Subscription Based"].map(model => (
                    <label key={model} className="flex items-center cursor-pointer">
                      <input type="radio" name="freePaid" value={model} onChange={handleChange} checked={form.freePaid === model} className="mr-2 w-4 h-4" />
                      {model}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: TECHNICAL BRANCHING */}
          {step === 4 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 4: Technical Specs</h2>
              
              {/* Backend Branch */}
              <div className="space-y-4">
                <label className={labelClass}>Do you need custom Backend/API development?</label>
                <div className="flex gap-6">
                  <label className="flex items-center"><input type="radio" name="backend" value="Yes" onChange={handleChange} checked={form.backend === "Yes"} className="mr-2" /> Yes</label>
                  <label className="flex items-center"><input type="radio" name="backend" value="No" onChange={handleChange} checked={form.backend === "No"} className="mr-2" /> No</label>
                </div>
                {form.backend === "Yes" && (
                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl animate-in slide-in-from-left-2">
                    <label className={labelClass}>Preferred Backend Tech (if any)</label>
                    <input name="tech" onChange={handleChange} value={form.tech} className={inputClass} placeholder="e.g. Node.js, Firebase, Python" />
                  </div>
                )}
              </div>

              {/* Payment Branch */}
              <div className="space-y-4">
                <label className={labelClass}>Do you need Payment Integration?</label>
                <div className="flex gap-6">
                  <label className="flex items-center"><input type="radio" name="payment" value="Yes" onChange={handleChange} checked={form.payment === "Yes"} className="mr-2" /> Yes</label>
                  <label className="flex items-center"><input type="radio" name="payment" value="No" onChange={handleChange} checked={form.payment === "No"} className="mr-2" /> No</label>
                </div>
                {form.payment === "Yes" && (
                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl animate-in slide-in-from-left-2">
                    <label className={labelClass}>Preferred Payment Gateways</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["Stripe", "Apple Pay", "Google Pay", "Razorpay"].map(item => (
                        <label key={item} className="flex items-center text-sm"><input type="checkbox" name="thirdParty" value={item} onChange={handleChange} checked={form.thirdParty.includes(item)} className="mr-2" /> {item}</label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: FINAL & ADVICE */}
          {step === 5 && (
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Step 5: Final Review</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Need help with App Store Launch?</label>
                  <select name="appStoreLaunch" onChange={handleChange} value={form.appStoreLaunch} className={inputClass}>
                    <option value="">Select Option</option>
                    <option value="Yes">Yes, handle everything</option>
                    <option value="No">No, I have my own accounts</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Monthly Maintenance?</label>
                  <select name="maintenance" onChange={handleChange} value={form.maintenance} className={inputClass}>
                    <option value="">Select Option</option>
                    <option value="Yes">Yes, I need support</option>
                    <option value="No">No, one-time build</option>
                  </select>
                </div>
              </div>

              {/* SMART ADVICE PANEL */}
              <div className="mt-8 bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                <button 
                  type="button" 
                  onClick={() => setShowAdvice(!showAdvice)}
                  className="w-full flex justify-between items-center font-bold text-lg"
                >
                  <span>💡 Mobile Expert Recommendations</span>
                  <span>{showAdvice ? "▲" : "▼"}</span>
                </button>
                {showAdvice && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-indigo-400 animate-in slide-in-from-top-2">
                    {getExpertAdvice().length > 0 ? (
                      getExpertAdvice().map((item, i) => <p key={i} className="text-sm font-medium bg-indigo-700/50 p-3 rounded-lg">{item}</p>)
                    ) : (
                      <p className="text-sm italic opacity-80">Provide more details about platforms and payments for custom tips.</p>
                    )}
                  </div>
                )}
              </div>

              <textarea name="extra" onChange={handleChange} value={form.extra} className={inputClass} rows="3" placeholder="Any final thoughts or specific features?" />
            </div>
          )}

          {/* NAVIGATION */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="text-slate-500 font-bold hover:text-slate-800 transition px-4 py-2">
                Back
              </button>
            )}
            <div className="ml-auto">
              {step < 5 ? (
                <button type="button" onClick={nextStep} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition active:scale-95">
                  Next Step
                </button>
              ) : (
                <button type="submit" onClick={() => alert("Mobile App Form Submitted!")} className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg transition active:scale-95">
                  Submit Project
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}