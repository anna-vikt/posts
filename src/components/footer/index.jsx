import { Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { WhatsApp, Facebook, GitHub } from "@mui/icons-material";
import s from "./styles.module.css";


export function Footer() {
  return (
    <Container className={s.footer}>
      <Typography className={s.footer__text}>
        Footer from index.jsx
      </Typography>

      <Container className={s.icons}>
          <Button><WhatsApp/></Button>
          <Button><Facebook/></Button>
          <Button><GitHub/></Button>
       </Container>

    </Container>

  );
}


