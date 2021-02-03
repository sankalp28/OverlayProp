export const previewElement = [];

export const SimpleText = {
  id: "",
  isActve: true,
  name: "simpleText",
  properties: {
    content: "Enter the Text",
    width: "150",
    height: "50",
    xCoordinate: "200",
    yCoordinate: "100",
    fontColor: "#ffffff",
    fontSize: "20",
    paddingFill: "none",
    paddingValue: "5",
    fontType: "Arial",
    fontStyle: "Normal",
  },
};

export const TextTicker = {
  id: "",
  isActve: false,
  name: "textTicker",
  properties: {
    content: "Enter the Text",
    width: "400",
    height: "40",
    xCoordinate: "10",
    yCoordinate: "200",
    fontColor: "#000",
    fontSize: "",
    paddingFill: "#ffffff",
    paddingValue: "10",
    fontType: "Arial",
    fontStyle: "Normal",
    textDirection: "Left",
    spacing: "10",
    crawlSpeed: "5",
  },
};

export const fontFamilyArray = [
  "Arial",
  "Brush Script MT",
  "Copperplate Gothic",
  "Impact",
  "Lucida Sans",
  "Sans serif",
  "Tahoma",
  "Verdana",
];

export const fontWeightArray = ["Normal", "Bold"];

export const fontSizeArray = function() {
  const data = [];
  const length = 99;
  for (var i = 1; i <= length; i++) {
    data.push(i);
  }
  return data;
};

export const direction = ["Left", "Right", "Up", "Down"];

export const timeZoneArray = [
  "Local",
  "GMT +14 LINT Kiritimati",
  "GMT +13:45 CHADAT Chatham Island",
  "GMT +13 NZDT Auckland",
  "GMT +12 ANAT Anadyr",
  "GMT +11 AEDT Melbourne",
  "GMT +10:30 ACDT Adelaide",
  "GMT +10 AEST Brisbane",
  "GMT +9:30 ACST Darwin",
  "GMT +9 JST Tokyo",
  "GMT +8:45 ACWST Eucla",
  "GMT +8 CST Beijing",
  "GMT +7 WIB Jakarta",
  "GMT +6:30 MMT Yangon",
  "GMT +6 BST Dhaka",
  "GMT +5:45 NPT Kathmandu",
  "GMT +5:30 IST New Delhi",
  "GMT +5 UZT Tashkent",
  "GMT +4:30 IRDT Tehran",
  "GMT +4 GST Dubai",
  "GMT +3 MSK Moscow",
  "GMT +2 EET Cairo",
  "GMT +1 CET Brussels",
  "GMT +0 GMT London",
  "GMT -1 CVT Praia",
  "GMT -2 GST King Edward Point",
  "GMT -2:30 DNT St. John's",
  "GMT -3 ART Buenos Aires",
  "GMT -4 EDT New York",
  "GMT -5 CDT Chicago",
  "GMT -6 CST Mexico City",
  "GMT -7 Los Angeles",
  "GMT -8 AKDT Anchorage",
  "GMT -9 HDT Adak",
  "GMT -9:30 MART Taiohae",
  "GMT -10 HST Honolulu",
  "GMT -11 NUT Alofi",
  "GMT -12 AoE Baker Island",
];
