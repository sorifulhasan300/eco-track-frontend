// "use client";

// import { useAuthStore } from "@/store/useAuthStore";
// import { USER_ROLES } from "@/types/roles";
// import RoleSlotGuard from "@/components/dashboard/RoleSlotGuard";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Users,
//   Package,
//   BarChart3,
//   Settings,
//   TrendingUp,
//   ShieldCheck,
// } from "lucide-react";

// function AdminContent() {
//   const user = useAuthStore((s) => s.user);

//   return (
//     <RoleSlotGuard allowedRole={USER_ROLES.ADMIN}>
//       <div className="space-y-6">
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-slate-300">
//                 Total Users
//               </CardTitle>
//               <Users className="size-4 text-emerald-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-white">1,284</div>
//               <p className="text-xs text-slate-400">+12% from last month</p>
//             </CardContent>
//           </Card>

//           <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-slate-300">
//                 Inventory Items
//               </CardTitle>
//               <Package className="size-4 text-emerald-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-white">8,432</div>
//               <p className="text-xs text-slate-400">+3% from last week</p>
//             </CardContent>
//           </Card>

//           <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-slate-300">
//                 Analytics Events
//               </CardTitle>
//               <BarChart3 className="size-4 text-emerald-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-white">45.2K</div>
//               <p className="text-xs text-slate-400">+8% from yesterday</p>
//             </CardContent>
//           </Card>

//           <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-slate-300">
//                 System Health
//               </CardTitle>
//               <ShieldCheck className="size-4 text-emerald-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-white">99.9%</div>
//               <p className="text-xs text-slate-400">All systems operational</p>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid gap-4 lg:grid-cols-2">
//           <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
//             <CardHeader>
//               <CardTitle className="text-white flex items-center gap-2">
//                 <TrendingUp className="size-4 text-emerald-400" />
//                 Platform Growth
//               </CardTitle>
//               <CardDescription className="text-slate-400">
//                 Monthly user and inventory trends
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-48 flex items-end gap-2">
//                 {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
//                   <div
//                     key={i}
//                     className="flex-1 rounded-t-sm bg-emerald-500/20 hover:bg-emerald-500/40 transition-colors"
//                     style={{ height: `${h}%` }}
//                   />
//                 ))}
//               </div>
//               <div className="flex justify-between mt-2 text-xs text-slate-500">
//                 <span>Jan</span>
//                 <span>Dec</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-emerald-500/10 bg-slate-900/50 backdrop-blur">
//             <CardHeader>
//               <CardTitle className="text-white flex items-center gap-2">
//                 <Settings className="size-4 text-emerald-400" />
//                 Quick Settings
//               </CardTitle>
//               <CardDescription className="text-slate-400">
//                 Recent configuration changes
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {[
//                 { label: "Auto-backup enabled", time: "2h ago" },
//                 { label: "New role policy updated", time: "5h ago" },
//                 { label: "Email notifications configured", time: "1d ago" },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between rounded-md border border-white/5 px-3 py-2"
//                 >
//                   <span className="text-sm text-slate-300">{item.label}</span>
//                   <span className="text-xs text-slate-500">{item.time}</span>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </RoleSlotGuard>
//   );
// }

// export default AdminContent;

function AdminContent() {
  return null
}

export default AdminContent;