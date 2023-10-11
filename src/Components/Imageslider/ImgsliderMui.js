// import React from "react";
// import Carousel from "react-material-ui-carousel";
// import { Paper, Typography, Grid } from "@mui/material";
// import { ShoppingMall } from "@icon-park/react";
// import { Basecolor, Light_Green, Natural } from "../../layout/Themes/Color";

// const ImgsliderMui = ({ images, namePrs }) => {
//   if (images.length > 0) {
//     images.forEach((el, index) => {
//       el["description"] = namePrs;
//       el["name"] = index + 1;
//     });
//     return (
//       <Carousel
//         navButtonsAlwaysInvisible={true}
//         indicatorIconButtonProps={{
//           style: {
//             height: "8px",
//             width: "8px",
//             padding: "8px",
//             color: `${Natural[500]}`,
//           },
//         }}
//         activeIndicatorIconButtonProps={{
//           style: {
//             height: "8px",
//             width: "8px",
//             padding: "8px",
//             color: `${Light_Green[700]}`,
//           },
//         }}
//       >
//         {images.map((item, i) => (
//           <Item key={i} item={item} lenitem={images.length} />
//         ))}
//       </Carousel>
//     );
//   }
// };
// export default ImgsliderMui;
// function Item(props) {
//   return (
//     <Paper sx={{ boxShadow: "none" }}>
//       <img
//         style={{ width: "100%", height: " 300px", opacity: 0.8 }}
//         src={props.item.desktop_url}
//       />
//       <Grid
//         sx={{
//           display: "flex",
//           position: "absolute",
//           color: "red",
//           top: 1,
//           right: 1,
//           margin: "24px",
//           background: "rgba(0,0,0,0.60)",
//           height: "25px",
//           width: "66",
//           borderRadius: "16px",
//           padding: "0px 8px",
//           alignItems: "center",
//         }}
//       >
//         <Typography
//           variant="body2"
//           sx={{
//             padding: "0px 8px",
//             color: Basecolor[200],
//           }}
//         >
//           {props.item.name} از
//           {props.lenitem}
//         </Typography>
//       </Grid>
//       <Grid
//         sx={{
//           display: "flex",
//           position: "absolute",
//           justifyContent: "center",
//           alignItems: "center",
//           bottom: 1,
//           left: 1,
//           paddingBottom: "20px",
//           paddingLeft: "20px",
//         }}
//       >
//         <ShoppingMall
//           theme="outline"
//           size="30"
//           style={{ height: "24px" }}
//           fill={Basecolor[200]}
//         />
//         <Typography
//           variant="h7"
//           sx={{
//             color: Basecolor[200],
//             paddingLeft: "5px",
//           }}
//         >
//           {props.item.description}
//         </Typography>
//       </Grid>
//     </Paper>
//   );
// }
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Grid } from "@mui/material";
import { ShoppingMall } from "@icon-park/react";
import { Basecolor, Light_Green, Natural } from "../../layout/Themes/Color";
var items = [
  {
    name: "1",
    description: "پروژه ایران مال",
    imgUrl:
      "https://images.pexels.com/photos/3394140/pexels-photo-3394140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "2",
    description: "پروژه ایران مال",
    imgUrl:
      "https://images.pexels.com/photos/16944911/pexels-photo-16944911/free-photo-of-surface-of-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "3",
    description: "پروژه ایران مال",
    imgUrl:
      "https://images.pexels.com/photos/17229111/pexels-photo-17229111/free-photo-of-pedestrians-passing-by-woman-standing-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
const ImgsliderMui = () => {
  console.log(items.length);

  return (
    <Carousel
      navButtonsAlwaysInvisible={true}
      indicatorIconButtonProps={{
        style: {
          height: "8px",
          width: "8px",
          padding: "8px",
          color: `${Natural[500]}`,
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          height: "8px",
          width: "8px",
          padding: "8px",
          color: `${Light_Green[700]}`,
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default ImgsliderMui;
function Item(props) {
  return (
    <Paper sx={{ boxShadow: "none" }}>
      <img
        style={{ width: "100%", height: " 300px", opacity: 0.8 }}
        src={props.item.imgUrl}
      />
      <Grid
        sx={{
          display: "flex",
          position: "absolute",
          color: "red",
          top: 1,
          right: 1,
          margin: "24px",
          background: "rgba(0,0,0,0.60)",
          height: "25px",
          width: "66",
          borderRadius: "16px",
          padding: "0px 8px",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            padding: "0px 8px",
            color: Basecolor[200],
          }}
        >
          {props.item.name} از
          {items.length}
        </Typography>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          position: "absolute",
          bottom: 1,
          left: 1,
          paddingBottom: "20px",
        }}
      >
        <ShoppingMall
          theme="outline"
          size="24"
          fill={Basecolor[200]}
          style={{ paddingTop: "-10px" }}
          strokeWidth={3}
          strokeLinejoin="miter"
        />
        <Typography
          variant="h7"
          sx={{
            color: Basecolor[200],
            paddingLeft: "5px",
          }}
        >
          {props.item.description}
        </Typography>
      </Grid>
    </Paper>
  );
}
