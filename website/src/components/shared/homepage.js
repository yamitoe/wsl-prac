import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./homepage.scss";

import fbFav from "./images/facebookuidark2.png";
import tictacFav from "./images/tictactoe.png";
import weatherappFav from "./images/weatherapp.png";
import reactNativeApp from "./images/ReactNativeGroceryDemo.MP4";

import { CSSTransition } from "react-transition-group";

export function Homepage() {
  const titlesplashref = useRef(null);
  const [titleSplash, setTitleSplash] = useState(false);
  useEffect(() => {
    const onScroll = e => {
      if (window.pageYOffset >= 0 && window.pageYOffset < 140) {
        setTitleSplash(true);
      } else {
        setTitleSplash(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
  }, []);

  let displayProject = (url, title, summary, details, img) => {
    return (
      <article>
        <Link to={url}>
          <img src={img} alt={img + "pic"} className={title + "Pic"} />
          <h2 className="projectTag">{title} App</h2>
          <div>{summary}</div>
          <div className="details">{details}</div>
        </Link>
      </article>
    );
  };

  return (
    <section className="container-home">
      {document.body.setAttribute("backColor", "home")}
      <main>
        <section id="introduction">
          <CSSTransition
            in={titleSplash}
            classNames="fade-effect"
            timeout={1000}
            unmountOnExit
            nodeRef={titlesplashref}
          >
            <div ref={titlesplashref}>
              <p>
                Hello! this is my personnal homepage where you will find a list
                of projects I have worked on.
              </p>
              <div>Shown below are live demos that you may interact with.</div>
            </div>
          </CSSTransition>
        </section>
        <section className="container-projects">
          <h1>Projects</h1>
          <section className="projects">
            {displayProject(
              "/facebookui",
              "FacebookUI",
              "Facebook dropdown UI with pagination and theme",
              `Animated dropdown that 'scrolls' left and right. A dark/white theme button, stores the data in cache.
               A simple pagination with material ui and some mock data.`,
              fbFav
            )}
            {displayProject(
              "/weatherapp",
              "Weather",
              "Give it a city and it will get you the weather",
              "Enter a city in the autocomplete, if it is a valid city it will use fetch api to get the corresponding data.",
              weatherappFav
            )}

            {displayProject(
              "/tictac",
              "Tic-Tac-Toe",
              "A simple tic-tac-toe game",
              "React Tutorial Game recreated with Hooks API with minor jest testing",
              tictacFav
            )}
          </section>
          <h3>External Projects</h3>
          <section className="projects">
            <article>
              <video src={reactNativeApp} width="500" controls></video>
              <h2 className="projectTag">      
                <a href="https://snack.expo.io/@supermadinit/reacnativegroceryapp">React Native App (Leaves Site, Use iOS Emulator)</a>
              </h2>
              <div style={{marginBottom:"5px"}}>To Expo Demo , Click Header Above for Live Demo</div>
              <div>A grocery list note taker</div>
              <div className="details">
                <h3>Noteable Features: </h3>
                <ul>
                  <li>Context Api (Hook and Class Form)</li>
                  <li>TypeScript</li>
                  <li>Async Storage</li>
                  <li>Slide to delete</li>
                </ul>

                <p>
                  The idea behind the app is to help users easily write down what they would
                  need to buy, in a clean organized list.
                </p>
                <p>
                  There was going to be functionality where you could get notfications if x item time was up
                  but it ended up being unimplemented.
                </p>

           
              </div>
   
            </article>
          </section>

          <div className="github">
            <span>You can checkout other projects here: </span>
            <a href="https://github.com/yamitoe/portfolio">Github</a>
          </div>
        </section>
        <section className="skills">
          <div>My current skillset includes:</div>
          <ul>
            <li>Javascript</li>
            <li>Reactjs</li>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>SASS</li>
            <li>Material UI</li>
            <li>Git</li>
            <li>Jest</li>
            <li>React Testing Library</li>
            <li>React Router</li>
            <li>PHP</li>
            <li>SQL</li>
          </ul>
        </section>
        <section className="skills">
          <div>Other Notable Skills: </div>
          <ul>
            <li>Computer Hardware</li>
            <li>AJAX</li>
            <li>XML</li>
            <li>Java</li>
            <li>C#</li>
          </ul>
        </section>
      </main>
      <footer></footer>
    </section>
  );
}
