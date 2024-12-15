export default [
  {
    title: 'Dashboards',
    to: 'dashboards',
    icon: { icon: 'tabler-layout-dashboard' },
    subject: "dashboard",
    action: "show menu",
  },
  {
    title: 'Guide Line',
    to: 'guide-line',

    // need an icon for guideline
    icon: { icon: 'tabler-building-lighthouse' },
    subject: "guideline",
    action: "show menu",
  },
  {
    title: 'Awareness',
    to: 'awareness',
    icon: { icon: 'tabler-speakerphone' },
    subject: "awareness",
    action: "show menu",
  },
  {
    title: 'Tourist Spot',
    to: 'touristSpot',
    icon: { icon: 'tabler-map' },
    subject: "spot",
    action: "show menu",
  },
  {
    title: 'News',
    to: 'newsList',
    icon: { icon: 'tabler-brand-flipboard' },
    subject: "news",
    action: "show menu",
  },
  
  {
    title: 'Locker',
    to: 'lockerList',
    icon: { icon: 'tabler-lock-square-rounded' },
    subject: "locker",
    action: "show menu",
  },

  
  {
    title: 'Hotel',
    to: 'hotelList',
    icon: { icon: 'tabler-building-skyscraper' },
    subject: "hotel",
    action: "show menu",
    children: [
      {
        title: 'Hotels',
        to: 'hotelList',
        icon: { icon: 'tabler-building-skyscraper' },
        subject: "hotel",
        action: "show menu",
      },
      
      {
        title: 'Type',
        to: 'hotelTypeList',
        icon: { icon: 'tabler-list' },
        subject: "hoteltype",
        action: "show menu",
      },
      {
        title: 'Category',
        to: 'hotelCategoryList',
        icon: { icon: 'tabler-category' },
        subject: "hotelcategory",
        action: "show menu",
      },
    ],
  },
  {
    title: 'Transport',
    to: 'transportList',
    icon: { icon: 'tabler-bus' },
    subject: "transport",
    action: "show menu",
  },
  {
    title: 'Events',
    to: 'eventsList',
    icon: { icon: 'tabler-ticket' },
    subject: "event",
    action: "show menu",
  },
  {
    title: 'Campaign',
    to: 'campaignList',
    icon: { icon: 'tabler-brand-campaignmonitor' },
    subject: "campaign",
    action: "show menu",
  },
  {
    title: 'Banks & ATM',
    to: 'bank',
    icon: { icon: 'tabler-building-bank' },
    subject: "bank",
    action: "show menu",
    children: [
      
      {
        title: 'Bank',
        to: 'bankList',
        icon: { icon: 'tabler-building-bank' },
        subject: "bank",
        action: "show menu",
      },

      {
        title: 'ATM',
        to: 'atmList',
        icon: { icon: 'tabler-cash-banknote' },
        subject: "atm",
        action: "show menu",
      },
    ],
  },
  {
    title: 'Danger Zone',
    to: 'redZoneList',
    icon: { icon: 'tabler-alert-triangle' },
    subject: "dangerzone",
    action: "show menu",
  },
  {
    title: 'Police',
    to: 'policeList',
    icon: { icon: 'tabler-shield-checkered' },
    subject: "police",
    action: "show menu",
  },
  {
    title: 'Doctor',
    to: 'doctorList',
    icon: { icon: 'tabler-stethoscope' },
    subject: "doctor",
    action: "show menu",
  },
  {
    title: 'Life Guard',
    to: 'guardList',
    icon: { icon: 'tabler-lifebuoy' },
    subject: "guard",
    action: "show menu",
  },
  {
    title: 'Beach Volunteer',
    to: 'volunteerList',
    icon: { icon: 'tabler-empathize' },
    subject: "volunteer",
    action: "show menu",
  },
  {
    title: 'Coxs bazar Info',
    to: 'info',
    icon: { icon: 'tabler-beach' },
    subject: "info",
    action: "show menu",
  },
 
  {
    title: 'Notice',
    to: 'noticeList',
    icon: { icon: 'tabler-pinned' },
    subject: "notice",
    action: "show menu",
  },
  {
    title: 'Settings',
    to: 'settings',
    icon: { icon: 'tabler-settings' },
    subject: "user",
    action: "show menu",
    children: [
      
      {
        title: 'User List',
        to: 'userList',
        icon: { icon: 'tabler-users' },
        subject: "user",
        action: "show menu",
      },
      {
        title: 'Role & Permissions',
        to: 'rolePermissions',
        icon: { icon: 'tabler-ban' },
        subject: "user",
        action: "show menu",
      },
    ],
  },
]
