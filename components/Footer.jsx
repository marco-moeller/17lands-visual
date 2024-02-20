import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Portions of this site are unofficial fan content permitted under the
        Wizards of the Coast Fan Content Policy. The literal and graphical
        information presented on this site about Magic: The Gathering, including
        card images, mana symbols, and Oracle text is copyright Wizards of the
        Coast, LLC, a subsidiary of Hasbro, Inc. This site is not produced by or
        endorsed by Wizards of the Coast.
      </p>
      <p>
        The card win rates above are retrieved from{" "}
        <a href="https://www.17lands.com" target="_blank">
          17Lands - www.17lands.com
        </a>
        . Download their tracker to have your drafts recorded and added to their
        dataset. This site is not produced by or endorsed by 17Lands.
      </p>
      <p>
        Everything else you see - © Marco Moeller - {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
