'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const AreaChart = dynamic(() => import('recharts').then((m) => m.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then((m) => m.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((m) => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then((m) => m.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import('recharts').then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then((m) => m.Bar), { ssr: false });

const calculateROI = (employees, hoursSaved, avgSalary, overhead) => {
  const hourlyRate = avgSalary / 2080;
  const weeklySavings = employees * hoursSaved * hourlyRate;
  const overheadCost = overhead * employees;
  const annualSavings = (weeklySavings * 52) - overheadCost;

  return {
    weekly: weeklySavings,
    annual: annualSavings,
    efficiencyBoost: '+42%'
  };
};

export default function RoiCalculator({ compact = false }) {
  const [form, setForm] = useState({ employees: 12, hours: 6, salary: 120000, overhead: 180 });

  const result = useMemo(() => calculateROI(form.employees, form.hours, form.salary, form.overhead), [form]);

  const timelineData = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    month: `M${i + 1}`,
    savings: Math.max(0, (result.weekly * (i + 1) * 4) - form.overhead * form.employees),
    breakEven: result.weekly * (i + 1) * 4 > form.overhead * form.employees ? 'Yes' : 'No',
  })), [result, form]);

  const compareData = [
    { name: 'As-Is', cost: form.employees * form.salary },
    { name: 'MAB-Optimized', cost: form.employees * form.salary - result.annual },
  ];

  return (
    <div className={`card ${compact ? 'p-4 sm:p-6' : 'p-6 sm:p-8'}`}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-gold uppercase tracking-[0.3em] text-xs">ROI Calculator</p>
          <h3 className="text-2xl font-semibold text-alabaster">Find the break-even in minutes</h3>
        </div>
        <button className="button-secondary">Download Full PDF</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
        <div className="space-y-3">
          {[
            { label: 'Employees', key: 'employees', min: 1, max: 250, step: 1 },
            { label: 'Hours saved / week', key: 'hours', min: 1, max: 40, step: 1 },
            { label: 'Avg salary ($)', key: 'salary', min: 40000, max: 300000, step: 1000 },
            { label: 'Software overhead ($/employee)', key: 'overhead', min: 50, max: 500, step: 10 },
          ].map((field) => (
            <label key={field.key} className="block">
              <div className="flex justify-between text-sm text-alabaster/70 mb-1">
                <span>{field.label}</span>
                <span className="text-gold font-semibold">{form[field.key]}</span>
              </div>
              <motion.input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: Number(e.target.value) })}
                className="w-full accent-gold"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              />
            </label>
          ))}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Weekly</p>
              <p className="text-2xl font-semibold">${result.weekly.toFixed(0)}</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Annual</p>
              <p className="text-2xl font-semibold">${result.annual.toLocaleString('en-US')}</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Lift</p>
              <p className="text-2xl font-semibold">{result.efficiencyBoost}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="glass rounded-xl p-3">
            <p className="text-sm text-gold mb-2">12-month projection</p>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#D4AF37" />
                <YAxis stroke="#D4AF37" />
                <Tooltip contentStyle={{ background: '#0B1A30', border: '1px solid #D4AF37', color: '#F8F9FA' }} />
                <Area type="monotone" dataKey="savings" stroke="#D4AF37" fill="url(#colorSavings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-xl p-3">
            <p className="text-sm text-gold mb-2">Cost comparison</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#D4AF37" />
                <YAxis stroke="#D4AF37" />
                <Tooltip contentStyle={{ background: '#0B1A30', border: '1px solid #D4AF37', color: '#F8F9FA' }} />
                <Bar dataKey="cost" fill="#D4AF37" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
