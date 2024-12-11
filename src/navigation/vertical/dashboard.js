export default [
  {
    title: 'Dashboards',
    to: 'dashboards',
    icon: { icon: 'tabler-layout-dashboard' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Guide Line',
    to: 'guide-line',

    // need an icon for guideline
    icon: { icon: 'tabler-arrow-bear-right' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Awareness',
    to: 'awareness',
    icon: { icon: 'tabler-speakerphone' },
    subject: "Awareness",
    action: "show menu",
  },
  {
    title: 'Tourist Spot',
    to: 'touristSpot',
    icon: { icon: 'tabler-map' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'News',
    to: 'newsList',
    icon: { icon: 'tabler-brand-flipboard' },
    subject: "Dashboard",
    action: "show menu",
  },
  
  {
    title: 'Locker',
    to: 'lockerList',
    icon: { icon: 'tabler-lock-square-rounded' },
    subject: "Dashboard",
    action: "show menu",
  },

  
  {
    title: 'Hotel',
    to: 'hotelList',
    icon: { icon: 'tabler-building-skyscraper' },
    subject: "Dashboard",
    action: "show menu",
    children: [
      {
        title: 'Hotels',
        to: 'hotelList',
        icon: { icon: 'tabler-building-skyscraper' },
        subject: "Dashboard",
        action: "show menu",
      },
      
      {
        title: 'Type',
        to: 'hotelTypeList',
        icon: { icon: 'tabler-list' },
        subject: "Dashboard",
        action: "show menu",
      },
      {
        title: 'Category',
        to: 'hotelCategoryList',
        icon: { icon: 'tabler-category' },
        subject: "Dashboard",
        action: "show menu",
      },
    ],
  },
  {
    title: 'Transport',
    to: 'transportList',
    icon: { icon: 'tabler-bus' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Events',
    to: 'eventsList',
    icon: { icon: 'tabler-ticket' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Campaign',
    to: 'campaignList',
    icon: { icon: 'tabler-brand-campaignmonitor' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Banks & ATM',
    to: 'bank',
    icon: { icon: 'tabler-building-bank' },
    subject: "Dashboard",
    action: "show menu",
    children: [
      
      {
        title: 'Bank',
        to: 'bankList',
        icon: { icon: 'tabler-building-bank' },
        subject: "Dashboard",
        action: "show menu",
      },

      {
        title: 'ATM',
        to: 'atmList',
        icon: { icon: 'tabler-cash-banknote' },
        subject: "Dashboard",
        action: "show menu",
      },
    ],
  },
  {
    title: 'Danger Zone',
    to: 'redZoneList',
    icon: { icon: 'tabler-alert-triangle' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Police',
    to: 'policeList',
    icon: { icon: 'tabler-shield-checkered' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Doctor',
    to: 'doctorList',
    icon: { icon: 'tabler-stethoscope' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Life Guard',
    to: 'guardList',
    icon: { icon: 'tabler-lifebuoy' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Beach Volunteer',
    to: 'volunteerList',
    icon: { icon: 'tabler-empathize' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Coxs bazar Info',
    to: 'info',
    icon: { icon: 'tabler-beach' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Settings',
    to: 'settings',
    icon: { icon: 'tabler-settings' },
    subject: "Dashboard",
    action: "show menu",
    children: [
      
      {
        title: 'User List',
        to: 'userList',
        icon: { icon: 'tabler-users' },
        subject: "Dashboard",
        action: "show menu",
      },
      {
        title: 'Role & Permissions',
        to: 'rolePermissions',
        icon: { icon: 'tabler-ban' },
        subject: "Dashboard",
        action: "show menu",
      },
    ],
  },
  {
    title: 'Notice',
    to: 'noticeList',
    icon: { icon: 'tabler-pinned' },
    subject: "Dashboard",
    action: "show menu",
  },
]
