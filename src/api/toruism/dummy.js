export function getDummyPermissions() {
  //   return a json of user list with avatar , name, email, phone
  return {
    // dummyData: [
    //   {
    //     "action": "read",
    //     "subject": "Auth",
    //   },
    //   {
    //     "action": "show menu",
    //     "subject": "Dashboard",
    //   },
    //   {
    //     "action": "show count card",
    //     "subject": "Dashboard",
    //   },
    //   {
    //     "action": "show recent joined employee list",
    //     "subject": "Dashboard",
    //   },
    //   {
    //     "action": "show recent timesheet",
    //     "subject": "Dashboard",
    //   },
    //   {
    //     "action": "show menu",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "list",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "create",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "view",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "update",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "change password",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "suspend",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "withdrawal suspension",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "view pay rate",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "update pay rate",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "view availability",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "update availability",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "view location",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "update location",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "view timesheets",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "view rosters",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "availability delete",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "delete location",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "set primary location",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "show menu",
    //     "subject": "Roster",
    //   },
    //   {
    //     "action": "list",
    //     "subject": "Roster",
    //   },
    //   {
    //     "action": "create",
    //     "subject": "Roster",
    //   },
    //   {
    //     "action": "update",
    //     "subject": "Roster",
    //   },
    //   {
    //     "action": "publish",
    //     "subject": "Roster",
    //   },
    //   {
    //     "action": "copy",
    //     "subject": "Roster",
    //   },
    //   {
    //     "action": "advanced copy paste",
    //     "subject": "Roster",
    //   },
    //   {
    //     "action": "publish all",
    //     "subject": "Roster",
    //   },
    //   {
    //     "action": "show menu",
    //     "subject": "Timesheet",
    //   },
    //   {
    //     "action": "list",
    //     "subject": "Timesheet",
    //   },
    //   {
    //     "action": "create",
    //     "subject": "Timesheet",
    //   },
    //   {
    //     "action": "update",
    //     "subject": "Timesheet",
    //   },
    //   {
    //     "action": "approve",
    //     "subject": "Timesheet",
    //   },
    //   {
    //     "action": "view",
    //     "subject": "Timesheet",
    //   },
    //   {
    //     "action": "discard",
    //     "subject": "Timesheet",
    //   },
    //   {
    //     "action": "approve all timesheet",
    //     "subject": "Timesheet",
    //   },
    //   {
    //     "action": "show menu",
    //     "subject": "Settings",
    //   },
    //   {
    //     "action": "show menu",
    //     "subject": "Location",
    //   },
    //   {
    //     "action": "list",
    //     "subject": "Location",
    //   },
    //   {
    //     "action": "create",
    //     "subject": "Location",
    //   },
    //   {
    //     "action": "view",
    //     "subject": "Location",
    //   },
    //   {
    //     "action": "update",
    //     "subject": "Location",
    //   },
    //   {
    //     "action": "employee list",
    //     "subject": "Location",
    //   },
    //   {
    //     "action": "employee update",
    //     "subject": "Location",
    //   },
    //   {
    //     "action": "show menu",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "list",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "create",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "view",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "update",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "password change",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "update password",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "suspend",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "withdrawal suspension",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "view self profile",
    //     "subject": "User",
    //   },
    //   {
    //     "action": "show menu",
    //     "subject": "Role Permission",
    //   },
    //   {
    //     "action": "list",
    //     "subject": "Role Permission",
    //   },
    //   {
    //     "action": "view permission",
    //     "subject": "Role Permission",
    //   },
    //   {
    //     "action": "update permission",
    //     "subject": "Role Permission",
    //   },
    //   {
    //     "action": "show menu",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "list",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "view weekend",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "update weekend",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "view holiday",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "delete holiday",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "view general setting",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "update general setting",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "create holiday",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "update holiday",
    //     "subject": "Configuration",
    //   },
    //   {
    //     "action": "accept roster",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "decline roster",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "view self profile",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "show roster on dashboard",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "show timesheet on dashboard",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "manual shift start",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "update manual shift",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "view today availability",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "import",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "bulk pay rate update",
    //     "subject": "Employee",
    //   },
    //   {
    //     "action": "bulk availability update",
    //     "subject": "Employee",
    //   },
    // ],
    dummyData: [
    
      {
        "action": "show menu",
        "subject": "Dashboard",
      },
      {
        "action": "show menu",
        "subject": "Guideline",
      },
      {
        "action": "create",
        "subject": "Guideline",
      },
      {
        "action": "edit",
        "subject": "Guideline",
      },
      {
        "action": "update",
        "subject": "Guideline",
      },
  
      {
        "action": "delete",
        "subject": "Guideline",
      },
      {
        "action": "show menu",
        "subject": "Awareness",
      },
      {
        "action": "create",
        "subject": "Awareness",
      },
      {
        "action": "edit",
        "subject": "Awareness",
      },
      {
        "action": "update",
        "subject": "Awareness",
      },
      {
        "action": "delete",
        "subject": "Awareness",
      },    
      {
        "action": "show menu",
        "subject": "Spot",
      },
      {
        "action": "create",
        "subject": "Spot",
      },
      {
        "action": "edit",
        "subject": "Spot",
      },
      {
        "action": "update",
        "subject": "Spot",
      },
      {
        "action": "delete",
        "subject": "Spot",
      },
      {
        "action": "show menu",
        "subject": "News",
      },
      {
        "action": "create",
        "subject": "News",
      },
      {
        "action": "edit",
        "subject": "News",
      },
      {
        "action": "update",
        "subject": "News",
      },
      {
        "action": "delete",
        "subject": "News",
      },
      {
        "action": "publish",
        "subject": "News",
      },
      {
        "action": "show menu",
        "subject": "Locker",
      },
      {
        "action": "create",
        "subject": "Locker",
      },
      {
        "action": "edit",
        "subject": "Locker",
      },
      {
        "action": "update",
        "subject": "Locker",
      },
  
      {
        "action": "delete",
        "subject": "Locker",
      },
      {
        "action": "show menu",
        "subject": "Hotel",
      },
      {
        "action": "create",
        "subject": "Hotel",
      },
      {
        "action": "edit",
        "subject": "Hotel",
      },
      {
        "action": "update",
        "subject": "Hotel",
      },
  
      {
        "action": "delete",
        "subject": "Hotel",
      },
      {
        "action": "show menu",
        "subject": "HotelType",
      },
      {
        "action": "create",
        "subject": "HotelType",
      },
      {
        "action": "edit",
        "subject": "HotelType",
      },
      {
        "action": "update",
        "subject": "HotelType",
      },
  
      {
        "action": "delete",
        "subject": "HotelType",
      },
      {
        "action": "show menu",
        "subject": "HotelCategory",
      },
      {
        "action": "create",
        "subject": "HotelCategory",
      },
      {
        "action": "edit",
        "subject": "HotelCategory",
      },
      {
        "action": "update",
        "subject": "HotelCategory",
      },
  
      {
        "action": "delete",
        "subject": "HotelCategory",
      },
      {
        "action": "show menu",
        "subject": "Transport",
      },
      {
        "action": "create",
        "subject": "Transport",
      },
      {
        "action": "edit",
        "subject": "Transport",
      },
      {
        "action": "update",
        "subject": "Transport",
      },
  
      {
        "action": "delete",
        "subject": "Transport",
      },
      {
        "action": "show menu",
        "subject": "Event",
      },
      {
        "action": "create",
        "subject": "Event",
      },
      {
        "action": "edit",
        "subject": "Event",
      },
      {
        "action": "update",
        "subject": "Event",
      },
  
      {
        "action": "delete",
        "subject": "Event",
      },
      {
        "action": "show menu",
        "subject": "Campaign",
      },
      {
        "action": "create",
        "subject": "Campaign",
      },
      {
        "action": "edit",
        "subject": "Campaign",
      },
      {
        "action": "update",
        "subject": "Campaign",
      },
  
      {
        "action": "delete",
        "subject": "Campaign",
      },
      {
        "action": "show menu",
        "subject": "Bank",
      },
      {
        "action": "create",
        "subject": "Bank",
      },
      {
        "action": "edit",
        "subject": "Bank",
      },
      {
        "action": "update",
        "subject": "Bank",
      },
  
      {
        "action": "delete",
        "subject": "Bank",
      },
      {
        "action": "show menu",
        "subject": "Atm",
      },
      {
        "action": "create",
        "subject": "Atm",
      },
      {
        "action": "edit",
        "subject": "Atm",
      },
      {
        "action": "update",
        "subject": "Atm",
      },
  
      {
        "action": "delete",
        "subject": "Atm",
      },
      {
        "action": "show menu",
        "subject": "DangerZone",
      },
      {
        "action": "create",
        "subject": "DangerZone",
      },
      {
        "action": "edit",
        "subject": "DangerZone",
      },
      {
        "action": "update",
        "subject": "DangerZone",
      },
  
      {
        "action": "delete",
        "subject": "DangerZone",
      },
      {
        "action": "show menu",
        "subject": "Police",
      },
      {
        "action": "create",
        "subject": "Police",
      },
      {
        "action": "edit",
        "subject": "Police",
      },
      {
        "action": "update",
        "subject": "Police",
      },
  
      {
        "action": "delete",
        "subject": "Police",
      },
      {
        "action": "show menu",
        "subject": "Doctor",
      },
      {
        "action": "create",
        "subject": "Doctor",
      },
      {
        "action": "edit",
        "subject": "Doctor",
      },
      {
        "action": "update",
        "subject": "Doctor",
      },
  
      {
        "action": "delete",
        "subject": "Doctor",
      },
      {
        "action": "show menu",
        "subject": "Guard",
      },
      {
        "action": "create",
        "subject": "Guard",
      },
      {
        "action": "edit",
        "subject": "Guard",
      },
      {
        "action": "update",
        "subject": "Guard",
      },
  
      {
        "action": "delete",
        "subject": "Guard",
      },
      {
        "action": "show menu",
        "subject": "Volunteer",
      },
      {
        "action": "create",
        "subject": "Volunteer",
      },
      {
        "action": "edit",
        "subject": "Volunteer",
      },
      {
        "action": "update",
        "subject": "Volunteer",
      },
  
      {
        "action": "delete",
        "subject": "Volunteer",
      },
      {
        "action": "show menu",
        "subject": "Info",
      },
      {
        "action": "create",
        "subject": "Info",
      },
      {
        "action": "edit",
        "subject": "Info",
      },
      {
        "action": "update",
        "subject": "Info",
      },
  
      {
        "action": "delete",
        "subject": "Info",
      },
      {
        "action": "show menu",
        "subject": "User",
      },
      {
        "action": "create",
        "subject": "User",
      },
      {
        "action": "edit",
        "subject": "User",
      },
      {
        "action": "update",
        "subject": "User",
      },
  
      {
        "action": "delete",
        "subject": "User",
      },
      {
        "action": "show menu",
        "subject": "Notice",
      },
      {
        "action": "create",
        "subject": "Notice",
      },
      {
        "action": "edit",
        "subject": "Notice",
      },
      {
        "action": "update",
        "subject": "Notice",
      },
  
      {
        "action": "delete",
        "subject": "Notice",
      },
    
    
    
    
   
    ],



  }
    
}
