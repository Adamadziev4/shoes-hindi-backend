import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Wrapper } from "./Wrapper";

export const Footer = () => {
  return (
    <footer className="bg-black pb-3 pt-14 text-white">
      <Wrapper className="flex flex-col justify-between gap-[50px] md:flex-row md:gap-0">
        <div className="flex flex-col gap-[50px] md:flex-row md:gap-[75px] lg:gap-[100px]">
          <div className="flex shrink-0 flex-col gap-3">
            <div className="section1_footer_item">Партнерам</div>
            <div className="section1_footer_item">Найти магазин</div>
            <div className="section1_footer_item">Оставить отзыв</div>
            <div className="section1_footer_item">Скидка студентам</div>
          </div>

          <div className="flex shrink-0 gap-[50px] md:gap-[75px] lg:gap-[100px]">
            <div className="flex flex-col gap-3">
              <div className="font-ysabeau text-sm font-bold uppercase">
                Помощь{" "}
              </div>
              <div className="section2_footer_item">Оплата</div>
              <div className="section2_footer_item">Доставка</div>
              <div className="section2_footer_item">Контакты</div>
              <div className="section2_footer_item">Статус заказа</div>
              <div className="section2_footer_item">Условия возврата</div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-ysabeau text-sm font-bold uppercase">
                О нас
              </div>
              <div className="section2_footer_item">Новости</div>
              <div className="section2_footer_item">Работа</div>
              <div className="section2_footer_item">Инвесторы</div>
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
          {/* <div className="footer_social">
            <FaInstagram size={20} />
          </div> */}
        </div>
      </Wrapper>
      <Wrapper className="mt-10 flex flex-col justify-between gap-[10px] md:flex-row md:gap-0">
        <div className="footer_down text-center md:text-left">
          © 2023 All Rights Reserved
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-center md:gap-5 md:text-left">
          <div className="footer_down">Условия продажи</div>
          <div className="footer_down">Условия использования</div>
          <div className="footer_down">Политика конфиденциальности</div>
        </div>
      </Wrapper>
    </footer>
  );
};
