import S from "./Home.module.css";

const Hero = () => {
  return (
    <div className={S.base}>
      <div className={S.contain}>
        <div className={S.description}>
          <h1 className={S.title}>
            Create your new identity
            <br className={S.br} />
            Make your portfolio
          </h1>
          <p className={S.parag}>
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo
            park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.
          </p>
          <div className={S.btns}>
            <button className={S.btnLog}>Sign In</button>
            <button className={S.btnReg}>Sign Up</button>
          </div>
        </div>
        <div className={S.imgCon}></div>
      </div>
    </div>
  );
};

export default Hero;
