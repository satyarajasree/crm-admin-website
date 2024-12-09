import React from "react";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiHome, BiBookAlt, BiBuildingHouse, BiMessage, BiSolidReport, BiStats } from 'react-icons/bi';
import { ImCancelCircle } from "react-icons/im";





export const Sidebar=[
    {
        title:"Dashboard",
        path:'/dashboard',
        icon:<MdDashboard />,
        cName:'nav_text',

    },
    {
        title:"Available properties",
        path:'/Available_properties',
        icon:<BiBuildingHouse />,
        cName:'nav_text',

    },   {
        title:"My Properties",
        path:'/my_properties',
        icon:<BiMessage />,
        cName:'nav_text',

    },   {
        title:"Billing Details",
        path:'/billing_details',
        icon:<BiSolidReport />,
        cName:'nav_text',

    },   {
        title:"Invoice Details",
        path:'/invoice_details',
        icon:<BiStats />,
        cName:'nav_text',

    }, 
    ,   {
        title:"Cancellation Process",
        path:'/cancellation_process',
        icon:<ImCancelCircle /> ,
        cName:'nav_text',

    }, 
]


// import React, { useState } from "react";
// import { MdDashboard } from "react-icons/md";
// import { BiBuildingHouse, BiMessage, BiSolidReport, BiStats, BiChevronDown, BiChevronRight } from "react-icons/bi";

// const Sidebar = () => {
//   const [paidDropdown, setPaidDropdown] = useState(false); // State for Paid Billings dropdown
//   const [unpaidDropdown, setUnpaidDropdown] = useState(false); // State for Unpaid Billings dropdown

//   const handleTogglePaidDropdown = () => {
//     setPaidDropdown(!paidDropdown);
//   };

//   const handleToggleUnpaidDropdown = () => {
//     setUnpaidDropdown(!unpaidDropdown);
//   };

//   const sidebarItems = [
//     {
//       title: "Dashboard",
//       path: "/",
//       icon: <MdDashboard />,
//       cName: "nav_text",
//     },
//     {
//       title: "Available properties",
//       path: "/Available_properties",
//       icon: <BiBuildingHouse />,
//       cName: "nav_text",
//     },
//     {
//       title: "My Properties",
//       path: "/my_properties",
//       icon: <BiMessage />,
//       cName: "nav_text",
//     },
//     {
//       title: "Paid Billings",
//       path: "/paid_billings",
//       icon: <BiSolidReport />,
//       cName: "nav_text",
//       dropdown: true,
//       isOpen: paidDropdown,
//       toggleDropdown: handleTogglePaidDropdown,
//       subMenu: [
//         { title: "Billing History", path: "/paid_billings/history" },
//         { title: "Payment Receipts", path: "/paid_billings/receipts" },
//       ],
//     },
//     {
//       title: "Unpaid billings",
//       path: "/unpaid_billings",
//       icon: <BiStats />,
//       cName: "nav_text",
//       dropdown: true,
//       isOpen: unpaidDropdown,
//       toggleDropdown: handleToggleUnpaidDropdown,
//       subMenu: [
//         { title: "Outstanding Invoices", path: "/unpaid_billings/outstanding" },
//         { title: "Overdue Payments", path: "/unpaid_billings/overdue" },
//       ],
//     },
//   ];

//   return (
//     <div className="sidebar">
//       <ul>
//         {sidebarItems.map((item, index) => (
//           <li key={index} className={item.cName}>
//             <div
//               onClick={item.dropdown ? item.toggleDropdown : null}
//               style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
//             >
//               {item.icon}
//               <span style={{ marginLeft: "10px" }}>{item.title}</span>
//               {item.dropdown &&
//                 (item.isOpen ? (
//                   <BiChevronDown style={{ marginLeft: "auto" }} />
//                 ) : (
//                   <BiChevronRight style={{ marginLeft: "auto" }} />))}
//             </div>
//             {/* Render dropdown menu if the item has a dropdown and is open */}
//             {item.dropdown && item.isOpen && (
//               <ul className="dropdown">
//                 {item.subMenu.map((subItem, subIndex) => (
//                   <li key={subIndex} className="dropdown_item">
//                     <a href={subItem.path}>{subItem.title}</a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
