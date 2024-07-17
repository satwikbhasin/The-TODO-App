import React, { useState } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import { useTheme } from "@emotion/react";
import { LogIn, UserRoundPlus } from "lucide-react";

const Authentication = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        gap: "20px",
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="auth tabs"
        centered
        indicatorColor="transparent"
        textColor={theme.palette.secondary.text}
        sx={{
          ".MuiTab-root": {
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            borderRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            "&.Mui-selected": {
              background: theme.palette.background.glassmorphism,
            },
            "&:not(.Mui-selected)": {
              background: "transparent",
              border: "transparent",
            },
          },
        }}
      >
        <Tab
          label="Login"
          sx={{
            color: theme.palette.secondary.text,
            fontFamily: theme.typography.body1,
          }}
          iconPosition="start"
          icon={
            <LogIn
              size={18}
              color={
                selectedTab === 0
                  ? theme.palette.secondary.misc
                  : theme.palette.secondary.text
              }
            />
          }
        />
        <Tab
          label="Sign Up"
          sx={{
            color: theme.palette.secondary.text,
            fontFamily: theme.typography.body1,
          }}
          iconPosition="start"
          icon={
            <UserRoundPlus
              size={18}
              color={
                selectedTab === 1
                  ? theme.palette.secondary.misc
                  : theme.palette.secondary.text
              }
            />
          }
        />
      </Tabs>
      {selectedTab === 0 && <Login />}
      {selectedTab === 1 && <Signup />}
    </Container>
  );
};

export default Authentication;
