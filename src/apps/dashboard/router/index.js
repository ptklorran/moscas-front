export const dashboard_routes = [
  {
    path: "/dashboard",
    component: () => import("../Main.vue"),
    name: "Dashboard"
  },
  {
    path: "*",
    component: () => import("../Construcao.vue"),
    name: "Construcao"
  },
];

export default {};
