export default function Intro() {
  return (
    <>
{/* abertura da variante C */}
<div className="intro" id="intro">
  <div className="intro-t" id="introT"></div>
  <div className="ripple" id="ripple"></div>
  <div className="intro-logo" id="introLogo"><svg viewBox="14 14 36 36"><use href="#g" color="#0A0A0B"/></svg><span>G.W.E.N.</span></div>
  <div className="cursor" id="cursor"><svg viewBox="0 0 24 24" width="30" height="30"><path d="M4 2 L4 19 L8.6 14.6 L11.6 21.4 L14.4 20.2 L11.4 13.4 L18 13.4 Z" fill="#EDEBE7" stroke="#0A0A0B" strokeWidth="1.3" strokeLinejoin="round"/></svg></div>
  <button className="intro-skip" id="introSkip">pular</button>
</div>
    </>
  )
}
