import React from "react";
import Image from "next/image";

function About() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative shadow mx-auto h-24 w-24  border-white rounded-full overflow-hidden border-4">
          <Image
            width="100%"
            height="100%"
            alt="profile"
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80"
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <h5>Host by Maggie</h5>
      </div>
      <div className="flex justify-center items-center">
        <h3 className="text-xl">Details</h3>
      </div>
      <div className="flex justify-center items-center max-w-lg mx-auto space-y-4 text-left tracking-wide break-words leading-7">
        <p>
          Hey everyone, Join us for some online fun! <br />
          We&apos;ll have Codenames, Secret Hitler, and Gartic Phone (drawing
          game) ready to go, and if you have any other suggestions for online
          based games we can add, let us know and we can add them to the roster.
          <br />
          We are exploring ways of running several groups in parallel, so if we
          have enough people, we will be able to break into groups to separate
          games, or just have a space for those who want to chit-chat without
          playing. <br />
          Any game suggestions must be browser-based and use of a PC or Mac is
          highly advised. We look forward to seeing you there!
        </p>
      </div>
    </>
  );
}

export default About;
