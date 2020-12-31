import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Header,
  TitleLogo,
  Slogan,
  InstallButton,
  Button,
  LandingContainer,
} from "../styles/Home";

import Layout from "../components/Layout";

import { FaGithub } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [event, setEvent] = useState(null);

  const handleEventPrompt = e => {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    setEvent(e);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleEventPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleEventPrompt);
    };
  }, []);

  const handleClick = () => {
    // hide our user interface that shows our A2HS button
    event.prompt();
    // Wait for the user to respond to the prompt
    event.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        toast.success("Obrigado! O app estará na home");
      }
      setEvent(null);
    });
  };

  return (
    <Layout title="Home">
      <ToastContainer />
      <Header>
        <TitleLogo>Cwb Covid Meter</TitleLogo>
        <a href="https://github.com/marcelo-schreiber" target="_blank" rel="noreferrer">
          <FaGithub size={64} color="#FFF" style={{ cursor: "pointer" }} />
        </a>
      </Header>
      <InstallButton onClick={e => handleClick(e)}>Baixar app</InstallButton>

      <LandingContainer>
        <div>
          <Slogan>Veja como Curitiba enfrenta o corona vírus.</Slogan>
          <Link href="/graficos" passHref={true}>
            <Button>Explorar</Button>
          </Link>
        </div>
        <Image
          src="/Landing.png"
          alt="landing"
          width={770}
          height={803}
          priority={true}
        />
      </LandingContainer>
    </Layout>
  );
}

export default Home;
