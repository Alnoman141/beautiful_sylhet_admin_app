export default [
  {
    title: "Dashboards",
    to: "dashboards",
    icon: { icon: "tabler-layout-dashboard" },
    subject: "dashboard",
    action: "show menu",
  },

  {
    title: "Instructions",
    to: "guide-line",

    // need an icon for guideline
    icon: { icon: "tabler-building-lighthouse" },
    subject: "guideline",
    action: "show menu",
  },
  {
    title: "Awareness",
    to: "awareness",
    icon: { icon: "tabler-speakerphone" },
    subject: "awareness",
    action: "show menu",
  },
  {
    title: "Tourist Places",
    to: "touristSpot",
    icon: { icon: "tabler-map" },
    subject: "spot",
    action: "show menu",
  },
  {
    title: "Hotel & Restaurant",
    to: "hotelList",
    icon: { icon: "tabler-building-skyscraper" },
    subject: "hotel",
    action: "show menu",
    children: [
      {
        title: "Hotel/Motel/Resort",
        to: "hotelList",
        icon: { icon: "tabler-building-skyscraper" },
        subject: "hotel",
        action: "show menu",
      },
      {
        title: "Restaurant",
        to: "restaurantList",
        icon: { icon: "tabler-tools-kitchen" },
        subject: "dangerzone",
        action: "show menu",
      },
      {
        title: "Type",
        to: "hotelTypeList",
        icon: { icon: "tabler-list" },
        subject: "hoteltype",
        action: "show menu",
      },
      {
        title: "Hotel Category",
        to: "hotelCategoryList",
        icon: { icon: "tabler-category" },
        subject: "hotelcategory",
        action: "show menu",
      },

      // restaurantCategoryList
      {
        title: "Restaurant Category",
        to: "restaurantCategoryList",
        icon: { icon: "tabler-category" },
        subject: "hotelcategory",
        action: "show menu",
      },
      
    ],
  },
  {
    title: "Transport Counter",
    to: "transportList",
    icon: { icon: "tabler-bus" },
    subject: "transport",
    action: "show menu",
  },
  {
    title: "Event Information",
    to: "eventsList",
    icon: { icon: "tabler-ticket" },
    subject: "event",
    action: "show menu",
  },
  {
    title: "DC Activities",
    to: "campaignList",
    icon: { icon: "tabler-brand-campaignmonitor" },
    subject: "campaign",
    action: "show menu",
  },
  {
    title: `About Cox's Bazar`,
    to: "info",
    icon: { icon: "tabler-beach" },
    subject: "info",
    action: "show menu",
  },
  {
    title: "Locker Service",
    to: "lockerList",
    icon: { icon: "tabler-lock-square-rounded" },
    subject: "locker",
    action: "show menu",
  },
  {
    title: "Bank/ATM",
    to: "bank",
    icon: { icon: "tabler-building-bank" },
    subject: "bank",
    action: "show menu",
    children: [
      {
        title: "Bank",
        to: "bankList",
        icon: { icon: "tabler-building-bank" },
        subject: "bank",
        action: "show menu",
      },

      {
        title: "ATM",
        to: "atmList",
        icon: { icon: "tabler-cash-banknote" },
        subject: "atm",
        action: "show menu",
      },
    ],
  },
  {
    title: "Danger Zone",
    to: "redZoneList",
    icon: { icon: "tabler-skull" },
    subject: "dangerzone",
    action: "show menu",
    children: [
      {
        title: "Danger Zone",
        to: "redZoneList",
        icon: { icon: "tabler-skull" },
        subject: "dangerzone",
        action: "show menu",
      },

      {
        title: "Zone Category",
        to: "redZoneCategoryList",
        icon: { icon: "tabler-category-2" },
        subject: "dangerzone",
        action: "show menu",
      },
    ],
  },
  {
    title: "Tourist Bus",
    to: "Tourist Bus",
    icon: { icon: "tabler-bus" },
    subject: "notice",
    action: "show menu",
  },
  {
    title: "Kitkot Chair",
    to: "Kitkot Chair",
    icon: { icon: "tabler-sailboat" },
    subject: "notice",
    action: "show menu",
  },
  {
    title: "Fare",
    to: "fairList",
    icon: { icon: "tabler-cash-banknote" },
    subject: "dangerzone",
    action: "show menu",
  },
  {
    title: "Complaint & Suggestion",
    to: "complainList",
    icon: { icon: "tabler-mail-exclamation" },
    subject: "dangerzone",
    action: "show menu",
    children: [
      {
        title: "Compalin List",
        to: "complainChatList",
        icon: { icon: "tabler-mail-exclamation" },
        subject: "dangerzone",
        action: "show menu",
      },

      {
        title: "Complain Category",
        to: "complainCategoryList",
        icon: { icon: "tabler-category-2" },
        subject: "dangerzone",
        action: "show menu",
      },
    ],
  },
  {
    title: "Emergency",
    to: "redZoneList",
    icon: { icon: "tabler-alert-triangle" },
    subject: "bank",
    action: "show menu",
    children: [
      {
        title: "DA Tourism Cell",
        to: "DC Activities",
        icon: { icon: "tabler-first-aid-kit" },
        subject: "notice",
        action: "show menu",
      },
      {
        title: "Tourist Police",
        to: "policeList",
        icon: { icon: "tabler-shield-checkered" },
        subject: "police",
        action: "show menu",
      },

      {
        title: "Doctor",
        to: "doctorList",
        icon: { icon: "tabler-stethoscope" },
        subject: "doctor",
        action: "show menu",
      },
      {
        title: "Life Guard",
        to: "guardList",
        icon: { icon: "tabler-lifebuoy" },
        subject: "guard",
        action: "show menu",
      },

      {
        title: "Beach Volunteer",
        to: "volunteerList",
        icon: { icon: "tabler-empathize" },
        subject: "volunteer",
        action: "show menu",
      },
      {
        title: "Tourism Corporation",
        to: "Tourism Corporation",
        icon: { icon: "tabler-first-aid-kit" },
        subject: "notice",
        action: "show menu",
      },
    ],
  },
  {
    title: "Announcement",
    to: "noticeList",
    icon: { icon: "tabler-pinned" },
    subject: "notice",
    action: "show menu",
  },

  // ------------------
  // {
  //       title: "Complain List",
  //       to: "complainList",
  //       icon: { icon: "tabler-activity" },
  //       subject: "user",
  //       action: "show menu",
  //     },

  {
    title: "News",
    to: "newsList",
    icon: { icon: "tabler-brand-flipboard" },
    subject: "news",
    action: "show menu",
  },
  
 
  {
    title: "Tourist List",
    to: "touristList",
    icon: { icon: "tabler-luggage" },
    subject: "user",
    action: "show menu",
  },
  {
    title: "Settings",
    to: "settings",
    icon: { icon: "tabler-settings" },
    subject: "user",
    action: "show menu",
    children: [
      {
        title: "User List",
        to: "userList",
        icon: { icon: "tabler-users" },
        subject: "user",
        action: "show menu",
      },

      // {
      //   title: "Complain List",
      //   to: "complainList",
      //   icon: { icon: "tabler-activity" },
      //   subject: "user",
      //   action: "show menu",
      // },
    
      {
        title: "User Activity",
        to: "userActivity",
        icon: { icon: "tabler-activity" },
        subject: "user",
        action: "show menu",
      },
      {
        title: "Role & Permissions",
        to: "rolePermissions",
        icon: { icon: "tabler-ban" },
        subject: "user",
        action: "show menu",
      },
    ],
  },
  {
    title: "Landing Page",
    to: "landingPage",
    icon: { icon: "tabler-app-window" },
    subject: "awareness",
    action: "show menu",
  },
]
