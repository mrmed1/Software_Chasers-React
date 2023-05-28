import * as React from "react";


import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
export default function EnhancedTableToolbar({title,handleOpen}) {


  return (
    <> 
    <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
    >
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >

    
    <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
   
 

  </Toolbar>
  <Button
  data-test="FirstAdd-button"
      variant="outlined"
      onClick={handleOpen}
      startIcon={<AddIcon />}
    >
      Add {title}
    </Button>
  </div>
  </>
  );
}
