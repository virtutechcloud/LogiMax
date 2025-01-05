// "use client";

// import React from "react";
// import { Metadata } from "next";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import FleetOverviewChart from "@fleet/components/FleetOverviewChart";
// import VehicleStatusChart from "@fleet/components/VehicleStatusChart";
// import MaintenanceScheduleChart from "@fleet/components/MaintenanceScheduleChart";
// import DriverAvailabilityChart from "@fleet/components/DriverAvailabilityChart";
// import VehicleDataTable from "@fleet/components/VehicleDataTable";
// import DriverDataTable from "@fleet/components/DriverDataTable";
// import MaintenanceDataTable from "@fleet/components/MaintenanceDataTable";
// import { FleetStats } from "@fleet/components/FleetStats";
// import { CreateVehicleDialog } from "@fleet/components/dialogs/CreateVehicleDialog";
// import { CreateDriverDialog } from "@fleet/components/dialogs/CreateDriverDialog";
// import { CreateMaintenanceDialog } from "@fleet/components/dialogs/CreateMaintenanceDialog";

// export const metadata: Metadata = {
//   title: "Fleet Management | LogiMax",
//   description: "Comprehensive fleet management system for LogiMax",
// };

// const FleetPage = () => {
//   const [activeTab, setActiveTab] = React.useState("overview");
//   const [showCreateVehicle, setShowCreateVehicle] = React.useState(false);
//   const [showCreateDriver, setShowCreateDriver] = React.useState(false);
//   const [showCreateMaintenance, setShowCreateMaintenance] = React.useState(
//     false
//   );

//   return (
//     <div className="flex-1 space-y-4 p-4 pt-6">
//       <div className="flex items-center justify-between space-y-2">
//         <h2 className="text-3xl font-bold tracking-tight">Fleet Management</h2>
//         <div className="flex items-center space-x-2">
//           {activeTab === "vehicles" && (
//             <Button onClick={() => setShowCreateVehicle(true)}>
//               <Plus className="mr-2 h-4 w-4" /> Add Vehicle
//             </Button>
//           )}
//           {activeTab === "drivers" && (
//             <Button onClick={() => setShowCreateDriver(true)}>
//               <Plus className="mr-2 h-4 w-4" /> Add Driver
//             </Button>
//           )}
//           {activeTab === "maintenance" && (
//             <Button onClick={() => setShowCreateMaintenance(true)}>
//               <Plus className="mr-2 h-4 w-4" /> Schedule Maintenance
//             </Button>
//           )}
//         </div>
//       </div>

//       <Tabs defaultValue="overview" onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
//           <TabsTrigger value="drivers">Drivers</TabsTrigger>
//           <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-4">
//           <FleetStats />

//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Fleet Overview</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <FleetOverviewChart />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Vehicle Status</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <VehicleStatusChart />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Maintenance Schedule</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <MaintenanceScheduleChart />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Driver Availability</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <DriverAvailabilityChart />
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="vehicles">
//           <Card>
//             <CardHeader>
//               <CardTitle>Vehicle Management</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <VehicleDataTable />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="drivers">
//           <Card>
//             <CardHeader>
//               <CardTitle>Driver Management</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <DriverDataTable />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="maintenance">
//           <Card>
//             <CardHeader>
//               <CardTitle>Maintenance Schedule</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <MaintenanceDataTable />
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <CreateVehicleDialog
//         open={showCreateVehicle}
//         onOpenChange={setShowCreateVehicle}
//       />
//       <CreateDriverDialog
//         open={showCreateDriver}
//         onOpenChange={setShowCreateDriver}
//       />
//       <CreateMaintenanceDialog
//         open={showCreateMaintenance}
//         onOpenChange={setShowCreateMaintenance}
//       />
//     </div>
//   );
// };

// export default FleetPage;
