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
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="auth tabs"
        textColor={theme.palette.primary.main}
        centered
        sx={{
          backgroundColor: theme.palette.secondary.text,
          color: theme.palette.secondary.main,
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          boxShadow:
            "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
        }}
        indicatorColor={theme.palette.primary.main}
      >
        <Tab
          sx={{
            backgroundColor:
              selectedTab === 0
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            color:
              selectedTab === 0
                ? theme.palette.secondary.text
                : theme.palette.secondary.text,
            gap: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
          label="Login"
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
          sx={{
            backgroundColor:
              selectedTab === 1
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            color:
              selectedTab === 1
                ? theme.palette.secondary.text
                : theme.palette.secondary.text,
            gap: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
          label="Sign Up"
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
