export default [
  {
    title: 'Dashboards',
    to: 'dashboards',
    icon: { icon: 'tabler-smart-home' },
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
    subject: "Dashboard",
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
    to: 'events',
    icon: { icon: 'tabler-ticket' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Campaign',
    to: 'campaign',
    icon: { icon: 'tabler-brand-campaignmonitor' },
    subject: "Dashboard",
    action: "show menu",
  },
  {
    title: 'Banks & ATM',
    to: 'bank',
    icon: { icon: 'tabler-smart-home' },
    subject: "Dashboard",
    action: "show menu",
    children: [
      
      {
        title: 'Bank',
        to: 'bankList',
        icon: { icon: 'tabler-smart-home' },
        subject: "Dashboard",
        action: "show menu",
      },

      {
        title: 'ATM',
        to: 'atmList',
        icon: { icon: 'tabler-smart-home' },
        subject: "Dashboard",
        action: "show menu",
      },
    ],
  },
  {
    title: 'Coxs bazar Info',
    to: 'info',
    icon: { icon: 'tabler-smart-home' },
    subject: "Dashboard",
    action: "show menu",
  },
 
  

 
 
  {
    title: 'Emergency',
    to: 'emergency',
    icon: { icon: 'tabler-smart-home' },
    subject: "Dashboard",
    action: "show menu",
    children: [
      
      {
        title: 'Tourist Police',
        to: 'touristPolice',
        icon: { icon: 'tabler-smart-home' },
        subject: "Dashboard",
        action: "show menu",
      },
      {
        title: 'Red Zone',
        to: 'RedZone',
        icon: { icon: 'tabler-smart-home' },
        subject: "Dashboard",
        action: "show menu",
      },
      {
        title: 'Doctor',
        to: 'doctor',
        icon: { icon: 'tabler-smart-home' },
        subject: "Dashboard",
        action: "show menu",
      },
      {
        title: 'Life Guard',
        to: 'lifeGuard',
        icon: { icon: 'tabler-smart-home' },
        subject: "Dashboard",
        action: "show menu",
      },
      {
        title: 'Volunteer',
        to: 'volunteer',
        icon: { icon: 'tabler-smart-home' },
        subject: "Dashboard",
        action: "show menu",
      },
      
    ],
  },
 
  {
    title: 'Settings',
    to: 'settings',
    icon: { icon: 'tabler-smart-home' },
    subject: "Dashboard",
    action: "show menu",
    children: [
      
      {
        title: 'User List',
        to: 'userList',
        icon: { icon: 'tabler-smart-home' },
        subject: "Dashboard",
        action: "show menu",
      },
      {
        title: 'Role & Permissions',
        to: 'rolePermissions',
        icon: { icon: 'tabler-smart-home' },
        subject: "Dashboard",
        action: "show menu",
      },
    ],
  },
  {
    title: 'Notice',
    to: 'notice',
    icon: { icon: 'tabler-smart-home' },
    subject: "Dashboard",
    action: "show menu",
  },
]
