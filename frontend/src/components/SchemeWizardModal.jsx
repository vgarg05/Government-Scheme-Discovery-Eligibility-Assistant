import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  User,
  MapPin,
  Users,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

const INDIAN_STATES = [
  'Uttar Pradesh',
  'Madhya Pradesh',
  'West Bengal',
  'Odisha',
  'Maharashtra',
  'Telangana',
  'Rajasthan',
  'Delhi',
  'Bihar',
  'Punjab',
  'Tamil Nadu',
  'Karnataka',
  'Haryana',
  'Gujarat',
  'Andhra Pradesh',
  'Kerala',
  'Assam',
  'Jharkhand',
  'Chhattisgarh',
  'Uttarakhand',
  'Himachal Pradesh',
];

const OCCUPATIONS = [
  'Farmer',
  'Student',
  'Street Vendor',
  'Unorganized Worker',
  'Artisan / Craftsman',
  'Senior Citizen',
  'Self-Employed / Trader',
  'Unemployed',
  'Employed (Private/Govt)',
];

export default function SchemeWizardModal({ isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: 'Female',
    age: 45,
    state: 'Uttar Pradesh',
    residence_area: 'Rural',
    category: 'OBC',
    is_differently_abled: false,
    is_minority: false,
    employment_status: 'Farmer',
    income: 80000,
    bpl_status: true,
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl overflow-hidden shadow-2xl rounded-2xl border"
        style={{
          background: 'var(--card-bg, #FFFFFF)',
          borderColor: 'var(--border, #E5E7EB)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--border, #E5E7EB)', background: '#F9FAFB' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 text-white rounded-lg bg-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Find Eligible Schemes (myScheme Wizard)
              </h3>
              <p className="text-xs text-gray-500">
                Step {step} of 4 &bull; Help us discover government welfare schemes tailored for you
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5">
          <div
            className="bg-emerald-600 h-1.5 transition-all duration-300 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* STEP 1: Gender & Age */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 text-emerald-600" />
                <span>Basic Demographic Profile</span>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Select Gender <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Male', 'Female', 'Transgender'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleChange('gender', g)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        formData.gender === g
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm font-semibold'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Your Age (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="110"
                  value={formData.age}
                  onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                />
                <div className="flex gap-2 mt-2">
                  {[18, 25, 45, 60, 70].map((ageVal) => (
                    <button
                      key={ageVal}
                      type="button"
                      onClick={() => handleChange('age', ageVal)}
                      className="px-2.5 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      {ageVal} yrs
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: State & Residence Area */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Geographic Location</span>
              </div>

              {/* State Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  State / Union Territory <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium bg-white"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area of Residence */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Area of Residence <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Rural (Village / Gram Panchayat)', value: 'Rural' },
                    { label: 'Urban (City / Municipality)', value: 'Urban' },
                  ].map((area) => (
                    <button
                      key={area.value}
                      type="button"
                      onClick={() => handleChange('residence_area', area.value)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium text-left transition-all ${
                        formData.residence_area === area.value
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm font-semibold'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      {area.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Category & Special Status */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Social Category & Special Criteria</span>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Social Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['General', 'OBC', 'SC', 'ST', 'EWS'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleChange('category', cat)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                        formData.category === cat
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_differently_abled}
                    onChange={(e) => handleChange('is_differently_abled', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-semibold text-gray-800">
                      Differently Abled (PwD / Divyangjan)
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Check if you have 40%+ benchmark disability status
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_minority}
                    onChange={(e) => handleChange('is_minority', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-semibold text-gray-800">Minority Status</div>
                    <div className="text-[11px] text-gray-500">
                      Muslim, Sikh, Christian, Jain, Buddhist, or Parsi community
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.bpl_status}
                    onChange={(e) => handleChange('bpl_status', e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-semibold text-gray-800">
                      BPL / Ration Card Holder
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Holds BPL, AAY (Antyodaya), or Priority Household ration card
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Occupation & Income */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>Occupation & Economic Status</span>
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Occupation / Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.employment_status}
                  onChange={(e) => handleChange('employment_status', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium bg-white"
                >
                  {OCCUPATIONS.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              {/* Annual Income */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Annual Family Income (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="5000"
                  value={formData.income}
                  onChange={(e) => handleChange('income', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {[50000, 80000, 150000, 250000, 500000].map((incVal) => (
                    <button
                      key={incVal}
                      type="button"
                      onClick={() => handleChange('income', incVal)}
                      className="px-2.5 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      ₹{incVal.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" /> Discover Eligible Schemes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
