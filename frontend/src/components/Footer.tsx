import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { Wrapper } from "./Wrapper";

export const Footer = () => {
  return (
    <footer className="bg-black pb-3 pt-14 text-white">
      <Wrapper className="flex flex-col justify-between gap-[50px] md:flex-row md:gap-0">
        <div className="flex flex-col gap-[50px] md:flex-row md:gap-[75px] lg:gap-[100px]">
          <div className="flex shrink-0 flex-col gap-3">
            <div className="section1_footer_item">Find a store</div>
            <div className="section1_footer_item">become a partner</div>
            <div className="section1_footer_item">sign up for email</div>
            <div className="section1_footer_item">send us feedback</div>
            <div className="section1_footer_item">student discount</div>
          </div>

          <div className="flex shrink-0 gap-[50px] md:gap-[75px] lg:gap-[100px]">
            <div className="flex flex-col gap-3">
              <div className="font-ysabeau text-sm font-bold uppercase">
                get help
              </div>
              <div className="section2_footer_item">Order Status</div>
              <div className="section2_footer_item">Delivery</div>
              <div className="section2_footer_item">Returns</div>
              <div className="section2_footer_item">Payment Options</div>
              <div className="section2_footer_item">Contact Us</div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-ysabeau text-sm font-bold uppercase">
                About
              </div>
              <div className="section2_footer_item">News</div>
              <div className="section2_footer_item">Careers</div>
              <div className="section2_footer_item">Investors</div>
              <div className="section2_footer_item">Sustainability</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 md:justify-start">
          <div className="footer_social">
            <FaFacebookF size={20} />
          </div>
          <div className="footer_social">
            <FaTwitter size={20} />
          </div>
          <div className="footer_social">
            <FaYoutube size={20} />
          </div>
          <div className="footer_social">
            <FaInstagram size={20} />
          </div>
        </div>
      </Wrapper>
      <Wrapper className="mt-10 flex flex-col justify-between gap-[10px] md:flex-row md:gap-0">
        <div className="footer_down text-center md:text-left">
          © 2023 All Rights Reserved
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-center md:gap-5 md:text-left">
          <div className="footer_down">Guides</div>
          <div className="footer_down">Terms of Sale</div>
          <div className="footer_down">Terms of Use</div>
          <div className="footer_down">Privacy Policy</div>
        </div>
      </Wrapper>
    </footer>
  );
};
