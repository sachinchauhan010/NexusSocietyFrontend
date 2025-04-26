import { Link } from "react-router-dom";

const navLinkClass =
  "relative hover:text-purple-500 transition-all duration-200 ease-in-out";

const underlineEffect = `
  after:content-[''] after:absolute after:left-0 
  after:-bottom-2 after:w-full after:h-[2px] 
  after:bg-purple-500 after:scale-x-0 
  hover:after:scale-x-100 after:origin-left 
  after:transition-transform
`;

const hoverSlide = "hover:translate-y-[2px]";

const SecondaryHeader = () => {
  return (
    <div className="hidden md:flex gap-x-10 items-center font-semibold ml-auto justify-center my-10">
      <Link className={`${navLinkClass} ${underlineEffect} ${hoverSlide}`} to="/event">
        Events
      </Link>
      <Link className={`${navLinkClass} ${underlineEffect} ${hoverSlide}`} to="/services">
        Services
      </Link>
      <Link className={`${navLinkClass} ${underlineEffect} ${hoverSlide}`} to="/about">
        About us
      </Link>
      <Link className={`${navLinkClass} ${underlineEffect} ${hoverSlide}`} to="/get-merchandise">
        Merchandise
      </Link>
      <Link className={`${navLinkClass} ${underlineEffect} ${hoverSlide}`} to="/faq">
        FAQs
      </Link>
      <Link className={`${navLinkClass} ${underlineEffect} ${hoverSlide}`} to="/get-in-touch">
        Contact
      </Link>
    </div>
  );
};

export default SecondaryHeader;
