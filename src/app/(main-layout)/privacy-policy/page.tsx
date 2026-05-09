import { Metadata } from "next";
import { Shield, Lock, Database, Users, Globe, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - EcoTrack",
  description: "Learn how EcoTrack protects your privacy and safeguards your data. Our commitment to transparency, security, and GDPR compliance.",
  keywords: ["privacy", "data protection", "GDPR", "security", "supply chain", "AI"],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#080f1e]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-emerald-500/10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <Shield className="w-3 h-3" />
            Privacy & Data Protection
          </div>
          <h1 className="font-syne text-5xl md:text-6xl font-extrabold text-white mb-6">
            Privacy <span className="text-emerald-400">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We are committed to protecting your privacy and ensuring the security of your data.
            Learn how we collect, use, and safeguard your information.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            <span>Last updated: May 9, 2025</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>Effective immediately</span>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h2 className="font-syne text-xl font-bold text-white mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "1. Information We Collect",
              "2. How We Use Your Data",
              "3. Data Sharing & Disclosure",
              "4. Data Security",
              "5. Data Retention",
              "6. Your Rights & Choices",
              "7. Third-Party Services",
              "8. Children's Privacy",
              "9. International Transfers",
              "10. Changes to This Policy",
              "11. Contact Us",
            ].map((item, i) => (
              <a
                key={i}
                href={`#section-${i + 1}`}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm transition-colors group"
              >
                <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs flex items-center justify-center group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10">
                  {i + 1}
                </span>
                {item}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {/* Section 1 */}
          <div id="section-1" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">1. Information We Collect</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                At EcoTrack, we collect information to provide and improve our AI-powered supply chain management platform. The types of data we collect include:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Personal Information</h3>
                  <ul className="text-sm space-y-1.5 list-disc list-inside">
                    <li>Name and contact details</li>
                    <li>Company name and industry</li>
                    <li>Email address and phone number</li>
                    <li>Billing and payment information</li>
                    <li>Login credentials</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Usage & Technical Data</h3>
                  <ul className="text-sm space-y-1.5 list-disc list-inside">
                    <li>Inventory and supply chain data</li>
                    <li>Platform interaction logs</li>
                    <li>AI model training data (anonymized)</li>
                    <li>Device and browser information</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div id="section-2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">2. How We Use Your Data</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                We use the collected information to operate, maintain, and enhance our platform, as well as to provide you with a personalized experience.
              </p>
              <ul className="grid md:grid-cols-2 gap-3 mt-4">
                {[
                  "Provide AI-powered analytics and recommendations",
                  "Process transactions and manage billing",
                  "Improve our algorithms and platform features",
                  "Send important updates and notifications",
                  "Offer customer support",
                  "Conduct research and analytics",
                  "Ensure platform security and prevent fraud",
                  "Comply with legal obligations",
                ].map((use, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div id="section-3" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">3. Data Sharing & Disclosure</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                We do not sell your personal information. We may share data only in the following circumstances:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    title: "Service Providers",
                    desc: "Third-party vendors who assist with platform operations, hosting, and support.",
                  },
                  {
                    title: "Legal Requirements",
                    desc: "When required by law, regulation, or government request.",
                  },
                  {
                    title: "Business Transfers",
                    desc: "During mergers, acquisitions, or asset transfers.",
                  },
                  {
                    title: "With Your Consent",
                    desc: "When you explicitly authorize us to share your data.",
                  },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded bg-white/5 border border-white/10">
                    <h4 className="font-medium text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="section-4" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">4. Data Security</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction:
              </p>
              <ul className="space-y-2 mt-4">
                {[
                  "End-to-end encryption for data in transit and at rest",
                  "Multi-factor authentication and access controls",
                  "Regular security audits and vulnerability assessments",
                  "SOC 2 Type II and GDPR compliance",
                  "Secure data centers with 24/7 monitoring",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div id="section-5" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">5. Data Retention</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                We retain your data only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law:
              </p>
              <div className="grid md:grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Account Data", period: "Duration of account + 30 days" },
                  { label: "Transaction Records", period: "7 years (legal requirement)" },
                  { label: "Analytics Data", period: "Anonymized after 2 years" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-emerald-400 font-bold text-lg">{item.period}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div id="section-6" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">6. Your Rights & Choices</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                You have control over your personal data. Depending on your location, you may exercise the following rights:
              </p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {[
                  "Access your personal data",
                  "Correct inaccurate information",
                  "Request data deletion",
                  "Restrict or object to processing",
                  "Data portability",
                  "Withdraw consent",
                  "Opt-out of marketing communications",
                  " lodge a complaint with a regulator",
                ].map((right, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/10 text-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                    {right}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm">
                To exercise these rights, contact us at privacy@ecotrack.com or through the settings in your account dashboard.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div id="section-7" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">7. Third-Party Services</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                Our platform integrates with trusted third-party services to enhance functionality:
              </p>
              <ul className="space-y-2 mt-4 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Google Cloud & AI Services</strong> — For data processing and machine learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Payment Processors</strong> — Stripe and PayPal for secure transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Analytics Platforms</strong> — For monitoring and improving user experience</span>
                </li>
              </ul>
              <p className="text-sm mt-4">
                These services have their own privacy policies. We encourage you to review them.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div id="section-8" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">8. Children's Privacy</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will promptly delete the data.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div id="section-9" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">9. International Transfers</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                Your data may be transferred to and processed in countries other than your own. We ensure adequate protection through:
              </p>
              <ul className="space-y-2 mt-4 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Standard Contractual Clauses approved by the European Commission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Adequacy decisions for countries with recognized data protection laws</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Your explicit consent for international transfers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 10 */}
          <div id="section-10" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">10. Changes to This Policy</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will notify you via email or through our platform at least 30 days before the changes take effect. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>

          {/* Section 11 */}
          <div id="section-11" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">11. Contact Us</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {[
                  { label: "Email", value: "privacy@ecotrack.com" },
                  { label: "Address", value: "123 Tech Avenue, San Francisco, CA 94107" },
                  { label: "Phone", value: "+1 (555) 123-4567" },
                  { label: "Data Protection Officer", value: "dpo@ecotrack.com" },
                ].map((contact, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs text-emerald-400 mb-1">{contact.label}</div>
                    <div className="text-white font-medium">{contact.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 border-t border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 mb-4">
            Need help understanding your data rights or our privacy practices?
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="mailto:support@ecotrack.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all rounded-lg text-sm"
            >
              Contact Support
            </a>
            <a
              href="/terms-of-service"
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all rounded-lg text-sm"
            >
              View Terms of Service
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
