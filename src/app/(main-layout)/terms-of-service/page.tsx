import { Metadata } from "next";
import { Scale, FileText, Building, Users, DollarSign, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - EcoTrack",
  description: "Terms and conditions for using EcoTrack's AI-powered supply chain management platform. Read about your rights, obligations, and service agreements.",
  keywords: ["terms", "service", "conditions", "SLA", "agreement", "supply chain", "AI"],
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#080f1e]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-emerald-500/10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <Scale className="w-3 h-3" />
            Legal Terms & Conditions
          </div>
          <h1 className="font-syne text-5xl md:text-6xl font-extrabold text-white mb-6">
            Terms of <span className="text-emerald-400">Service</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            These terms govern your use of EcoTrack&apos;s AI-powered supply chain platform.
            Please read them carefully before using our services.
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
              "1. Acceptance of Terms",
              "2. Description of Service",
              "3. User Accounts & Eligibility",
              "4. Subscription & Billing",
              "5. Acceptable Use Policy",
              "6. Intellectual Property",
              "7. Confidentiality",
              "8. Service Level & Availability",
              "9. Limitation of Liability",
              "10. Indemnification",
              "11. Termination",
              "12. Dispute Resolution",
              "13. Miscellaneous",
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
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">1. Acceptance of Terms</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                By accessing or using EcoTrack&apos;s platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.
              </p>
              <p>
                These terms constitute a legally binding agreement between you and EcoTrack Inc. (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;). By creating an account, you confirm that you are at least 18 years old and have the legal capacity to enter into this agreement.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div id="section-2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Building className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">2. Description of Service</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                EcoTrack provides an AI-powered supply chain management platform that includes:
              </p>
              <ul className="grid md:grid-cols-2 gap-3 mt-4 text-sm">
                {[
                  "Inventory forecasting and demand planning",
                  "AI-driven analytics and insights",
                  "Automated content generation",
                  "Smart product tagging",
                  "Supplier management tools",
                  "Real-time dashboards and reporting",
                  "API access for integrations",
                  "Collaboration and team features",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div id="section-3" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">3. User Accounts & Eligibility</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                To use certain features of EcoTrack, you must create an account. You agree to:
              </p>
              <ul className="space-y-2 mt-4 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Provide accurate and complete information during registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Maintain the security of your credentials and account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Notify us immediately of any unauthorized access or activity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Use a strong, unique password</span>
                </li>
              </ul>
              <p className="mt-4 text-sm">
                You are responsible for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div id="section-4" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">4. Subscription & Billing</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                EcoTrack offers both free and paid subscription plans. By selecting a paid plan, you agree to:
              </p>
              <ul className="space-y-2 mt-4 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Pay all applicable fees on time (monthly or annual, based on your plan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Provide valid payment method information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>Automatic renewal unless cancelled before the billing cycle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>All fees are non-refundable unless otherwise stated</span>
                </li>
              </ul>
              <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 mt-4">
                <p className="text-sm">
                  <strong className="text-emerald-400">Price changes:</strong> We may change our fees with 30 days prior notice. Continued use after the change constitutes acceptance of the new prices.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div id="section-5" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">5. Acceptable Use Policy</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                When using EcoTrack, you agree not to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                  <h3 className="font-semibold text-red-400 mb-2 text-sm">Prohibited Activities</h3>
                  <ul className="text-xs space-y-1.5 list-disc list-inside">
                    <li>Violate laws or regulations</li>
                    <li>Infringe intellectual property rights</li>
                    <li>Upload malware or harmful code</li>
                    <li>Attempt unauthorized access</li>
                    <li>Interfere with service operation</li>
                    <li>Impersonate others</li>
                    <li>Send spam or bulk unsolicited messages</li>
                    <li>Reverse engineer the platform</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <h3 className="font-semibold text-emerald-400 mb-2 text-sm">Allowed Activities</h3>
                  <ul className="text-xs space-y-1.5 list-disc list-inside">
                    <li>Use for legitimate business purposes</li>
                    <li>Share data within your organization</li>
                    <li>Integrate via our API (within limits)</li>
                    <li>Provide feedback and suggestions</li>
                    <li>Use for authorized testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div id="section-6" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">6. Intellectual Property</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                All content, features, and functionality of EcoTrack are owned by us and protected by intellectual property laws:
              </p>
              <ul className="space-y-2 mt-4 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Our IP:</strong> The platform, software, logos, trademarks, and content remain our exclusive property</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Your data:</strong> You retain ownership of the data you upload to EcoTrack</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">License grant:</strong> You grant us a license to use your data solely to provide and improve the service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Feedback:</strong> Any suggestions or feedback you provide may be used by us without restriction</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div id="section-7" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">7. Confidentiality</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                We treat your business data with strict confidentiality. Your supply chain information, inventory levels, and proprietary data are never shared with other EcoTrack customers. We may use anonymized, aggregated data to improve our AI models — but never in a way that identifies your business.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div id="section-8" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Building className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">8. Service Level & Availability</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                We strive for high availability but do not guarantee uptime. Service interruptions may occur due to maintenance, upgrades, or unforeseen circumstances:
              </p>
              <div className="grid md:grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Uptime Target", value: "99.5%" },
                  { label: "Scheduled Maintenance", value: "Weekends" },
                  { label: "Support Response", value: "24-48 hours" },
                ].map((metric, i) => (
                  <div key={i} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-emerald-400 font-bold text-lg">{metric.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-4">
                We are not liable for any losses resulting from service interruptions. Our Service Level Agreement (SLA) is available for Enterprise customers upon request.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div id="section-9" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">9. Limitation of Liability</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p className="p-4 rounded-lg bg-white/5 border border-white/10 text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ECOTRACK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE PAST SIX MONTHS.
              </p>
              <p className="text-sm">
                This excludes liability for death or personal injury caused by our negligence, fraud, or where law prohibits such limitation.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div id="section-10" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">10. Indemnification</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                You agree to indemnify and hold EcoTrack harmless from any claims, damages, or expenses arising from:
              </p>
              <ul className="space-y-2 mt-4 text-sm list-disc list-inside">
                <li>Your violation of these Terms</li>
                <li>Your use of the service</li>
                <li>Infringement of third-party rights</li>
                <li>Your business decisions based on our platform&apos;s recommendations</li>
              </ul>
            </div>
          </div>

          {/* Section 11 */}
          <div id="section-11" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">11. Termination</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                Either party may terminate this agreement at any time:
              </p>
              <ul className="space-y-2 mt-4 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">By you:</strong> Cancel through your account settings or by contacting support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">By us:</strong> We may suspend or terminate for violations, non-payment, or at our discretion</span>
                </li>
              </ul>
              <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 mt-4">
                <p className="text-sm">
                  Upon termination, your access ceases immediately. You may request data export within 30 days. We retain data as required by law or for legitimate business purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Section 12 */}
          <div id="section-12" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">12. Dispute Resolution</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <p>
                Any disputes arising from these Terms will be resolved through:
              </p>
              <ol className="space-y-2 mt-4 text-sm list-decimal list-inside">
                <li><strong className="text-white">Informal negotiation</strong> — Contact our support team first</li>
                <li><strong className="text-white">Mediation</strong> — If negotiation fails, both parties agree to mediate</li>
                <li><strong className="text-white">Arbitration</strong> — Final and binding arbitration in San Francisco, CA</li>
              </ol>
              <p className="mt-4 text-sm">
                These terms are governed by California law, without regard to conflict of law principles. You consent to the exclusive jurisdiction of courts in San Francisco County, California.
              </p>
            </div>
          </div>

          {/* Section 13 */}
          <div id="section-13" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">13. Miscellaneous</h2>
            </div>
            <div className="space-y-4 text-slate-400 ml-14">
              <ul className="space-y-3 mt-4 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Entire Agreement:</strong> These Terms supersede all prior agreements and understandings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Waiver:</strong> Failure to enforce any provision does not constitute waiver</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Force Majeure:</strong> We are not liable for delays due to causes beyond our control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong className="text-white">Severability:</strong> If any provision is invalid, the rest remains in effect</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 border-t border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 mb-4">
            Questions about these terms? We&apos;re here to help.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="mailto:legal@ecotrack.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all rounded-lg text-sm"
            >
              Contact Legal Team
            </a>
            <a
              href="/privacy-policy"
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all rounded-lg text-sm"
            >
              Read Privacy Policy
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
