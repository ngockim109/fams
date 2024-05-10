import Colors from "./src/constants/Colors";
import Sizes from "./src/constants/Sizes";

const antConfig = {
  components: {
    Menu: {
      itemSelectedColor: Colors.LighterBlack,
      itemSelectedBg: Colors.SlightBlue,
      collapsedWidth: Sizes.Larger,
      iconSize: Sizes.LgMedium,
      collapsedIconSize: Sizes.LgMedium,
    },
    Table: {
      rowSelectedBg: Colors.HoverTable,
      rowHoverBg: Colors.HoverTable,
      rowSelectedHoverBg: Colors.HoverTable,
    },
    Drawer: {
      colorBgElevated: Colors.Secondary,
      // colorBgMask: Colors.HoverTable,
    },
  },
  token: {
    colorPrimary: Colors.Primary,
    borderRadius: 4,
    fontFamily: "Inter, sans-serif",
    colorTextBase: Colors.Primary,
    // colorPrimaryTextHover: "#d4daf1be",
  },
};

export default antConfig;
