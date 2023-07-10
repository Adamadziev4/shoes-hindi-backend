import React from "react";
import { Wrapper } from "@/components/Wrapper";
import Link from "next/link";

const Failed = () => {
  return (
    <div className="flex min-h-[650px] items-center">
      <Wrapper>
        <div className="mx-auto flex max-w-[600px] flex-col rounded-lg border border-black p-5">
          <div className="text-2xl font-bold">Payment failed!</div>
          <div className="mt-5 text-base">
            For any product related query, drop an email to
          </div>
          <div className="underline">shoeshopcontact@shop.com</div>

          <Link href="/" className="mt-5 font-bold">
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Failed;
